import VideoPlayer from "expo-video-player";
import { StyleSheet, View } from "react-native";
import { ResizeMode } from "expo-av/src/Video.types";
import { AVPlaybackStatus, Video } from "expo-av";
import Controls from "./Controls";
import React, { useEffect, useRef, useState } from "react";
import { ErrorType } from "expo-video-player/dist/constants";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";

interface IProps {
  chapterData: any;
  onEnd: () => Promise<void>;
}

export default function VideoUnion ({chapterData, onEnd}: IProps) {

  const [statusData, setStatusData] = useState<AVPlaybackStatusSuccess>({} as AVPlaybackStatusSuccess);

  const player = useRef<Video>({} as Video);

  const playbackCallback = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setStatusData(status);
      // console.log('status---------------->', status)
      // {"didJustFinish": false, "durationMillis": 51733, "hasJustBeenInterrupted": false, "isBuffering": false, "isLoaded": true, "isLooping": false, "isMuted": false, "isPlaying": false, "pitchCorrectionQuality": "Varispeed", "playableDurationMillis": 1216, "positionMillis": 0, "progressUpdateIntervalMillis": 500, "rate": 1, "shouldCorrectPitch": false, "shouldPlay": false, "target": 259, "uri": "http://dzzt-video.qcread.cn/d6a4e7d9fbb90a19982aeb97535330c5/6302029d/test10/32/6x3/63x0/630x0/63001000014/527985523/527985523.mp4", "volume": 1}
      if (status.didJustFinish) {
        console.log('end---------------->')
        await onEnd()
      }
    }
  }

  const errorCallback = (error: ErrorType) => {
    console.log('error---------------->', error)
  }
  useEffect(() => {
    if (chapterData) {
      player.current?.playAsync();
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
