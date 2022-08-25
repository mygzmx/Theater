import Service from './Service';
import { IChapterParams, IPreLoadParams, IVideoInitParams, IVideoSourceParams } from "../interfaces/player.interface";

// 初始化
export const netVideoInit = async (params: IVideoInitParams) => {
  return await Service.post('glory/video/2150', params)
}

// 单集加载(订购)
export const netVideoSource = async (params: IVideoSourceParams) => {
  return await Service.post('glory/video/2151', params)
}

export const netPreloadList = async (params: IPreLoadParams) => {
  return await Service.post('glory/video/2152', params)
}
// 章节列表接口
export const netChapterList = async (params: IChapterParams) => {
  return await Service.post('glory/video/2112', params)
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
