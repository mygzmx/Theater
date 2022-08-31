import appConfig from "./app.config";

/**接口域名 */
export const ENVIRONMENT = {
  'prod': 'https://fastvideo.kkyd.cn',
  'stage': 'https://yfbvideo.kky.dzods.cn',
  'test': 'http://223.kky.dzods.cn',
}

export const API = ENVIRONMENT[appConfig.env];

export const AGREEMENT_H5 = {
  USER: `${API}/huodong/short_video/fhjc/agreement/user.html`,
  PRIVACY: `${API}/huodong/short_video/fhjc/agreement/privacy.html`,
  VIP: `${API}/huodong/short_video/fhjc/agreement/vip.html`,
  LOGINOTICE: `${API}/huodong/short_video/fhjc/agreement/loginotice.html`,
}
