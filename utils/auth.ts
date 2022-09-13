import { Dimensions } from "react-native";
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { ExpoConfig } from '@expo/config-types';
import { IRegisterResult } from "../interfaces/user.interface";
import { getLogTime, getUtdidTmp } from "./logTime";
import useStorage from "./storage";
const Storage = useStorage();

const createHeader = async () => {
  const { width, height } = Dimensions.get('screen')
  const { brand, modelName, osName, osVersion, osInternalBuildId, DeviceType, isDevice, getDeviceTypeAsync } = Device;
  console.log(JSON.stringify(Device))
  const { nativeAppVersion, nativeBuildVersion } = Constants;
  const { extra = {} } = (Constants.expoConfig as ExpoConfig) || {}
  const { appName, appVersion, channelCode, domain } = extra;
  const header = {
    os: osName,
    brand,
    channelCode,
    channelCodeFee: channelCode,
    domain,
    model: modelName,
    osvc: osInternalBuildId,
    osvn: osVersion,
    pfvc: nativeBuildVersion,
    pfvn: nativeAppVersion,
    pname: appName, // OS === 'android' ?  : '',
    appVer: appVersion,
    // readPref: "0",
    // scDistinctId: "1660788772375-7082386-074f583b45e1e7-26871655", // 神策匿名id
    sch: Math.floor(height),
    scw: Math.floor(width),
    startMode: isDevice ? DeviceType[await getDeviceTypeAsync()] : '',
    t: "", // 用户登录的token
    triggerTime: getLogTime(),
    userId: '',
    utdid: '',
    utdidTmp: getUtdidTmp(),
    uuid: "",
  }
  console.log('header=============================>',header)
  return header;
}

export const getStorageHeader = async (): Promise<{[key: string]: any}> => {
  const headerData =  await Storage.getItem('header');
  if (!headerData) {
    return await createHeader()
  }
  return JSON.parse(headerData);
};

export const setStorageHeader = async (params: { [key: string]: any }) => {
  const headerData = await getStorageHeader();
  await Storage.setItem('header', JSON.stringify({ ...headerData, ...params }));
}
