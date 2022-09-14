
/**接口域名 */
export const ENVIRONMENT = {
  // 'prod': 'https://fastvideo.kkyd.cn',
  // 'stage': 'https://yfbvideo.kky.dzods.cn',
  'test': 'http://223.kky.dzods.cn',
}

const env = 'test';

export const API = ENVIRONMENT[env];

export const AGREEMENT_H5 = {
  USER: `${API}/huodong/short_video/fhjc/agreement/user.html`,
  PRIVACY: `${API}/huodong/short_video/fhjc/agreement/privacy.html`,
  VIP: `${API}/huodong/short_video/fhjc/agreement/vip.html`,
  LOGINOTICE: `${API}/huodong/short_video/fhjc/agreement/loginotice.html`,
}

export const OPERATION_TYPE = {
  1: 'VIP到期',
  2: '看点到期',
  3: '登录引导',
  4: '追剧提醒',
  6: '剧集',
  7: '活动',
  8: '在看页挂件',
  9: '剧场挂件',
  10: '剧场弹窗',
  11: '充值页挽留',
}
export const OPERATION_POSITION = {
  1: '全局浮层',
  2: '在看页挂件',
  3: '在看页返回',
  4: '剧场挂件',
  5: '剧场弹窗',
  6: '充值页挽留',
  7: '退出应用',
  8: '签到页顶部banner',
  9: '剧场顶部',
  10: '终章推荐',
}
