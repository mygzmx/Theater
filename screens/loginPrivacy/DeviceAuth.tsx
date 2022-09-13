/**
 * 设备信息权限申请
 */
import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import Constants from "expo-constants";
const appName = Constants.expoConfig?.name || '繁花剧场'

interface IProps {
  visible: boolean;
  cancel: () => void;
  confirm: () => Promise<void>;
}

export default function DeviceAuth({ visible, cancel, confirm }: IProps) {
  return <Modal
    animationType={'fade'}
    visible={visible}
    transparent
  >
    <View style={styles.confirmWrap}>
      <View style={styles.confirmBox}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>设备信息权限申请</Text>
        <Text style={styles.message}>        为了识别手机设备，生成您的账户，请允许{appName}使用设备信息权限。</Text>
        <View style={styles.btnBox}>
          <Pressable style={styles.btnRight} onPress={cancel}>
            <Text style={styles.btnRightTxt}>不同意</Text>
          </Pressable>
          <Pressable style={styles.btnLeft} onPress={confirm}>
            <Text style={styles.btnLeftTxt}>同意并继续</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
}

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  confirmWrap: {
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
    width: width - 70,
    height: 180,
    borderRadius: 15,
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
    fontSize: 15,
    color: '#666666',
    marginTop: 17,
    lineHeight: 22,
  },
  btnBox: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width - 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnLeft: {
    flex: 1,
    height: 50,
    backgroundColor: '#FF4B00',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 15,
  },
  btnLeftTxt: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  btnRight: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(242,242,242,1)',
    borderBottomLeftRadius: 15,
  },
  btnRightTxt: {
    fontSize: 17,
    color: '#666666',
  },
})
