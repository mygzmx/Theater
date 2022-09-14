import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  TouchableWithoutFeedback
} from "react-native";
import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useToast } from "react-native-toast-notifications";
import { Base64 } from 'js-base64'
import { AGREEMENT_H5 } from "../../utils/const";
import { regPhone } from "../../utils/reg";
import { netSendCode } from "../../apis/User";
import { RootStackScreenProps } from "../../@types";
const { height } = Dimensions.get('screen');
const ImgLogo = require('../../assets/images/user/logo.png');
const ImgBtn = require('../../assets/images/user/button.png');
const ImgSelect = require('../../assets/images/user/select-icon.png');

export default function Login ({ navigation }: RootStackScreenProps<'Login'>) {
  const toast = useToast()
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const sendCode = async () => {
    if (!phone) {
      toast.show('请输入手机号码', { duration: 1000 });
      return false;
    }
    if (!regPhone.test(phone)) {
      toast.show('请输入正确的手机号码', { duration: 1000 });
      return false;
    }
    // this.single !== 'logout' && this.checkAgree &&
    if (!isChecked) {
      toast.show('请先阅读并同意用户协议和隐私策略', { duration: 1000 });
      return false;
    }

    netSendCode(Base64.encode(phone) || phone)
    // @ts-ignore
    navigation.replace('VerificationCode', { phone })
  }
  return <View style={styles.loginWrap}>
    <Image style={styles.loginLogo} source={ImgLogo}/>
    <Text style={styles.logoTxt}>繁花剧场</Text>
    <View style={styles.loginInputBox}>
      <TextInput
        style={[styles.loginInput, { fontSize: phone ? 30 : 16, textAlign: phone ? 'center' : 'left' }]}
        placeholder="请输入手机号码"
        onChangeText={text => setPhone(text)}
        value={phone}
        keyboardType={'phone-pad'}
        maxLength={11}
        numberOfLines={1}
        textContentType={'telephoneNumber'}
      />
    </View>
    <TouchableWithoutFeedback onPress={() => sendCode()}>
      <ImageBackground source={ImgBtn} style={[styles.btnBox, { backgroundColor: phone && regPhone.test(phone) ? 'rgba(255, 75, 0, 1)' : undefined }]}>
        <Text style={styles.btnTxt}>获取短信验证码</Text>
      </ImageBackground>
    </TouchableWithoutFeedback>

    <View style={styles.messageBox}>
      <Pressable style={styles.noSelect} onPress={() => setIsChecked(!isChecked)}>
        {isChecked && <Image style={styles.ImgSelect} source={ImgSelect} />}
      </Pressable>

      <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text style={styles.message}> 我已阅读并同意繁花剧场</Text>
        <Pressable onPress={() => WebBrowser.openBrowserAsync(AGREEMENT_H5.USER)}>
          <Text style={{ color: 'rgba(64, 70, 87, 1)' }}>《用户协议》</Text>
        </Pressable>
        <Text>和</Text>
        <Pressable onPress={() => WebBrowser.openBrowserAsync(AGREEMENT_H5.PRIVACY)}>
          <Text style={{ color: 'rgba(64, 70, 87, 1)' }}>《隐私政策》</Text>
        </Pressable>
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  loginWrap: {
    flex: 1,
    height,
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#FFFFFF',
  },
  loginLogo: {
    width: 80,
    height: 80,
    marginTop: 44,
    marginBottom: 16,
  },
  logoTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191919',
  },
  loginInputBox: {
    width: 295,
    height: 40,
    marginTop: 37,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#E5E6EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginInput: {
    width: 227,
    justifyContent: 'center',
    fontSize: 16,
  },
  btnBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    height: 49,
    width: 295,
    borderRadius: 25,
    overflow: 'hidden',
  },
  btnTxt: {
    color: '#ffffff',
    fontSize: 16,
  },
  messageBox: {
    paddingLeft: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ImgSelect: {
    position: "absolute",
    top: -1,
    left: -1,
    width: 16,
    height: 16,
  },
  noSelect: {
    marginTop: 7,
    position: 'relative',
    marginRight: 7,
    borderStyle: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    width: 16,
    height: 16,
  },
  message: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 25,
  }
})
