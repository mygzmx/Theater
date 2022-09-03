import VideoPlayer from "expo-video-player";
import { StyleSheet, View } from "react-native";
import { ResizeMode } from "expo-av/src/Video.types";
import { AVPlaybackStatus } from "expo-av";
import React from "react";
import { ErrorType } from "expo-video-player/dist/constants";
import { RootState, useAppSelector } from "../../../store";

interface IProps {
  player: any;
  playbackCallback: (status: AVPlaybackStatus) => void;
  onLoad: (status: AVPlaybackStatus) => void;
}

export default function VideoUnion ({ onLoad, player, playbackCallback }: IProps) {

  const { videoSource } = useAppSelector((state: RootState) => (state.player));

  const errorCallback = (error: ErrorType) => {
    console.log('error---------------->', error)
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
          shouldPlay: false,
          resizeMode: ResizeMode.COVER,
          posterSource: {
            uri: videoSource?.chapterInfo?.[0]?.videoUrl,
          },
          source: {
            uri: videoSource?.chapterInfo?.[0]?.content?.mp4,
          },
          onLoad,
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  videoWrap: {
    width: '100%',
    height: '100%',
    borderBottomColor: 'red',
    borderBottomWidth: 3,
  },
});
