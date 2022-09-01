import { IBookVoListItem } from "../interfaces/viewingRecords.interface";
import Service from "./Service";
import { INetTaskData } from "../interfaces/self.interface";

/** 观看记录
 * @param page
 * @param size
 */
export const netViewRecordsList = async (page: number = 1, size: number = 12): Promise<{size: number; bookSize: number; bookVoList: IBookVoListItem[]}> => {
  return await Service.post('glory/video/2123', { page, size })
}

/** 意见反馈提交
 * @param type
 * @param content
 * @param phoneNum
 */
export const netFeedBack = ( type: string, content: string, phoneNum: string ) => {
  return Service.post('glory/video/2171', { type, content, phoneNum })
}

/** 任务和签到数据*/
export const netTaskData = (): Promise<INetTaskData> => {
  return Service.post('glory/video/2404', { signText: 1 })
}

/** 完成任务
 * @param action
 * @param readDuration
 * @param bookId
 */
export const netFinishTask = ({ action, readDuration, bookId }: { action?: number, readDuration?: number, bookId?: number }) => {
  return Service.post('glory/video/2146', { action, readDuration, bookId })
}

/** 签到*/
export const netCheckIn = () => {
  return Service.post('glory/video/2405')
}

// export default {


//   // 追剧-追
//   netDramaVideo({ bookId, scene, omap }) {
//     return http.post('glory/video/2122', {
//       bookId,
//       scene,
//       omap: omap ? JSON.stringify(omap) : '',
//     })
//   },

//   // 用户设置详情
//   netSetting() {
//     return http.post('glory/video/2150')
//   },
//   // 更新用户信息
//   netUpdateUserInfo(data) {
//     return http.post('glory/video/2107', data)
//   },

//   // 领取任务奖励 type--1-任务，2-VIP用户读屏蔽书籍领取补偿书币，3-问卷调查领取书币，
//   // 4-用户等级奖励，5-订购满100章，6-广告墙领奖励, 7-现金红包任务，8-企微关注，9-O企号关注
//   netReceiveTask(taskId, type = 1) {
//     return http.post('glory/video/2141', { taskId, type })
//   },
//   // 解锁的剧集列表
//   netUnlockRecord({ index = 1 }) {
//     return http.post('glory/video/2194', { index })
//   },
//   /** 获得记录
//    * lastId 最后一个记录的ID 第一页传0
//    * timeStr 最后一个月份 第一页可不传
//    */
//   netObtainRecord({ timeStr, lastId = 0 }) {
//     return http.post('glory/video/2192', { timeStr, lastId })
//   },
//   /** 消费记录
//    * lastId 最后一个记录的ID 第一页传0
//    * timeStr 最后一个月份 第一页可不传
//    * rid 最后一条过期记录的ID 第一页可不传或者传0
//    */
//   netConsumeRecord({ timeStr, lastId = 0, rid = 0 }) {
//     return http.post('glory/video/2193', { timeStr, lastId, rid })
//   },
//   /** 充值订单记录
//    * lastId 最后一个记录的ID 第一页传0
//    * timeStr 最后一个月份 第一页可不传
//    */
//   netOrderRecord({ timeStr, lastId = 0 }) {
//     return http.post('glory/video/2191', { timeStr, lastId })
//   },
//   // 用户账户余额详情
//   netWallet() {
//     return http.post('glory/video/2190')
//   },
//
// }
