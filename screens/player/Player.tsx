import { Dimensions, StyleSheet, View, Animated } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SwiperFlatList } from "react-native-swiper-flatlist/index";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { setChapterId, videoInitAsync, videoSourceAsync } from "../../store/modules/player.module";
import { EAutoPay, EConfirmPay, EIsRead, EScene, IChapterInfo } from "../../interfaces/player.interface";
import { getLogTime } from "../../utils/logTime";
import { netVideoPreload } from "../../apis/Player";
import VideoUnion from "./component/VideoUnion";
import SwiperFlatListNoData from "./component/SwiperFlatListNoData";
import { useFocusEffect } from "@react-navigation/native";
const { width, height } = Dimensions.get('screen');

export interface IVideoList extends IChapterInfo {
  isViewable?: boolean;
}
const omap = {
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
};

export default function Player () {
  const dispatch = useAppDispatch();
  const [swiperIndex, setSwiperIndex] = useState(0);
  const { bookId, chapterId, videoSource } = useAppSelector((state: RootState) => (state.player));
  const [videoList, setVideoList] = useState<IVideoList[]>([]);
  const isRefresh = useRef(false);
  const flatRef = useRef<SwiperFlatList>({} as SwiperFlatList);

  useEffect(() => {
    dispatch(videoInitAsync({ isRead: EIsRead.是 }));
  }, []);
  useEffect(() => {
    dispatch(videoSourceAsync({ bookId, chapterId, autoPay: EAutoPay.否, confirmPay: EConfirmPay.非确认订购扣费, scene: EScene.播放页, omap: JSON.stringify(omap) }))
  }, [chapterId]);

  useEffect(() => {
    if (videoSource.bookId && videoSource.chapterInfo[0].chapterId) {
      isRefresh.current = true;
      setSwiperIndex(0);
      getVideoPreload(videoSource.bookId, videoSource.chapterInfo[0].chapterId, videoSource.chapterInfo);
    }
  }, [videoSource]);
  useEffect(() => {
    if (isRefresh.current && videoList.length === 2) {
      isRefresh.current = false;
      // flatRef.current.scrollToIndex({ index: 0 })
    }
  }, [videoList]);

  // 章节预加载
  const getVideoPreload = async ( bookId: string, chapterId: string, sourceData: IVideoList[] = [], isExist?: boolean) => {
    const videoPreload = await netVideoPreload({ bookId, chapterId, autoPay: EAutoPay.否, scene: EScene.播放页, omap: JSON.stringify(omap) });
    if (isExist) return; // videoList是否存在数据
    if (sourceData.length > 0) {
      const _preVideo = videoPreload.chapterInfo.filter(val => sourceData.findIndex(v => v.chapterId === val.chapterId) === -1 ) || [];
      setVideoList([...sourceData, ..._preVideo])
    } else {
      const _preVideo = videoPreload.chapterInfo.filter(val => videoList.findIndex(v => v.chapterId === val.chapterId) === -1 ) || [];
      setVideoList(pre => [...pre, ..._preVideo])
    }
  }
  // 播放结束回调
  const onVideoEnd = () => {
    const _chapterId = videoList[swiperIndex]?.nextChapterId;
    if (_chapterId) {
      dispatch(setChapterId(_chapterId));
    }
  }
  const onChangeIndex = async ({ index, prevIndex }: { index: number; prevIndex: number }) => {
    if (isRefresh.current) return;
    console.log('onChangeIndex--------->', index, prevIndex )
    if (index === videoList.length - 1) {
      await getVideoPreload(videoSource.bookId, videoList[index].chapterId);
    } else {
      await getVideoPreload(videoSource.bookId, videoList[index].chapterId, [], true);
    }
    setSwiperIndex(index);
  }
  const sliderHeight = useRef(new Animated.Value(-44)).current;

  const onRefresh = async () => {
    if(!videoSource.preChapterId) {
      Animated.timing(sliderHeight, { toValue: 0, duration: 1000, useNativeDriver: false }).start(({ finished }) => {
        /* 动画完成的回调函数 */
        if (finished) {
          Animated.timing(sliderHeight, { toValue: -44, duration: 1000, delay: 1000, useNativeDriver: false }).start()
        }
      });
    } else {
      await dispatch(setChapterId(videoSource.preChapterId));
    }
  }

  const VideoItem = ({ item, index }: { item: IVideoList, index: number }) => {
    return <View style={styles.container}>
      <VideoUnion
        omap={JSON.stringify(omap)}
        source={{ ...item, isViewable: swiperIndex === index }}
        onVideoEnd={onVideoEnd}/>
    </View>
  }
  return <View style={styles.playerWrap}>
    <SwiperFlatList
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
    />
    <SwiperFlatListNoData sliderHeight={sliderHeight}/>
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
