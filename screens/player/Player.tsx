import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { AVPlaybackStatus, Video } from "expo-av";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { netPreloadList, netVideoSource } from "../../apis/Player";
import { AppDispatch, RootState } from "../../store";
import { setBookId, setBookName, setChapterId, setChapterInfo, setAutoAdd } from "../../store/modules/player.module";
import VideoUnion from "./component/VideoUnion";
import Controls from "./component/Controls";


export default function Player() {
  const route = useRoute()
  const dispatch = useDispatch<AppDispatch>();
  const [chapterData, setChapterData] = useState();
  const [nextChapterId, setNextChapterId] = useState('');
  const [statusData, setStatusData] = useState<AVPlaybackStatusSuccess>({} as AVPlaybackStatusSuccess);
  const player = useRef<Video>({} as Video);
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
  const playbackCallback = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setStatusData(status);
      if (status.didJustFinish) {
        dispatch(setChapterId(nextChapterId))
      }
    }
  }
  useEffect(() => {
    if (chapterData && route.name === 'Player') {
      !statusData.isPlaying && player.current?.playAsync();
    }
  }, [chapterData]);

  useFocusEffect(
    useCallback(() => {
      if (chapterData && !statusData.isPlaying && route.name === 'Player') {
        player.current?.playAsync();
      }
      return () => {
        (!statusData.isLoaded || statusData.isPlaying) && player.current?.pauseAsync();
      };
    }, [chapterData]),
  );

  const changeControl = (positionMillis: number) => {
    player.current?.playFromPositionAsync(positionMillis);
  }
  // <FlatList
  //   pagingEnabled
  //   data={['1','2']}
  //   renderItem={() =>  ()}
  //   keyExtractor={item => item}
  // />
  return (
    <View style={styles.container}>

      <VideoUnion
        player={player}
        chapterData={chapterData}
        onLoad={(status: AVPlaybackStatus) => { status.isLoaded && setStatusData(status) }}
        playbackCallback={playbackCallback}/>
      <Controls
        statusData={statusData}
        changeControl={changeControl}
        onAction={()=> {
          !(statusData.isLoaded) || statusData.isPlaying ? player.current?.pauseAsync() : player.current?.playAsync()
        }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(25, 25, 25, 1)',
  },
});
