import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  GestureResponderHandlers,
  PanResponderGestureState,
} from "react-native";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import usePanResponder from "../../../hooks/usePanResponder";
import { ControlTime } from "./ControlTime";

const { width } = Dimensions.get('window');

interface IProps {
  progress: number;
  onStart?: () => void;
  onMoveEnd?: (positionMillis: number) => void;
  isTouched: Boolean;
  statusData: AVPlaybackStatusSuccess
}

interface IState {
  progressValue: number;
  positionMillis: number;
}

export default class ControlBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      progressValue: props.progress,
      positionMillis: 0,
    };
    this.watcher = usePanResponder({
      onStart: () => props.onStart && props.onStart(),
      onMove: (gestureState) => this.onMove(gestureState),
      onRelease: () => props.onMoveEnd && props.onMoveEnd(this.state.positionMillis),
      onTerminate: () => props.onMoveEnd && props.onMoveEnd(this.state.positionMillis),
    });
  };
  watcher: GestureResponderHandlers;
  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    // prevProps.progress !== this.props.progress &&
    if (prevProps.progress !== this.state.progressValue && !prevProps.isTouched) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ progressValue: prevProps.progress })
    }
  }
  /** 触摸移动
   * 目前环境 onPanResponderMove 回调不支持Hooks连续塞值，类方式setState倒是可以
   * 原因未知
   */
  onMove(gestureState: PanResponderGestureState) {
    const touchPointX = gestureState.moveX;
    let progress;
    if (touchPointX < 5) {
      progress = 0;
    } else if (width - touchPointX < 5) {
      progress = 1;
    } else {
      progress = touchPointX / width;
    }
    this.setState({
      progressValue: progress,
      positionMillis: progress * (this.props.statusData.durationMillis || 0)
    });
  }

  render() {
    const { progressValue, positionMillis } = this.state;
    const { isTouched, statusData } = this.props;
    const progressWidth = Math.round(progressValue * width);
    return (<View style={styles.controlBarWrap} >
      { isTouched && <ControlTime durationMillis={statusData.durationMillis} positionMillis={positionMillis}/>}
      <View {...this.watcher} style={styles.controlBarBox}>
        <View style={styles.controlBarBox2}>
          <View style={[styles.controlBar, isTouched && { ...styles.controlBarActive }]}>
            <View style={[styles.progress, isTouched && { ...styles.progressActive }, { width: progressWidth }]}>
              <View style={[ styles.controlDot, isTouched && { ...styles.controlDotActive }]}/>
            </View>
          </View>
        </View>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  controlBarWrap: {
    width,
    // height: 300,
    // backgroundColor: 'rgba(255,255,255,0.58)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  controlBarBox: {
    width,
    height: 30,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  controlBarBox2: {
    width: '100%',
    height: 18,
    backgroundColor: 'rgba(15, 15, 15, 0.8)',
    display: "flex",
    justifyContent: 'center',
  },
  controlBar: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(229,230,235,0.24)',
  },
  controlBarActive: {
    height: 6,
  },

  progress: {
    // width: 0,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  progressActive: {
    backgroundColor: '#FFFFFF',
  },
  controlDot: {
    position: 'relative',
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  controlDotActive: {
    right: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
})

