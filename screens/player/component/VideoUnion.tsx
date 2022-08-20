import VideoPlayer from "expo-video-player";
import { StyleSheet, View } from "react-native";
import { ResizeMode } from "expo-av/src/Video.types";
import { AVPlaybackStatus, Video } from "expo-av";
import Controls from "./Controls";
import React, { useRef, useState } from "react";
import { ErrorType } from "expo-video-player/dist/constants";

interface IProps {
  chapterData: any;
}

export default function VideoUnion ({chapterData}: IProps) {
  const [statusData, setStatusData] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
  const player = useRef<Video>({} as Video);
  const playbackCallback = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setStatusData(status);
      // console.log('status---------------->', status)
      // {"didJustFinish": false, "durationMillis": 51733, "hasJustBeenInterrupted": false, "isBuffering": false, "isLoaded": true, "isLooping": false, "isMuted": false, "isPlaying": false, "pitchCorrectionQuality": "Varispeed", "playableDurationMillis": 1216, "positionMillis": 0, "progressUpdateIntervalMillis": 500, "rate": 1, "shouldCorrectPitch": false, "shouldPlay": false, "target": 259, "uri": "http://dzzt-video.qcread.cn/d6a4e7d9fbb90a19982aeb97535330c5/6302029d/test10/32/6x3/63x0/630x0/63001000014/527985523/527985523.mp4", "volume": 1}
      if (status.didJustFinish) {
        console.log('end---------------->')
      }
    }
  }
  const errorCallback = (error: ErrorType) => {
    console.log('error---------------->', error)
  }
  return(
    <View style={styles.videoWrap}>
      <VideoPlayer
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
          shouldPlay: false,
          resizeMode: ResizeMode.COVER,
          posterSource: {
            uri: chapterData?.videoUrl,
          },
          source: {
            uri: chapterData?.content?.mp4,
          },
          onLoad: (status: AVPlaybackStatus) => {
            setStatusData(status)
          },
        }}
      />
      <Controls
        statusData={statusData}
        onAction={()=>
          !(statusData.isLoaded) || statusData.isPlaying ? player.current?.pauseAsync() : player.current?.playAsync()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  videoWrap: {
    width: '100%',
    height: '100%',
  },
});
