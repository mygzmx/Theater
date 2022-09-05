import axios, { Method, AxiosError, AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios'
import { Store } from "redux";
import { RootState } from "../store";
import { getHeader } from "../utils/auth";

declare module 'axios' {
  export interface AxiosInstance {
    redux: Store<RootState>;
  }
  export interface AxiosResponse<T = any> extends Promise<T> { }
}

// 定义接口
interface PendingType {
  url?: string;
  method?: Method | string;
  params: any;
  data: any;
  cancel: () => void;
}

// 取消重复请求
const pending: PendingType[] = [];
const CancelToken = axios.CancelToken;
/**接口域名 */
export const BASE_URL = 'http://223.kky.dzods.cn';

const Service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000
});

export const initAxios = (store: Store<RootState>) => {
  if (!Service.redux) {
    Object.defineProperty(Service, 'redux', {
      get() {
        return store;
      },
    });
    // window.addEventListener('pageshow', () => initAxios(store));
  }
  // @ts-ignore
  // store.dispatch(userInfoAsync())
  // 校验带过期时间的token等
  // 5分钟检查一次token等信息
  // setTimeout(() => initAxios(store), 5 * 60 * 1000);
}
// 添加请求拦截器
Service.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    const tempHeader = await getHeader() as { [key: string]: any }
    request.headers = {
      ...request.headers,
      ...tempHeader,
      userId: Service.redux.getState().user.user.userId,
    }
    request.cancelToken = new CancelToken((c) => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c
      });
    });
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Service.interceptors.response.use(
  (response: AxiosResponse): AxiosPromise<any> => {
    if (response.status === 404) {
      // router.push({ path: '/404' })
    }
    if (response.status === 200 && response.data.retCode === 0) {
      //   if (response.data.code === 6) {
      //     // 清除用户信息
      //     UserModule.ResetToken();
      //     ElMessage.error('登录失效');
      //   }
      return Promise.resolve(response.data?.data)
    } else {
      console.log('error--------------------------->', response.data)
      return Promise.reject(response.data)
    }
  },
  (err: AxiosError) => {
    console.log('axios err--------------------------->', err)
    const navigator = window.navigator
    if (!navigator.onLine) {
      // ElMessage.error('offline')
    } else if (err.response?.status === 401) {
      // ElMessage.error('登录失效')
      // router.push({ path: '/401' })
    } else if (err.response) {
      const { data } = err.response
      // ElMessage.error(data?.message)
    } else {
      // ElMessage.error('network error')
    }
    return Promise.reject(err)
  }
);

export default Service
