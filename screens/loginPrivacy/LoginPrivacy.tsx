import { View, StyleSheet, Dimensions, Platform, BackHandler } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { ExpoConfig } from "@expo/config-types";
import process from "process";
import { store, useAppDispatch } from "../../store";
import useStorage from "../../utils/storage";
import { initAxios } from "../../apis/Service";
import { getStorageHeader, setStorageHeader } from "../../utils/auth";
import { userInfoAsync } from "../../store/modules/user.module";
import { getUtdidTmp } from "../../utils/logTime";
import { RootStackScreenProps } from "../../@types";
import { netImeiAuth, netRegister, netReportLand, netReportStart } from "../../apis/User";
import PrivacyPop from "./PrivacyPop";
import DeviceAuth from "./DeviceAuth";
const { brand = '', modelName, osInternalBuildId = '' } = Device;
const { deviceName = '' } = Constants;
const { extra = {} } = (Constants.expoConfig as ExpoConfig) || {};
const { appVersion, channelCode, domain } = extra;
const { width, height } = Dimensions.get('screen');


export default function LoginPrivacy({ navigation }: RootStackScreenProps<'LoginPrivacy'>) {
  const toast = useToast();
  const dispatch = useAppDispatch()
  const [visible, setVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const Storage = useStorage();
  useFocusEffect(
    useCallback(() => {
      // Storage.clear()
      isShowPrivacy()
      return () => {
        setVisible(false);
      };
    }, []),
  );

  const isShowPrivacy = async () => {
    const headerData = await Storage.getItem('header');
    await initAxios(store);
    if (!headerData) {
      setVisible(true)
    } else {
      await initAxios(store, JSON.parse(headerData));
      const { startMode, uuid, channelCode } = await getStorageHeader();
      await netReportStart({
        androidId: Device.osInternalBuildId || '',
        isRegister: false,
        sourceCid: channelCode,
        startMode,
        uuid
      });
      await netReportLand({
        sourceCid: channelCode,
        startMode,
        uuid,
      });
      dispatch(userInfoAsync());
      navigation.replace('Root', { screen: 'Player' });
    }
  }

  const confirm = async () => {
    setVisible(false)
    await nextStep();
    setDeviceVisible(true);
  }

  const cancel = () => {
    console.log('退出app');
    toast.show('退出app zzzz~~~~');
    setVisible(false);
    Platform.OS === "android" ? BackHandler.exitApp() : process.exit && process.exit(1);
  }

  const deviceCancel = () => {
    setDeviceVisible(false);
    navigation.replace('Root', { screen: 'Player' });
  }
  // 设备授权
  const deviceConfirm = async () => {
    const utdid = Device.osInternalBuildId as string;
    const { userId = '', utdidTmp, startMode, uuid } = await Storage.getItem('header');
    await setStorageHeader({ utdid });
    await netImeiAuth({
      androidId: osInternalBuildId || '',
      blackList: 1,
      ei: deviceName,
      userId,
      utdid,
      utdidTmp,
    });
    await netReportLand({
      sourceCid: channelCode,
      startMode,
      uuid,
    });
    setDeviceVisible(false);
    navigation.replace('Root', { screen: 'Player' });
  }

  const nextStep = async () => {
    const utdid = getUtdidTmp();
    const registerData = await netRegister({
      ei: deviceName,
      appVersion,
      androidId: osInternalBuildId || '',
      model: modelName || '',
      brand: brand || '',
      channelCode,
      domain,
      utdid,
      uuid: "",
      blackList: 1,
      bookId: "",
      chapterId: "",
      isUnion: "",
      pullMode: "",
      sid: "",
    });
    await initAxios(store, { ...registerData, utdid });
    await setStorageHeader({ ...registerData, utdid });
    const { startMode, uuid } = await getStorageHeader();
    await netReportStart({
      androidId: osInternalBuildId || '',
      isRegister: true,
      sourceCid: registerData.channelCode,
      startMode,
      uuid
    })
    dispatch(userInfoAsync());
  }

  return <View style={styles.loginPrivacyWrap}>
    <PrivacyPop visible={visible} cancel={cancel} confirm={confirm}/>
    <DeviceAuth visible={deviceVisible} cancel={deviceCancel} confirm={deviceConfirm}/>
  </View>
}

const styles = StyleSheet.create({
  loginPrivacyWrap: {
    width,
    height,
    backgroundColor: '#FFFFFF'
  }
})
