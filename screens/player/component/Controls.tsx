import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderInstance, GestureResponderHandlers, PanResponderGestureState
} from "react-native";
import React, { MutableRefObject, useEffect,  useRef, useState } from "react";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { throttle, debounce } from 'throttle-debounce';
import usePanResponder from "../../../hooks/usePanResponder";

const ImgPlay = require("../../../assets/images/player/player-play.png")
interface IProps {
  statusData: AVPlaybackStatusSuccess;
  onAction: () => void;
}

const { width } = Dimensions.get('window')

export default function Controls ({ statusData, onAction }: IProps) {
  const progressRef = useRef<View>({} as View);
  const [progressWidth, setProgressWidth] = useState(0);
  const { durationMillis = 0, positionMillis = 0 } = statusData;
  const [progressProps, setProgressProps] = useState<GestureResponderHandlers>({} as GestureResponderHandlers);
  // useEffect(() => {
  //   setProgressWidth(positionMillis / durationMillis * width || 0)
  // }, [durationMillis, positionMillis]);
  useEffect(() => {
    if (progressRef?.current) {
      const dzPanResponder = usePanResponder({
        // onMove: throttle(100, onMove),
        onMove,
        onRelease: onMoveEnd,
        onTerminate: onMoveEnd,
      });
      setProgressProps(dzPanResponder);
    }
  }, []);

  // 播放按钮
  const StopArea = () => (
    <TouchableOpacity style={styles.stopIcon} onPress={onAction}>
      {!(statusData.isLoaded && statusData.isPlaying) &&
          <Image source={ImgPlay} style={{ width: 70, height: 70 }}/>}
    </TouchableOpacity>
  )
  // 控制条
  const ControlBar = () => {
    return <View
      style={styles.controlBarWrap}
      {...progressProps}
    >
      <View style={styles.controlBar}>
        <View ref={progressRef} style={[styles.progress, {width: progressWidth}]}>
          <View style={styles.controlDot}/>
        </View>
      </View>
    </View>
  }
  const onStart = (gestureState: PanResponderGestureState) => {

  }
  // 触摸移动
  const onMove = (gestureState: PanResponderGestureState) => {
    console.log('onMove------------------>', gestureState.moveX);
    setProgressWidth(gestureState.moveX);
    // progressRef.current.setNativeProps({style: {width: gestureState.moveX}})
  }
  // 触摸结束
  const onMoveEnd = () => {
    console.log('onMoveEnd------------------>', )
  }

  return (
    <View style={styles.controlsWrap}>
      <StopArea/>
      <ControlBar/>
    </View>
  )
}

const styles = StyleSheet.create({
  controlsWrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
  },
  stopIcon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBarWrap: {
    width,
    height: 400,
    backgroundColor: 'rgba(51,51,51,0.36)',
    display: 'flex',
    justifyContent: 'center',
  },
  controlBar: {
    width,
    height: 3,
    backgroundColor: 'rgba(229,230,235,0.24)',
  },
  progress: {
    // width: 0,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  controlDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
})