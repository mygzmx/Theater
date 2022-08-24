import {
  View,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import { netPreloadList, netVideoSource } from "../../apis/Player";
import VideoUnion from "./component/VideoUnion";
import { AppDispatch, RootState } from "../../store";
import { setBookId, setChapterId } from "../../store/modules/player.module";
import { useSelector, useDispatch } from "react-redux";


export default function Player() {
  const dispatch = useDispatch<AppDispatch>();
  const bookId = useSelector((state: RootState) => (state.player.bookId));
  const [chapterData, setChapterData] = useState();
  const [nextChapterId, setNextChapterId] = useState('');
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

  const InitVideoData = async ({ bookId, chapterId, isInit }: { bookId?: string, chapterId?: string, isInit?: boolean}) => {
    const data = await netVideoSource({ bookId, chapterId });
    const { chapterInfo = [], nextChapterId } = data;
    // setBookId(data.bookId);
    dispatch(setBookId(data.bookId))
    dispatch(setChapterId(chapterId))
    setNextChapterId(nextChapterId)
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


  const onEnd = async () => {
    await InitVideoData({ bookId, chapterId: nextChapterId })
  }
  return (
    <View style={styles.container}>
      {/*<PagerView style={styles.swiper}>*/}
      {/*  <VideoUnion chapterData={chapterData}/>*/}
      {/*  <VideoUnion chapterData={chapterData}/>*/}
      {/*</PagerView>*/}
      <VideoUnion chapterData={chapterData} onEnd={onEnd}/>
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
