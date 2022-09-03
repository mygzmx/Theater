import { StyleSheet, View, } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { AVPlaybackStatus, Video } from "expo-av";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import {
  setChapterId,
  videoInitAsync, videoSourceAsync
} from "../../store/modules/player.module";
import { EAutoPay, EConfirmPay, EIsRead, EScene } from "../../interfaces/player.interface";
import { getLogTime } from "../../utils/logTime";
import { netVideoFinish } from "../../apis/Player";
import VideoUnion from "./component/VideoUnion";
import Controls from "./component/Controls";


export default function Player() {
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
  const [statusData, setStatusData] = useState<AVPlaybackStatusSuccess>({} as AVPlaybackStatusSuccess);
  const player = useRef<Video>({} as Video);
  const { bookId, chapterId, videoSource } = useAppSelector((state: RootState) => (state.player));
  useEffect(() => {
    dispatch(videoInitAsync({ isRead: EIsRead.是 }));
  }, []);

  useEffect(() => {
    dispatch(videoSourceAsync({
      bookId,
      chapterId,
      autoPay: EAutoPay.否,
      confirmPay: EConfirmPay.非确认订购扣费,
      scene: EScene.播放页,
      omap: JSON.stringify(omap) }));
  }, [chapterId])

  const playbackCallback = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setStatusData(status);
      if (status.didJustFinish) {
        await netVideoFinish({ bookId, chapterId, omap: JSON.stringify(omap) })
        if (videoSource) {
          dispatch(setChapterId(videoSource.nextChapterId));
        }
      }
    }
  }

  useEffect(() => {
    if (videoSource?.chapterInfo?.[0] && route.name === 'Player') {
      console.log('videoSource next------->');
      player.current?.playFromPositionAsync(0);
    }
  }, [videoSource?.chapterInfo?.[0]]);


  useFocusEffect(
    useCallback(() => {
      if (videoSource?.chapterInfo?.[0] && route.name === 'Player') {
        player.current?.playAsync();
      }
      return () => {
        player.current?.pauseAsync();
      };
    }, []),
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
        onLoad={(status: AVPlaybackStatus) => { status.isLoaded && setStatusData(status) }}
        playbackCallback={playbackCallback}/>
      <Controls
        statusData={statusData}
        changeControl={changeControl}
        onAction={()=> {
          (!statusData.isLoaded || statusData.isPlaying) ? player.current?.pauseAsync() : player.current?.playAsync()
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
