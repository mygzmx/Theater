import Service from './Service';

/**
 * 剧场数据
 */
export const netTheaterPage = async () => {
  return await Service.post('/glory/video/2160')
}

// 精选推荐
export interface INetRecommendParam {
  index?: number;
  size?: number;
  tid?: number;
}
export const netRecommendData = async ({ index = 1, size = 12, tid }: INetRecommendParam) => {
  return await Service.post('glory/video/2163', { index, size, tid })
}

// 我的追剧记录list
export const netDramaList = async ({ page = 1, size = 12 }: {page?: number, size?: number}) => {
  return await Service.post('glory/video/2120', { page, size })
}
//
// // 取消/删除追剧
// netCancelDramaVideo(bookIds = '') {
//   return http.post('glory/video/2121', { bookIds })
// },
//
// /** 运营位展示上报接口
//  * id 运营位id
//  * type 上报类型 1-曝光，2-点击
//  */
// netOperatingReport(id, type) {
//   return http.post('glory/video/2176', { id, type })
// },