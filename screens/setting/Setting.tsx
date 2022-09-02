import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import { netSetting, netUpdateUserInfo } from "../../apis/Self";
import { RootState } from "../../store";
const ImgMoreAbout = require('../../assets/images/more-about.png');

export default function Setting () {
  const toast = useToast()
  const navigation = useNavigation()
  const [apiChangeCount, setApiChangeCount] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [sfAutoPays, setSfAutoPays] = useState();
  const [aliPayVisible, setAliPayVisible] = useState(false);
  const [isAps, setIsAps] = useState(0);
  const [isPop, setIsPop] = useState(false);
  const login = useSelector((state: RootState) => state.user.user.login)

  const versionName = '1.0.0';
  useFocusEffect(
    useCallback(() => {
      setApiChangeCount(0)
      return () => {
        setApiChangeCount(0)
      };
    }, []),
  );
  const getSettingData = async () => {
    const { sfAutoPay = 0, isAp = 0 } = await netSetting()
    setSfAutoPays(sfAutoPay);
    setIsAps(isAp)
  }
  const cancelAliPay = () => {
    setAliPayVisible(true);
  }
  const aliPayConfirm = async () => {
    await netUpdateUserInfo({ sfPayUnSign: 1 }).then(() => {
      toast.show('免密支付已关闭');
      getSettingData();
    }).catch(() => {
      toast.show('关闭失败，请重试');
    });
  }
  const logOut = () => {
    navigation.navigate('Player');
  }
  return <View style={styles.settingWrap}>
    <ConfirmDialog
      visible={aliPayVisible || isPop}
      title={aliPayVisible ? "支付宝免密支付" : '退出登录'}
      message={aliPayVisible ? "关闭后无法使用免密支付充值，确认关闭吗？" : '确定退出账号吗？'}
      leftBtn={() => aliPayVisible ? setAliPayVisible(false) : setIsPop(false)}
      rightBtn={() => aliPayVisible ? aliPayConfirm() : logOut()}
      close={() => aliPayVisible ? setAliPayVisible(false) : setIsPop(false)}/>
    <Pressable style={styles.settingItem} onPress={() => setApiChangeCount(pre => pre + 1)}>
      <Text style={styles.settingItemLabel}>当前版本</Text>
      <Text style={styles.settingItemRightTxt}>{versionName}</Text>
    </Pressable>
    <View style={styles.settingItem}>
      <Text style={styles.settingItemLabel}>清除缓存</Text>
      { fileList.length > 0 ? <Pressable style={styles.clearItemRight} onPress={() => setApiChangeCount(pre => pre + 1)}>
        <Text style={styles.clearItemRightTxt}>清除</Text>
      </Pressable> : <Text>0MB</Text>}
    </View>
    {isAps === 1 && <Pressable style={styles.settingItem} onPress={() => {
      // @ts-ignore
      navigation.navigate('AutoOrder')
    }}>
      <Text style={styles.settingItemLabel}>自动解锁管理</Text>
      <Image style={styles.settingItemMore} source={ImgMoreAbout}/>
    </Pressable>}
    {sfAutoPays === 1 && <View style={styles.settingItem}>
      <Text style={styles.settingItemLabel}>支付宝免密支付</Text>
      <Pressable style={styles.clearItemRight} onPress={() => cancelAliPay()}>
        <Text style={styles.clearItemRightTxt}>关闭</Text>
      </Pressable>
    </View>}
    <Pressable style={{ ...styles.settingItem, ...styles.settingItem2 }} onPress={() => {
      // @ts-ignore
      login ? navigation.navigate('Login') : toast.show('您未使用手机号登录，无需注销账号');
    }}>
      <View>
        <Text style={styles.settingItemLabel}>注销账号</Text>
        <Text style={styles.settingItemLabel2}>注销后账号内数据将无法恢复，请谨慎操作</Text>
      </View>
      <Image style={styles.settingItemMore} source={ImgMoreAbout}/>
    </Pressable>
    { login && <Pressable style={{ ...styles.settingItem, marginTop: 6, height: 58, justifyContent: 'center' }} onPress={() => {
      // @ts-ignore
      navigation.navigate('Login')
    }}>
      <Text style={{ ...styles.settingItemLabel }}>切换账号</Text>
    </Pressable> }
    <Pressable style={{ ...styles.settingItem, marginTop: 6, height: 58, justifyContent: 'center' }} onPress={() => setIsPop(true)}>
      <Text style={{ ...styles.settingItemLabel, color: '#FF4B00', fontWeight: 'bold' }}>退出登录</Text>
    </Pressable>
  </View>
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  settingWrap: {
    backgroundColor: '#F3F5F9',
    minHeight: height,
  },
  settingItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  settingItem2: {
    marginTop: 6,
    height: 82,
  },
  settingItemLabel: {
    fontSize: 16,
    color: '#191919',
  },
  settingItemLabel2: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 4,
  },

  settingItemRightTxt: {
    fontSize: 16,
    color: '#444444',
  },
  clearItemRight: {
    width: 68,
    height: 30,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FF4B00',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 9,
  },
  clearItemRightTxt: {
    fontSize: 14,
    color: '#FF4B00',
  },
  settingItemMore: {
    width: 15,
    height: 15,
  }
})
