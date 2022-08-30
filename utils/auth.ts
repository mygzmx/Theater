import { Dimensions, Platform, PlatformAndroidStatic } from "react-native";
import { getLogTime, getUtdidTmp } from "./logTime";
import appConfig from "./app.config";

const { width, height } = Dimensions.get('screen')
const { OS, Version } = Platform as PlatformAndroidStatic;
const { Brand = '', Model = '', Release = '', uiMode } = Platform.constants as PlatformAndroidStatic["constants"];

const { domain, channelCode } = appConfig;

export const getHeader = () => ({
  os: OS,
  brand: Brand,
  channelCode,
  channelCodeFee: channelCode,
  domain,
  model: Model,
  osvc: Version,
  osvn: Release,
  pfvc: 1090,
  pfvn: "1.9",
  pname: "com.dianzhong.fhjc", // OS === 'android' ?  : '',
  // readPref: "0",
  scDistinctId: "1660788772375-7082386-074f583b45e1e7-26871655", // 神策匿名id
  sch: height,
  scw: width,
  startMode: uiMode,
  t: "", // 用户登录的token
  triggerTime: getLogTime(),
  userId: '' || "2006902",
  utdid: "fa2f55573bdf09e4b7e0613b5139cffc",
  utdidTmp: getUtdidTmp(),
  uuid: "",
});
