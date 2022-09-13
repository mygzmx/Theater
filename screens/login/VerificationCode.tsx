import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import React, { useEffect, useState, } from "react";
import { useToast } from "react-native-toast-notifications";
import { useRoute } from "@react-navigation/native";
import { useCountdown } from "react-native-countdown-circle-timer";
import { netSendCode } from "../../apis/User";
import { RootStackScreenProps } from "../../@types";
import { encrypt } from "../../utils/rsa";
const { height } = Dimensions.get('screen');
const ImgLogo = require('../../assets/images/user/logo.png');

export default function VerificationCode ({ navigation }: RootStackScreenProps<'VerificationCode'>) {
  const route = useRoute()
  const toast = useToast()
  const [phone, setPhone] = useState('');
  const [vCode, setVCode] = useState('');
  const [countDown, setCountDown] = useState(60);
  useEffect(() => {
    const _phone = (route?.params as any)?.phone || ''
    setPhone(_phone)
  }, [])
  const _countDown = useCountdown({ isPlaying: true, duration: 60, colors: '#abc', onUpdate: (remainingTime) => setCountDown(remainingTime)});
  const sendCode = async () => {
    await netSendCode(encrypt(phone) || phone)
    // navigation.
  }
  const onchange = (txt: string) => {
    setVCode(txt);
    if (txt.length === 4) {
      navigation.replace('Root', { screen: 'Self' })
    }
  }
  return <View style={styles.loginWrap}>
    <Image style={styles.loginLogo} source={ImgLogo}/>
    <Text style={styles.logoTxt}>繁花剧场</Text>

    <Text style={styles.logoCodeTxt}>输入验证码</Text>
    <Text>验证码已发送至{ phone }</Text>
    <View style={styles.loginInputBox}>
      <TextInput
        style={[styles.loginInput]}
        onChangeText={text => onchange(text)}
        value={vCode}
        keyboardType={'numeric'}
        maxLength={4}
        numberOfLines={1}
      />
      <View style={styles.inputLineBox}>
        {Array.from({ length: 4 }, (v, i) => {
          return <View style={styles.inputLine}/>
        })}
      </View>
    </View>

    { countDown > 1 ? <Text>{countDown}秒后重新获取</Text> : <TouchableWithoutFeedback onPress={() => sendCode()}>
      <Text style={styles.btnTxt}>重新获取验证码</Text>
    </TouchableWithoutFeedback>}
  </View>
}

const styles = StyleSheet.create({
  loginWrap: {
    height,
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
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
  logoCodeTxt: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgba(25, 25, 25, 1)',
    marginBottom: 15,
    marginTop: 45,
  },
  loginInputBox: {
    width: 260,
    marginTop: 37,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  loginInput: {
    height: 40,
    width: 260,
    justifyContent: 'center',
    fontSize: 35,
    letterSpacing: 45,
    textAlign: 'center',
  },
  inputLineBox: {
    // backgroundColor: 'red',
    width: '100%',
    height: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  inputLine: {
    width: '22%',
    height: 1,
    backgroundColor: '#E5E6EB',
  },
  btnTxt: {
    color: 'rgba(118, 185, 115, 1)',
    fontSize: 16,
    fontWeight: '500',
  },
})
