import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, {  useEffect, useState } from "react";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import ControlBar from "./ControlBar";

const ImgPlay = require("../../../assets/images/player/player-play.png")
interface IProps {
  statusData: AVPlaybackStatusSuccess;
  onAction: () => void;
  changeControl: (positionMillis: number) => void;
}


export default function Controls ({ statusData, onAction, changeControl }: IProps) {
  const [progress, setProgress] = useState(0);
  const [isTouched, setIsTouched] = useState(false);
  const { durationMillis = 0, positionMillis = 0 } = statusData;
  useEffect(() => {
    setProgress(positionMillis / durationMillis || 0)
  }, [durationMillis, positionMillis]);
  // 播放按钮
  const StopArea = () => (
    <TouchableWithoutFeedback onPressIn={onAction}>
      <View style={styles.stopIcon}>
        {!(statusData.isLoaded && statusData.isPlaying) &&
        <Image source={ImgPlay} style={{ width: 70, height: 70 }}/>}
      </View>
    </TouchableWithoutFeedback>
  )
  // 触摸开始
  const onStart = () => {
    setIsTouched(true)
  }
  // 触摸结束
  const onMoveEnd = (positionMillis: number) => {
    setIsTouched(false)
    changeControl(positionMillis)
  };
  return (
    <View style={styles.controlsWrap}>
      <StopArea/>
      <ControlBar
        isTouched={isTouched}
        onStart={onStart}
        onMoveEnd={onMoveEnd}
        progress={progress}
        statusData={statusData}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  controlsWrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...StyleSheet.absoluteFillObject,
  },
  stopIcon: {
    height: 400,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})