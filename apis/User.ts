// 免授权注册游客账号
import { IUserData } from "../interfaces/self.interface";
import Service from "./Service";

export const netRegister = (data: any) => {
  return Service.post('glory/video/2101', data)
}

// 获取用户信息
export const netUserInfo = (): Promise<IUserData> => {
  return Service.post('glory/video/2106')
}

// 授权绑定游客账号
export const netImeiAuth = (data: any) => {
  return Service.post('glory/video/2108', data)
}



// export default {
//   // 获取用户信息
//   getUserInfo(data) {
//     return http.post('glory/video/2106', data)
//   },
//   // 免授权注册游客账号
//   netRegister(data) {
//     return http.post('glory/video/2101', data)
//   },
//   // 发送短信验证码
//   netSendCode(data) {
//     return http.post('glory/video/2102', data)
//   },
//   // 登录
//   netLogin(data) {
//     return http.post('glory/video/2105', data)
//   },
//   // 初始化
//   netInit(data) {
//     return http.post('glory/video/2150', data)
//   },
//   // 授权绑定游客账号
//   netImeiAuth(data) {
//     return http.post('glory/video/2108', data)
//   },
//   // 注销账号
//   netLogout(data) {
//     return http.post('glory/video/2109', data)
//   },
//   // 确认注销
//   netLogoutSure(data) {
//     return http.post('glory/video/2110', data)
//   },
//   //启动上报
//   netReportStart(data) {
//     return http.post('glory/video/2173', data)
//   },
//   //投放上报
//   netReportLand(data) {
//     return http.post('glory/video/2172', data)
//   }
// }
