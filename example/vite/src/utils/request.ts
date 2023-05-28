import Request, { ERROR_CODE } from '@bwrong/request';
import type { RequestInterceptor, RequestTransform, RequestResponse } from '@bwrong/request';
import { ENV } from '@/utils/env';

const { VITE_APP_API_ROOT: baseURL } = ENV;

const interceptors: RequestInterceptor = {
  requestInterceptor: config => {
    //请求拦截器
    config.headers = {
      ...config.headers,
      'Auth-Content': 'auth-content',
    };
    return config;
  },
  responseInterceptorCatch: error => {
    console.log(error);
    const { response } = error;
    if (response) {
      // 非成功状态码
      console.log(response);
      return Promise.reject(response);
    } else {
      // 未联网
      // alert('网络异常，请检查网络连接');
      return Promise.reject(new Error('网络异常，请检查网络连接'));
    }
  },
};

const transforms: RequestTransform = {
  requestTransform(config) {
    config.headers = {
      ...config.headers,
      Auth: '123123132',
    };
    return config;
  },
  responseTransform({ data }, config) {
    const { result, error } = data as Result;
    console.log('data', data, config);

    if (!error) {
      return result;
    } else {
      return ERROR_CODE;
    }
  },
  // responseTransformCatch(err) {
  //   // 全局错误处理
  //   console.log('responseTransformCatch', err);

  //   return Promise.reject(err);
  // }
};

export interface Result<T = any> {
  error: number;
  message: string;
  result: T;
}

const request = new Request({
  baseURL,
  timeout: 10 * 1000,
  transforms,
  interceptors,
});

export default request;
