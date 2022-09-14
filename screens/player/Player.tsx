import { Dimensions, StyleSheet, View, Animated } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react'
import { SwiperFlatList } from "react-native-swiper-flatlist/index";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useSelector, useStore } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  doLeavePlayer,
  setChapterId,
  setIsInBookShelf,
  setIsLeave,
  setSwiperIndex,
  setVideoList,
  videoInitAsync,
  videoSourceAsync
} from "../../store/modules/player.module";
import { EAutoPay, EConfirmPay, EIsRead, EScene, IChapterInfo } from "../../interfaces/player.interface";
import { getLogTime } from "../../utils/logTime";
import { netVideoPreload } from "../../apis/Player";
import ConfirmDialog from "../../components/ConfirmDialog";
import { setCancelDramaVisible } from "../../store/modules/control.module";
import { netNoDramaVideo } from "../../apis/Theater";
import VideoUnion from "./component/VideoUnion";
import SwiperFlatListNoData from "./component/SwiperFlatListNoData";
import ChapterListLog from "./component/ChapterListLog";
const { width, height } = Dimensions.get('screen');

export interface IVideoList extends IChapterInfo {
  isViewable?: boolean;
}
const getOmap = (): string => (
  JSON.stringify({
    origin: '在看-默认播放',
    action: '2',
    channel_id: 'zk',
    channel_name: '在看',
    channel_pos: 0,
    column_id: 'zk_mrbf',
    column_name: '在看-默认播放',
    column_pos: 0,
    content_id: '',
    content_pos: 0,
    content_type: '2',
    trigger_time: getLogTime()
  })
);

