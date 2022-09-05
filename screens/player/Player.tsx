import { Dimensions, StyleSheet, View, } from 'react-native';
import React, { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Video } from "expo-av";
import { SwiperFlatList } from "react-native-swiper-flatlist/index";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { setChapterId, setVideoSource, videoInitAsync } from "../../store/modules/player.module";
import { EAutoPay, EConfirmPay, EIsRead, EScene, IVideo2151 } from "../../interfaces/player.interface";
import { getLogTime } from "../../utils/logTime";
import { netVideoPreload, netVideoSource } from "../../apis/Player";
import VideoUnion from "./component/VideoUnion";
const { width, height } = Dimensions.get('window');

interface IVideoList extends IVideo2151 {
  ref?: MutableRefObject<Video>
}
export default function Player () {
  const route = useRoute()
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
  useEffect(() => {
    dispatch(videoInitAsync({ isRead: EIsRead.是 }));
    getVideoSource().then(() => {})
  }, []);
  const getVideoSource = async () => {
    const _videoSource = await netVideoSource({ bookId, chapterId, autoPay: EAutoPay.否, confirmPay: EConfirmPay.非确认订购扣费, scene: EScene.播放页, omap: JSON.stringify(omap) })
    setVideoList([{ ..._videoSource, ref: undefined }]);
    dispatch(setVideoSource(_videoSource));
  }
  useEffect(() => {
    !!chapterId && getVideoSource().then(() => {});
  }, [chapterId]);

  useEffect(() => {
    if (videoSource?.chapterInfo?.[0] && route.name === 'Player' && videoList?.[swiperIndex]) {
      console.log('videoSource next------->');
      videoList?.[swiperIndex].ref?.current?.playFromPositionAsync(0);
      getVideoPreload().then(() => {});
    }
  }, [videoSource]);

  // 章节预加载
  const getVideoPreload = async () => {
    const videoPreload = await netVideoPreload({ bookId, chapterId: videoSource?.chapterInfo?.[0].chapterId, autoPay: EAutoPay.否, scene: EScene.播放页, omap: JSON.stringify(omap) })
    setVideoList(prevState => [...prevState, { ...videoPreload, ref: undefined }]);
  }

  useFocusEffect(
    useCallback(() => {
      if (videoList[swiperIndex]) {
        videoList[swiperIndex].ref?.current?.playAsync();
      }
      return () => {
        if (videoList[swiperIndex]?.ref){
          videoList[swiperIndex].ref?.current?.pauseAsync();
        }
      };
    }, []),
  );

  // 播放结束回调
  const onVideoEnd = () => {
    if (videoSource) {
      dispatch(setChapterId(videoSource.nextChapterId));
    }
  }
  // 切换swiper
  const onChangeIndex = ({ index,  prevIndex }: { index: number; prevIndex: number }) => {
    console.log('onChangeIndex--------->', index, prevIndex )
    videoList[prevIndex].ref?.current?.pauseAsync();
    videoList[index].ref?.current?.playFromPositionAsync(0);
    setSwiperIndex(index);
  }

  const VideoItem = ({ item, index }: { item: IVideoList, index: number }) => {
    return <View style={styles.container}>
      <VideoUnion
        omap={JSON.stringify(omap)}
        coverImg={item?.chapterInfo?.[0]?.chapterUrl}
        source={item?.chapterInfo?.[0]?.content?.mp4}
        getRef={(player) => {
          setVideoList(prevState => prevState.map((val, ind) =>
            ind === index ? { ...val, ref: player } : val
          ));
        }}
        onVideoEnd={onVideoEnd}/>
    </View>
  }
  return <SwiperFlatList
    style={styles.swiperBox}
    autoplay={false}
    autoplayLoopKeepAnimation
    // index={swiperIndex}
    data={videoList}
    renderItem={VideoItem}
    keyExtractor={(item, index) => String(item.chapterIndex) + index}
    vertical
    onChangeIndex={onChangeIndex}
    showPagination
    paginationDefaultColor={'rgba(255, 255, 255, 0.4)'}
    paginationStyleItem={{ width: 12, height: 5, borderRadius: 3, marginLeft: 4, marginRight: 4 }}
    paginationStyle={{
      bottom: 25,
      alignItems: 'flex-end'
    }}
  />
}

const styles = StyleSheet.create({
  swiperBox: {
    backgroundColor: 'rgba(25, 25, 25, 1)',
  },
  container: {
    width,
    height: height - 167,
    overflow: "hidden"
  },
});
