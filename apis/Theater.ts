import Service from './Service';

/**
 * 精选推荐
 */
export interface INetRecommendParam {
  index?: number;
  size?: number;
  tid?: any;
}
export const netRecommendData = async ({ index = 1, size = 12, tid }: INetRecommendParam) => {
  return await Service.post('glory/video/2163', { index, size, tid })
}

// 我的追剧记录list
export const netDramaList = async ({ page = 1, size = 12 }: {page?: number, size?: number}) => {
  return await Service.post('glory/video/2120', { page, size })
}

// 追剧-追
export const netDramaVideo = async (bookId: string, scene: string) => {
  return await Service.post('glory/video/2122', { bookId, scene })
}

// 追剧-取消追剧
export const netNoDramaVideo = async (bookId: string, scene: string) => {
  return await Service.post('glory/video/2121', { bookIds: bookId, scene })
}

//
// /** 运营位展示上报接口
//  * id 运营位id
//  * type 上报类型 1-曝光，2-点击
//  */
// netOperatingReport(id, type) {
//   return http.post('glory/video/2176', { id, type })
// },
