import VideoPlayer from "expo-video-player";
import { StyleSheet, View } from "react-native";
import { ResizeMode } from "expo-av/src/Video.types";
import { AVPlaybackStatus, Video } from "expo-av";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ErrorType } from "expo-video-player/dist/constants";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { netVideoFinish } from "../../../apis/Player";
import { RootState, useAppSelector } from "../../../store";
import Controls from "./Controls";

interface IProps {
  onVideoEnd: () => void;
  coverImg?: string;
  source?: string;
  getRef: (player: MutableRefObject<Video>) => void;
  omap?: string;
}

export default function VideoUnion ({ onVideoEnd, coverImg, source = '', getRef, omap }: IProps) {

  const player = useRef<Video>({} as Video);
  const [statusData, setStatusData] = useState<AVPlaybackStatusSuccess>({} as AVPlaybackStatusSuccess);
  const { bookId, chapterId } = useAppSelector((state: RootState) => (state.player));

  useEffect(() => {
    getRef(player)
  }, []);

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
          shouldPlay: false,
          resizeMode: ResizeMode.COVER,
          posterSource: {
            uri: coverImg,
          },
          source: {
            uri: source,
          },
          onLoad,
        }}
      />
      <Controls
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