export default function Player () {
  const dispatch = useAppDispatch();
  const route = useRoute()
  const store =  useStore<RootState>()
  const { bookId, chapterId, videoSource } = useSelector((state: RootState) => (state.player));
  // store.getState()获得的值暂时不能作为useEffect的依赖项
  const { videoList, swiperIndex } = store.getState().player;
  const { cancelDramaVisible } = store.getState().control;
  const isLeave = useRef(false); // 是否离开
  const flatRef = useRef<SwiperFlatList>({} as SwiperFlatList);
  useFocusEffect(
    useCallback(() => {
      isLeave.current = false;
      dispatch(setIsLeave(false))
      const storePlayer = store.getState().player;
      dispatch(setSwiperIndex(storePlayer.swiperIndex));
      if (storePlayer.videoSource && storePlayer.videoList.length > 0) {
        getVideoPreload(storePlayer.videoSource.bookId, storePlayer.videoList[0].chapterId, storePlayer.videoList)
      }
      return () => {
        isLeave.current = true;
        dispatch(setIsLeave(true))
        dispatch(doLeavePlayer('leave'))
      };
    }, []),
  );
  useEffect(() => {
    dispatch(videoInitAsync({ isRead: EIsRead.是 }));
    dispatch(videoSourceAsync({ bookId, chapterId, autoPay: EAutoPay.否, confirmPay: EConfirmPay.非确认订购扣费, scene: EScene.播放页, omap: getOmap() }));
  }, [bookId]);

  useEffect(() => {
    if (isLeave.current) return;
    if (videoSource.bookId && videoSource?.chapterInfo?.length > 0 && videoSource.chapterInfo?.[0]?.chapterId) {
      getVideoPreload(videoSource.bookId, videoSource.chapterInfo[0].chapterId, videoSource.chapterInfo);
      flatRef.current?.goToFirstIndex && flatRef.current?.goToFirstIndex();
    }
  }, [videoSource]);
  // 章节预加载
  const getVideoPreload = async ( bookId: string, chapterId: string, sourceData: IVideoList[] = [], isExist?: boolean) => {
    const videoPreload = await netVideoPreload({ bookId, chapterId, autoPay: EAutoPay.否, scene: EScene.播放页, omap: getOmap() });
    if (isExist) return; // videoList是否存在数据
    if (sourceData.length > 0) {
      const _preVideo = videoPreload.chapterInfo.filter(val => sourceData.findIndex(v => v.chapterId === val.chapterId) === -1 ) || [];
      dispatch(setVideoList([...sourceData, ..._preVideo]))
    } else {
      const _preVideo = videoPreload.chapterInfo.filter(val => videoList.findIndex(v => v.chapterId === val.chapterId) === -1 ) || [];
      dispatch(setVideoList([...videoList, ..._preVideo]))
    }
  }

  const onChangeIndex = async ({ index, prevIndex }: { index: number; prevIndex: number }) => {
    if (isLeave.current) return;
    console.log('onChangeIndex--------->', index, prevIndex, swiperIndex )
    if (index === videoList.length - 1) {
      await getVideoPreload(videoSource.bookId, videoList[index].chapterId);
    } else {
      await getVideoPreload(videoSource.bookId, videoList[index].chapterId, [], true);
    }
    dispatch(setSwiperIndex(index));
  }
  const sliderHeight = useRef(new Animated.Value(-44)).current;

  const onRefresh = () => {
    const preChapterId = videoList?.[0]?.preChapterId || videoSource.preChapterId;
    console.log('preChapterId------------->', preChapterId, swiperIndex)
    if( swiperIndex === 0 && !preChapterId) {
      Animated.timing(sliderHeight, { toValue: 0, duration: 1000, useNativeDriver: false }).start(({ finished }) => {
        /* 动画完成的回调函数 */
        if (finished) {
          Animated.timing(sliderHeight, { toValue: -44, duration: 1000, delay: 1000, useNativeDriver: false }).start()
        }
      });
    } else {
      dispatch(setChapterId(preChapterId));
      dispatch(videoSourceAsync({ bookId, chapterId: preChapterId, autoPay: EAutoPay.否, confirmPay: EConfirmPay.非确认订购扣费, scene: EScene.播放页, omap: getOmap() }));
    }
  }

  const VideoItem = ({ item, index }: { item: IVideoList, index: number }) => {
    return <View style={styles.container}>
      {(route.name === 'Player') && <VideoUnion
        omap={getOmap()}
        source={{
          ...item,
          isViewable: swiperIndex === index && !store.getState().player.isLeave
        }}
      />}
    </View>
  }

  return <View style={styles.playerWrap}>
    {videoList.length > 0 ? <SwiperFlatList
      windowSize={3}
      style={styles.swiperBox}
      ref={flatRef}
      refreshing={false}
      onRefresh={onRefresh}
      data={videoList}
      renderItem={VideoItem}
      keyExtractor={(item, index) => item.chapterId + index}
      getItemLayout={(data, index) => (
        { length: height - 150, offset: (height - 150) * index, index }
      )}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 95,
      }}
      vertical
      onChangeIndex={onChangeIndex}
      showPagination
      paginationDefaultColor={'rgba(255, 255, 255, 0.4)'}
      paginationStyleItem={{ width: 12, height: 5, borderRadius: 3, marginLeft: 4, marginRight: 4 }}
    /> : null }
    <SwiperFlatListNoData sliderHeight={sliderHeight}/>
    <ChapterListLog omap={getOmap()}/>
    <ConfirmDialog
      visible={cancelDramaVisible}
      rightBtn={() => dispatch(setCancelDramaVisible(false))}
      leftBtn={() => {
        dispatch(setIsInBookShelf(false))
        dispatch(setCancelDramaVisible(false))
        netNoDramaVideo(bookId, EScene.播放页)
      }}
      close={() => dispatch(setCancelDramaVisible(false))}
      leftTxt="确认"
      rightTxt="再想想"
      title="确认取消追剧吗？"
      message="取消后您将无法快速找到本剧"/>
  </View>;

}

const styles = StyleSheet.create({
  playerWrap: {
    flex: 1,
    position: "relative",
  },
  swiperBox: {
    backgroundColor: 'rgba(25, 25, 25, 1)',
    width: '100%',
    height: '100%',
  },
  container: {
    width,
    height: height - 150,
    overflow: "hidden"
  },
});
