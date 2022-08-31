import { View, StyleSheet, Dimensions, ImageBackground, Image, Text, TouchableWithoutFeedback } from "react-native";
import { IUserInfo } from "../../../interfaces/self.interface";
const ImgAvatar = require('../../../assets/images/self/avatar.png');
const ImgUnloginAvatar = require('../../../assets/images/self/unlogin-avatar.png');

interface IProps extends IUserInfo {
  handleLogin: () => void;
}

export default function SelfHeader({ nickName, userId, login, handleLogin }: IProps) {

  return (<View style={styles.selfHeader}>
    <ImageBackground source={{ uri: 'https://fvimg.kkyd.cn/images/self-bg.png' }} style={styles.headerTitle}>
      <View style={styles.avatarBox}>
        <Image style={styles.avatar} source={login ? ImgAvatar : ImgUnloginAvatar}/>
        <View style={styles.avatarMsg}>
          <Text style={styles.avatarName}>{nickName}</Text>
          {userId && <Text style={styles.avatarId}>ID：{userId}</Text>}
        </View>
        {!login && <TouchableWithoutFeedback onPress={() => handleLogin()}>
          <View style={styles.loginBtn}>
            <Text style={styles.loginBtnTxt}>登录</Text>
          </View>
        </TouchableWithoutFeedback>}
      </View>
    </ImageBackground>
  </View>)
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  selfHeader: {
    width,
    position: 'relative',
  },
  headerTitle: {
    width,
    height: 145,
  },
  avatarBox: {
    marginTop: 30,
    display: "flex",
    height: 54,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 31,
    backgroundColor: '#b8b8b8',
    overflow: 'hidden',
  },
  avatarMsg: {
    flex: 1,
    height: 54,
    marginLeft: 11,
  },
  avatarName: {
    height: 32,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  avatarId: {
    height: 18,
    fontSize: 13,
    color: '#9E9E9E',
    lineHeight: 18,
  },
  loginBtn: {
    width: 72,
    borderRadius: 36,
    height: 29,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnTxt: {
    fontSize: 16,
    color: '#FFFFFF',
  }
})
