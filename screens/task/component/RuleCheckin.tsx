import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
const ImgClose = require('../../../assets/images/theater/close-icon.png')
interface IProps {
  visible: boolean;
  close: () => void;
  signText: string;
}
export default function RuleCheckin ({ visible, close, signText }: IProps) {
  return <Modal
    animationType={'fade'}
    visible={visible}
    transparent>
    <Pressable style={styles.ruleWrap} onPress={close}>
      <View style={styles.confirmBox}>
        <Image source={ImgClose} style={styles.closeImg}/>
        <Text style={styles.title}>签到规则</Text>
        { signText && <Text style={styles.message}>{signText}</Text> }
      </View>
    </Pressable>
  </Modal>
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  ruleWrap: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  confirmBox: {
    padding: 20,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    width: width - 100,
    borderRadius: 15,
  },
  closeImg: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 12,
    width: 15,
    height: 15,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(102, 106, 125, 1)',
  },
  message: {
    width: '100%',
    fontSize: 15,
    color: 'rgba(102, 106, 125, 1)',
  }
})
