import {
  Dimensions,
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TouchableWithoutFeedback
} from "react-native";
interface IProps {
  visible: boolean;
  title: string;
  message?: string;
  leftTxt?: string;
  rightTxt?: string;
  leftBtn?: () => void;
  rightBtn?: () => void;
  close?: () => void;
}
export default function ConfirmDialog({ visible, title, message, leftTxt = '取消', rightTxt = '确认', leftBtn, rightBtn, close }: IProps) {
  return <Modal
    animationType={'fade'}
    visible={visible}
    transparent
  >
    <View style={styles.confirmWrap}>
      <View style={styles.confirmBox}>
        {close && <TouchableWithoutFeedback onPress={close}>
          <Image source={require('../assets/images/cancel.png')} style={styles.closeImg}/>
        </TouchableWithoutFeedback>}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>
        {message && <Text style={styles.message}>{message}</Text>}
        <View style={styles.btnBox}>
          <Pressable style={styles.btnLeft} onPress={leftBtn}>
            <Text style={styles.btnLeftTxt}>{leftTxt}</Text>
          </Pressable>
          <Pressable style={styles.btnRight} onPress={rightBtn}>
            <Text style={styles.btnRightTxt}>{rightTxt}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  confirmWrap: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  confirmBox: {
    padding: 20,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    width: width - 70,
    height: 197,
    borderRadius: 15,
  },
  closeImg: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 12,
    width: 18,
    height: 18,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginTop: 7,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222222',
  },
  message: {
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    color: '#666666',
    marginTop: 17,
  },
  btnBox: {
    position: 'absolute',
    left: 20,
    bottom: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnLeft: {
    width: 100,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FF4B00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLeftTxt: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FF4B00',
  },
  btnRight: {
    width: 157,
    height: 50,
    backgroundColor: '#FF4B00',
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FF4B00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRightTxt: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
  },
})
