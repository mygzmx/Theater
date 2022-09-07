import { Dimensions, StyleSheet, View, Text, ViewToken, Animated, } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist/index";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { setChapterId, setVideoSource, videoInitAsync } from "../../store/modules/player.module";
import { EAutoPay, EConfirmPay, EIsRead, EScene, IChapterInfo } from "../../interfaces/player.interface";
import { getLogTime } from "../../utils/logTime";
import { netVideoPreload, netVideoSource } from "../../apis/Player";
import VideoUnion from "./component/VideoUnion";
import SwiperFlatListNoData from "./component/SwiperFlatListNoData";
const { width, height } = Dimensions.get('window');

export interface IVideoList extends IChapterInfo {
  isViewable?: boolean;
}

export default function Player () {

  const route = useRoute()

  useFocusEffect(
    useCallback(() => {
      console.log('swiperIndex------------>', swiperIndex)
      return () => {
        console.log('swiperIndex------------>', swiperIndex)
      };
    }, []),
  );

  const dispatch = useAppDispatch();
  const [omap, setOmap] = useState({
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
  });
  const [swiperIndex, setSwiperIndex] = useState(0);
  const { bookId, chapterId, videoSource } = useAppSelector((state: RootState) => (state.player));
  const [videoList, setVideoList] = useState<IVideoList[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(videoInitAsync({ isRead: EIsRead.是 }));
    getVideoSource().then(() => {})
  }, []);

  const getVideoSource = async () => {
    const _videoSource = await netVideoSource({ bookId, chapterId, autoPay: EAutoPay.否, confirmPay: EConfirmPay.非确认订购扣费, scene: EScene.播放页, omap: JSON.stringify(omap) })
    dispatch(setVideoSource(_videoSource));
    setVideoList(_videoSource.chapterInfo)
    await getVideoPreload(_videoSource.bookId, _videoSource.nextChapterId);
  }

  useEffect(() => {
    !!chapterId && getVideoSource().then(() => {});
  }, [chapterId]);

  // 章节预加载
  const getVideoPreload = async ( bookId: string, chapterId: string ) => {
    const videoPreload = await netVideoPreload({ bookId, chapterId, autoPay: EAutoPay.否, scene: EScene.播放页, omap: JSON.stringify(omap) });
    const _preVideo = videoPreload.chapterInfo.filter(val => videoList.findIndex(v => v.chapterId === val.chapterId) === -1 );
    setVideoList(prevState => ([...prevState, ..._preVideo]))
  }
  // 播放结束回调
  const onVideoEnd = () => {
    if (videoSource) {
      dispatch(setChapterId(videoSource.nextChapterId));
    }
  }
  const onChangeIndex = async ({ index, prevIndex }: { index: number; prevIndex: number }) => {
    console.log('onChangeIndex--------->', index, prevIndex )
    if (index > swiperIndex) {

    } else {

    }
    await getVideoPreload(videoSource.bookId, videoList[index].chapterId);
    setSwiperIndex(index);
  }

  const onViewableItemsChanged = async (info: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
    // if (info.viewableItems.length === 0) return;
    // const { index, item, isViewable } = info.viewableItems[0];
    // if (typeof index === 'number') {
    //
    // }
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
      setIsRefreshing(true)
      await dispatch(setChapterId(videoSource.preChapterId));
      setIsRefreshing(false)
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
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      style={styles.swiperBox}
      index={swiperIndex}
      data={videoList}
      renderItem={VideoItem}
      keyExtractor={(item, index) => String(item.chapterIndex) + index}
      vertical
      onChangeIndex={onChangeIndex}
      onViewableItemsChanged={(info) => onViewableItemsChanged(info)}
      showPagination
      paginationDefaultColor={'rgba(255, 255, 255, 0.4)'}
      paginationStyleItem={{ width: 12, height: 5, borderRadius: 3, marginLeft: 4, marginRight: 4 }}
      paginationStyle={{
        bottom: 25,
        alignItems: 'flex-end'
      }}
    />
    <SwiperFlatListNoData sliderHeight={sliderHeight}/>
  </View>
}

const styles = StyleSheet.create({
  playerWrap: {
    position: "relative",
  },
  swiperBox: {
    backgroundColor: 'rgba(25, 25, 25, 1)',
  },
  container: {
    width,
    height: height - 167,
    overflow: "hidden"
  },
});
