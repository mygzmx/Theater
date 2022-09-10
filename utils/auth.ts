import { Dimensions } from "react-native";
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { expo } from '../app.json';
import { getLogTime, getUtdidTmp } from "./logTime";
const { width, height } = Dimensions.get('screen')
const { brand, modelName, osName, osVersion, osInternalBuildId, DeviceType, isDevice, getDeviceTypeAsync } = Device
const { domain, channelCode } = expo.extra;

export const getHeader = async () => {
  console.log('Constants-------->', Constants)
  const header = {
    os: osName,
    brand,
    channelCode,
    channelCodeFee: channelCode,
    domain,
    model: modelName,
    osvc: osInternalBuildId,
    osvn: osVersion,
    pfvc: 1090,
    pfvn: "1.9",
    pname: "com.dianzhong.fhjc", // OS === 'android' ?  : '',
    readPref: "0",
    scDistinctId: "1660788772375-7082386-074f583b45e1e7-26871655", // 神策匿名id
    sch: height,
    scw: width,
    startMode: isDevice ? DeviceType[await getDeviceTypeAsync()] : '',
    t: "", // 用户登录的token
    triggerTime: getLogTime(),
    userId: '',
    utdid: "fa2f55573bdf09e4b7e0613b5139cffc",
    utdidTmp: getUtdidTmp(),
    uuid: "",
  }
  console.log('header=============================>',header)
  return header;
};
