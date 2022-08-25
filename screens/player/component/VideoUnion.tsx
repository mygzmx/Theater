import VideoPlayer from "expo-video-player";
import { StyleSheet, View } from "react-native";
import { ResizeMode } from "expo-av/src/Video.types";
import { AVPlaybackStatus, Video } from "expo-av";
import Controls from "./Controls";
import React, { useEffect, useRef, useState } from "react";
import { ErrorType } from "expo-video-player/dist/constants";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { useRoute } from "@react-navigation/native";

interface IProps {
  chapterData: any;
  onEnd: () => void;
}

export default function VideoUnion ({chapterData, onEnd}: IProps) {

  const [statusData, setStatusData] = useState<AVPlaybackStatusSuccess>({} as AVPlaybackStatusSuccess);
  const route = useRoute()
  const player = useRef<Video>({} as Video);

  const playbackCallback = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setStatusData(status);
      if (status.didJustFinish) {
        console.log('end---------------->')
        onEnd()
      }
    }
  }

  const errorCallback = (error: ErrorType) => {
    console.log('error---------------->', error)
  }
  useEffect(() => {
    if (chapterData && route.name === 'Player') {
      console.log('playAsync');
      !statusData.isPlaying && player.current?.playAsync();
    }
    if (route.name !== 'Player') {
      console.log('pauseAsync')
      player.current?.pauseAsync();
      (!statusData.isLoaded || statusData.isPlaying) && player.current?.pauseAsync();
    }
  }, [chapterData]);

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
          videoBackgroundColor: 'transparent'
        }}
        autoHidePlayer
        errorCallback={errorCallback}
        playbackCallback={playbackCallback}
        fullscreen={{visible: false}}
        icon={{
          size: 0,
          pause: <View/>,
        }}
        videoProps={{
          ref: player,
          status: {
            progressUpdateIntervalMillis: 100,
          },
          shouldPlay: false,
          resizeMode: ResizeMode.COVER,
          posterSource: {
            uri: chapterData?.videoUrl,
          },
          source: {
            uri: chapterData?.content?.mp4,
          },
          onLoad: (status: AVPlaybackStatus) => {
            if (status.isLoaded) {
              setStatusData(status)
            }
          },
        }}
      />
      <Controls
        statusData={statusData}
        changeControl={changeControl}
        onAction={()=> {
          !(statusData.isLoaded) || statusData.isPlaying ? player.current?.pauseAsync() : player.current?.playAsync()
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
