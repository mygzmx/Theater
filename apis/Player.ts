import Constants from "expo-constants";
import {
  IChapterParams, IChapterResponse, IFinishParams,
  IPreLoadParams,
  IVideo2150, IVideo2151, IVideo2152,
  IVideoInitParams,
  IVideoSourceParams
} from "../interfaces/player.interface";
import Service from './Service';

// 初始化
export const netVideoInit = async (params: IVideoInitParams): Promise<IVideo2150> => {
  return await Service.post('glory/video/2150', { ...params, sourceChannelCode: Constants.expoConfig?.extra?.channelCode || '',})
}

// 单集加载(订购)
export const netVideoSource = async (params: IVideoSourceParams): Promise<IVideo2151> => {
  return await Service.post('glory/video/2151', params)
}

export const netVideoPreload = async (params: IPreLoadParams): Promise<IVideo2152> => {
  return await Service.post('glory/video/2152', params)
}

// 章节列表接口
export const netChapterList = async (params: IChapterParams): Promise<IChapterResponse> => {
  return await Service.post('glory/video/2112', params)
}

// 剧集播放结束上报接口
export const netVideoFinish = (params: IFinishParams) => {
  return Service.post('glory/video/2177', params)
}

// removeFromShelf(data){
//   return http.post('glory/video/2121', data)
// },
export default {
  // preloadVideo(url, data) {
  //   return http.get(url + '?' + $utils.getAppConfig('appVersion'), data)
  // },
  // addToShelf(data){
  //   return http.post('glory/video/2122', data)
  // },
  // getRecomment(data){
  //   return http.post('glory/video/2113', data)
  // },

}
