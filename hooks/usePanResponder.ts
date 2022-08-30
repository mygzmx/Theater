import { GestureResponderHandlers, PanResponder, PanResponderGestureState } from "react-native";

interface IProps {
  onStart?: (gestureState: PanResponderGestureState) => void;
  onMove?: (gestureState: PanResponderGestureState) => void;
  onRelease?: (gestureState: PanResponderGestureState) => void;
  onTerminate?: (gestureState: PanResponderGestureState) => void;
}

const usePanResponder = ({ onStart, onMove, onRelease, onTerminate }: IProps): GestureResponderHandlers => {
  const dzPanResponder = PanResponder.create({
    // 要求成为响应者
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder:  () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    // 用户放开了所有的触摸点，且此时视图已经成为了响应者
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    // 触摸开始
    onPanResponderGrant: (evt, gestureState) => {
      onStart && onStart(gestureState)
    },
    // 触摸点移动
    onPanResponderMove: (evt, gestureState) => {
      onMove && onMove(gestureState)
    },
    onPanResponderRelease: (evt, gestureState) => {
      onRelease && onRelease(gestureState)
    },
    // 另一个组件已经成为了新的响应者，所以当前手势将被取消
    onPanResponderTerminate: (evt, gestureState) => {
      onTerminate && onTerminate(gestureState)
    },
    // 决定当前组件是否应该阻止原生组件成为JS响应者（暂只支持android）
    onShouldBlockNativeResponder: (evt, gestureState) => {
      return true;
    }
  });
  return dzPanResponder.panHandlers
};

export default usePanResponder;
