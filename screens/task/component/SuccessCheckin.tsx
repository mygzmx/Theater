import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
const ImgCheckinBtn = require('../../../assets/images/self/checkin-btn.png')
const ImgClose = require('../../../assets/images/self/normal-close.png')
interface IProps {
  visible: boolean;
  close: () => void;
  message: string;
}
export default function SuccessCheckin ({ visible, close, message }: IProps) {
  return <Modal
    animationType={'fade'}
    visible={visible}
    transparent>
    <Pressable style={styles.confirmWrap} onPress={close}>
      <View style={styles.confirmBox}>
        <Image source={ImgClose} style={styles.closeImg}/>
        <Text style={styles.title}>签到成功</Text>
        { message && <Text style={styles.message}>{message}</Text> }
        <Image style={styles.bg} source={{ uri: 'https://fvimg.kkyd.cn/images/checkin-succ.png' }}/>
        <Image source={ImgCheckinBtn} style={styles.btnBox}/>
      </View>
    </Pressable>
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
    backgroundColor: 'rgba(248, 57, 39, 1)',
    width: width - 80,
    height: 243,
    borderRadius: 15,
  },
  closeImg: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 20,
    width: 24,
    height: 24,
  },
  title: {
    width: '100%',
    marginTop: 16,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  message: {
    width: '100%',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 3,
  },
  bg: {
    position: 'absolute',
    top: 42,
    left: 0,
    width: width - 80,
    height: 143,
  },
  btnBox: {
    position: 'absolute',
    height: 68,
    left: 20,
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
