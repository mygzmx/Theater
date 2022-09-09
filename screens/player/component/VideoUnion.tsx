import VideoPlayer from "expo-video-player";
import { Dimensions, StyleSheet, View } from "react-native";
import { ResizeMode } from "expo-av/src/Video.types";
import { AVPlaybackStatus, Video } from "expo-av";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ErrorType } from "expo-video-player/dist/constants";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { netVideoFinish } from "../../../apis/Player";
import { RootState, useAppSelector } from "../../../store";
import { IVideoList } from "../Player";
import Controls from "./Controls";
const { height } = Dimensions.get('screen');

interface IProps {
  onVideoEnd: () => void;
  source: IVideoList;
  omap?: string;
}

export default function VideoUnion ({ onVideoEnd, source, omap }: IProps) {
  const route = useRoute()
  const player = useRef<Video>({} as Video);
  const [statusData, setStatusData] = useState<AVPlaybackStatusSuccess>({} as AVPlaybackStatusSuccess);
  const { bookId, chapterId } = useAppSelector((state: RootState) => (state.player));
  useEffect(() => {
    console.log('player useEffect---------------->', source.isViewable)
    return () => {
      if (!player.current || !player.current?.pauseAsync) return;
      player.current?.pauseAsync();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      // console.log('player active---------------->', swiperIndex)
      if (!player.current || !player.current?.playAsync || statusData.isPlaying || !source.isViewable) return;
      player.current?.playAsync();
      return () => {
        console.log('player leave---------------->')
        player.current?.pauseAsync();
      };
    }, []),
  );

  const playback = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setStatusData(status);
      if (status.didJustFinish) {
        await netVideoFinish({ bookId, chapterId, omap })
        onVideoEnd()
      }
    }
  }

  const onLoad = (status: AVPlaybackStatus) => {
    status.isLoaded && setStatusData(status)
  }

  const errorCallback = (error: ErrorType) => {
    console.log('error---------------->', error)
  }
  // 控制条
  const changeControl = (positionMillis: number) => {
    player.current?.playFromPositionAsync(positionMillis);
  }
  return(
    <View style={styles.videoWrap}>
      <VideoPlayer
        animation={{}}
        activityIndicator={{}}
        defaultControlsVisible={false}
        header={null}
        mute={{ visible: false }}
        slider={{ visible: false }}
        textStyle={{}}
        timeVisible={false}
        style={{
          height: height - 150,
          videoBackgroundColor: 'transparent'
        }}
        autoHidePlayer
        errorCallback={errorCallback}
        playbackCallback={playback}
        fullscreen={{ visible: false }}
        icon={{
          size: 0,
          pause: <View/>,
        }}
        videoProps={{
          ref: player,
          status: {
            progressUpdateIntervalMillis: 100,
          },
          shouldPlay: route.name === "Player" && source.isViewable,
          resizeMode: ResizeMode.CONTAIN,
          usePoster: true,
          posterSource: {
            uri: source.chapterUrl
          },
          posterStyle: {
            resizeMode: 'contain'
          },
          source: {
            uri: source.content.m3u8,
          },
          onLoad,
        }}
      />
      <Controls
        source={source}
        statusData={statusData}
        changeControl={(positionMillis) => changeControl(positionMillis)}
        onAction={()=> {
          (!statusData.isLoaded || statusData.isPlaying) ? player?.current?.pauseAsync() : player?.current?.playAsync()
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  videoWrap: {
    width: '100%',
    height: '100%',
  },
});
