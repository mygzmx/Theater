import VideoPlayer from "expo-video-player";
import { Dimensions, StyleSheet, View } from "react-native";
import { ResizeMode } from "expo-av/src/Video.types";
import { AVPlaybackStatus, Video } from "expo-av";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ErrorType } from "expo-video-player/dist/constants";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { useFocusEffect } from "@react-navigation/native";
import { useStore } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { netVideoFinish, netVideoPreload } from "../../../apis/Player";
import { RootState, useAppDispatch } from "../../../store";
import { IVideoList } from "../Player";
import { setChapterId, setVideoList } from "../../../store/modules/player.module";
import { EAutoPay, EScene } from "../../../interfaces/player.interface";
import Controls from "./Controls";
const { height } = Dimensions.get('screen');

interface IProps {
  source: IVideoList;
  omap?: string;
}

export default function VideoUnion ({ source, omap }: IProps) {
  const toast = useToast();
  const player = useRef<Video>({} as Video);
  const store =  useStore<RootState>()
  const [statusData, setStatusData] = useState<AVPlaybackStatusSuccess>({} as AVPlaybackStatusSuccess);
  const { bookId, chapterId, videoList, swiperIndex, videoSource } = store.getState().player;
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('player useEffect---------------->', source.isViewable)
    if (source.content.m3u8 && source.isViewable ) {
      player.current?.playFromPositionAsync && player.current?.playFromPositionAsync(0)
    }
    return () => {
      if (!player.current || !player.current?.pauseAsync) return;
      player.current?.pauseAsync();
    };
  }, [source.content.m3u8]);
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

  // 播放结束回调
  const onVideoEnd = async () => {
    const _chapterId = videoList[swiperIndex]?.nextChapterId || videoSource.nextChapterId;
    if (_chapterId) {
      dispatch(setChapterId(_chapterId));
      const videoPreload = await netVideoPreload({ bookId, chapterId: _chapterId, autoPay: EAutoPay.否, scene: EScene.播放页, omap: JSON.stringify(omap) });
      if (!videoPreload.chapterInfo || videoPreload.chapterInfo.length === 0) {
        toast.show('下级付费 || 结局了, 没做')
        return;
      }
      const _preVideo = videoPreload.chapterInfo.filter(val => videoList.findIndex(v => v.chapterId === val.chapterId) === -1 ) || [];
      const _videoList = JSON.parse(JSON.stringify(videoList));
      _videoList.splice(swiperIndex, 1);
      dispatch(setVideoList([..._videoList, ..._preVideo]))
    }
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
          shouldPlay: source.isViewable,
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
