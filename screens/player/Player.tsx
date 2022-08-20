import {
  View,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import Swiper from "react-native-swiper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { netPreloadList, netVideoSource } from "../../apis/Player";
import VideoUnion from "./component/VideoUnion";


export default function Player() {
  const [chapterData, setChapterData] = useState({} as any);
  const navigation = useNavigation();
  const route = useRoute()
  useEffect(() => {
    console.log('route--------_>', route)
    if (route.params) {
      const { bookId, chapterId } = route.params as { bookId: string; chapterId: string };
      InitVideoData({ bookId, chapterId })
    } else {
      InitVideoData({ isInit: true })
    }
  }, [route]);

  // useEffect(() => {
  //   if (chapterData?.content?.mp4) {
  //     player.current?.playAsync()
  //   }
  // }, [chapterData]);

  const InitVideoData = async ({ bookId, chapterId, isInit }: { bookId?: string, chapterId?: string, isInit?: boolean}) => {
    const { chapterInfo = [] } = await netVideoSource({ bookId, chapterId })
    if (isInit) {
      setChapterData(chapterInfo[0])
      return
    }
    chapterInfo.forEach((chapter: any) => {
      if (chapter.chapterId === chapterId) {
        setChapterData(chapter)
      }
    })
  }
  return (
    <View style={styles.container}>
      {/*<Swiper*/}
      {/*  style={styles.swiper}*/}
      {/*  horizontal={false}*/}
      {/*  loop={false}*/}
      {/*  autoplay={true}*/}
      {/*  paginationStyle={{bottom: 10}}*/}
      {/*  showsPagination={true}*/}
      {/*  showsButtons={false}>*/}
      {/*  <VideoUnion*/}
      {/*    ref={player}*/}
      {/*    statusData={statusData}*/}
      {/*    chapterData={chapterData}*/}
      {/*    onAction={()=>*/}
      {/*      !(statusData.isLoaded) || statusData.isPlaying ? player.current?.pauseAsync() : player.current?.playAsync()}*/}
      {/*    onLoad={onLoad}*/}
      {/*    errorCallback={errorCallback}*/}
      {/*    playbackCallback={playbackCallback}*/}
      {/*  />*/}
      {/*</Swiper>*/}
      <VideoUnion chapterData={chapterData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(25, 25, 25, 1)',
  },
  swiper: {
  },
});
