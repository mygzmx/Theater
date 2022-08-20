import Service from './Service';
import { IPreLoadParams, IVideoSourceParams } from "../interfaces/player.interface";

// 单集加载(订购)
export const netVideoSource = async (params: IVideoSourceParams) => {
  return await Service.post('glory/video/2151', params)
}

export const netPreloadList = async (params: IPreLoadParams) => {
  return await Service.post('glory/video/2152', params)
}

export default {
  // preloadVideo(url, data) {
  //   return http.get(url + '?' + $utils.getAppConfig('appVersion'), data)
  // },
  // getCatalogList(data) {
  //   return http.post('glory/video/2112', data)
  // },
  // addToShelf(data){
  //   return http.post('glory/video/2122', data)
  // },
  // removeFromShelf(data){
  //   return http.post('glory/video/2121', data)
  // },
  // getRecomment(data){
  //   return http.post('glory/video/2113', data)
  // },
  // playFinish(data){
  //   return http.post('glory/video/2177', data)
  // }
}
