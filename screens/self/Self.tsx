import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { IUserInfo } from "../../interfaces/self.interface";
import SelfHeader from "./component/SelfHeader";

export default function Self () {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    vip: false,
    nickName: '',
    login: false,
    sex: 0, // 1-男，2-女，0-无
    userId: "",
    vipExpiryTime: "", // '' - 未开通， 'yyyy-MM-DD' - 判断是否过期
  });
  // 登录
  const handleLogin = () => {

  }
  return (
    <View style={styles.container}>
      <SelfHeader {...userInfo} handleLogin={handleLogin}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(25, 25, 25, 1)',
  },

});
