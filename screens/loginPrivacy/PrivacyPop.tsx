/**
 * 隐私保护说明
 */
import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { AGREEMENT_H5 } from "../../utils/const";
const appName = Constants.expoConfig?.name || '繁花剧场'
interface IProps {
  visible: boolean;
  cancel: () => void;
  confirm: () => Promise<void>;
}

export default function PrivacyPop({ visible, cancel, confirm }: IProps) {

  return <Modal
    animationType={'fade'}
    visible={visible}
    transparent
  >
    <View style={styles.confirmWrap}>
      <View style={styles.confirmBox}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>隐私保护说明</Text>
        <ScrollView style={styles.content}>
          <Text style={styles.message}>欢迎使用{appName}!</Text>
          <Text style={styles.message}> 1、我们将通过
            <Pressable onPress={() => WebBrowser.openBrowserAsync(AGREEMENT_H5.USER)}>
              <Text style={{ color: '#24a7f5' }}>《用户协议》</Text>
            </Pressable>
            <Text>和</Text>
            <Pressable onPress={() => WebBrowser.openBrowserAsync(AGREEMENT_H5.PRIVACY)}>
              <Text style={{ color: '#24a7f5' }}>《隐私政策》</Text>
            </Pressable>
            帮助您了解我们收集、使用、存储个人信息的情况。特别是我们所收集的个人信息类型及用途，以及对信息的保护措施。您可以在本软件内“我的-系统设置-关于我们”中查看《用户协议》和《隐私政策》的内容并了解到您所享有的相关权利实现途径。
          </Text>
          <Text style={styles.message}>2、在使用本软件时，我们会收集、使用设备标识信息用于用户账号生成。 </Text>
          <Text style={styles.message}>3、我们可能会申请以下权限：（1）访问电话，以保障软件服务的安全运营及效率，并用于统计及安全校验；（2）访问本地存储，帮助您将本软件内剧集下载到您的手机存储，以及通过手机存储将您的本地剧集上传到本软件；（3）访问照片，您可以选择手机内的照片或图片进行上传或与客服沟通时提供证明；（4）访问您设备上的媒体内容和文件， 用于读写剧集封面、活动图片的缓存，提升应用使用流畅度；（5）访问日历，如您参与定时活动，您可以主动开启或取消提醒，开启提醒的用户，将会收到日历提醒通知；（6）开启推送，您可以通过开启推送权限来接收本软件推送的消息；（7）开启无线数据，您可以通过连接无线网络或蜂窝数据来实现本软件需要的联网功能；（8）访问安装程序列表，您可以通过获取您的安装程序列表我们可以确认您是否安装了我们所推广的产品，以便我们及时向您发放相应奖励；（9）访问剪贴板，您可以复制并粘贴读者QQ群号码、客服电话；（10）开启麦克风和语音识别，您可以通过语音来控制本软件的语音朗读功能及语音控制功能；（11）开启后台应用刷新，开启后可以实现语音朗读不受产品切换到后台的影响而暂停播放；（12）您可以为使用词典、百科、语音朗读之目的获取设备网络权限；（13）您选择参与提现活动时，我们的第三方合作伙伴可能会需要您提供姓名、身份证号完成实名认证，如您不进行实名认证，可能无法进行提现，但不影响您使用我们提供的其他服务。</Text>
          <Text style={[ styles.message, { paddingBottom: 200, } ]}>如您同意请点击“同意并继续”按钮以开启我们的服务。</Text>
        </ScrollView>
        <LinearGradient style={styles.btnBox} colors={["rgba(255,255,255,0)", 'rgba(255,255,255,0.8)', "rgba(255,255,255,0.9)", "#FFFFFF"]}>
          <Pressable style={styles.btnLeft} onPress={confirm}>
            <Text style={styles.btnLeftTxt}>同意并继续</Text>
          </Pressable>
          <Pressable style={styles.btnRight} onPress={cancel}>
            <Text style={styles.btnRightTxt}>不同意</Text>
          </Pressable>
        </LinearGradient>
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
  content: {
    flex: 1,
    marginTop: 20,
  },
  confirmBox: {
    padding: 20,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    width: width - 40,
    height: height/3*2,
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
    left: 20,
    bottom: 20,
    width: '100%',
    height: 170,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  btnLeft: {
    width: '70%',
    height: 45,
    backgroundColor: '#FF4B00',
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
    color: '#FFFFFF',
  },
  btnRight: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRightTxt: {
    fontSize: 17,
    color: '#666666',
  },
})
