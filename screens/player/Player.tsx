import {
  View,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { netPreloadList, netVideoSource } from "../../apis/Player";
import VideoUnion from "./component/VideoUnion";
import { AppDispatch, RootState } from "../../store";
import { setBookId, setBookName, setChapterId, setChapterInfo, setAutoAdd } from "../../store/modules/player.module";
import { useSelector, useDispatch } from "react-redux";


export default function Player() {
  const dispatch = useDispatch<AppDispatch>();
  const [chapterData, setChapterData] = useState();
  const [nextChapterId, setNextChapterId] = useState('');
  const navigation = useNavigation();
  const { bookId, chapterId } = useSelector((state: RootState) => (state.player));
  useEffect(() => {
    InitVideoData().then(() => {})
  }, [bookId, chapterId]);

  const InitVideoData = async () => {
    const data = await netVideoSource({ bookId, chapterId });
    const { chapterInfo = [], nextChapterId, bookName, autoAdd } = data;
    dispatch(setBookName(bookName))
    dispatch(setAutoAdd(autoAdd))
    setNextChapterId(nextChapterId)
    if (bookId && chapterId) {
      chapterInfo.forEach((chapter: any) => {
        if (chapter.chapterId === chapterId) {
          setChapterData(chapter)
          dispatch(chapter)
        }
      })
    } else {
      data.bookId && dispatch(setBookId(data.bookId))
      data.chapterId && dispatch(setChapterId(data.chapterId))
      setChapterData(chapterInfo[0])
      dispatch(setChapterInfo(chapterInfo[0]))
    }
  }


  const onEnd = () => {
    dispatch(setChapterId(nextChapterId))
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
