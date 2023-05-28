/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import type {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorOptions,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios';

interface RequestInterceptors<DATA = any, RES = any> {
  // 请求拦截
  requestInterceptor?: (config: InternalAxiosRequestConfig<DATA>) => InternalAxiosRequestConfig<DATA>;
  requestInterceptorCatch?: (err: any) => any;
  requestInterceptorOption?: AxiosInterceptorOptions;
  // 响应拦截
  responseInterceptor?: <T extends RES = RES>(response: AxiosResponse<T, DATA>) => any;
  responseInterceptorCatch?: (err: AxiosError<RES>) => any;
  responseInterceptorOption?: AxiosInterceptorOptions;
}
// 自定义传入的参数
export interface RequestConfig<DATA = any> extends AxiosRequestConfig<DATA> {
  /** 开启取消重复请求功能：
   * 可以在实例配置，也可以单独在接口开启
   */
  cancelDuplicateRequest?: boolean;
  /**
   * 设置在多长时间内不允许发送重复请求
   * 可以在实例配置，也可以单独在接口开启
   */
  cancelPendingTime?: number;
  /** 指定当前请求的key，
   * 如果传递该参数，则会覆盖generateRequestKey生成的key
   * */
  requestUniqueKey?: string;
}
interface InstanceRequestConfig<DATA = any, RES = any> extends Omit<RequestConfig<DATA>, 'requestUniqueKey'> {
  /**
   * 拦截器配置：
   * 请求拦截及配置：requestInterceptor、requestInterceptorCatch、requestInterceptorOption
   * 相应拦截及配置：responseInterceptor、responseInterceptorCatch、responseInterceptorOption
   */
  interceptors?: RequestInterceptors<DATA, RES>;
  /**
   * 创建请求创建唯一标识，重复请求用此作区分, 默认基于url、method、参数生成
   * 在实例设置时
   * @param requestConfig
   * @returns
   */
  generateRequestKey?: (config: AxiosRequestConfig) => string;
}
class Request<R = any, D = any> {
  private static interceptors: RequestInterceptors;
  private instance: AxiosInstance;
  private config: InstanceRequestConfig<D, R>;
  private pendingRequests: Map<string, AbortController> = new Map();
  /**
   * 自己封装的Request，支持如下功能
   * 1. 多实例，在存在多个请求服务时使用
   * 2. 拦截器增强，支持全局拦截器和实例拦截器，执行顺序采用洋葱模型
   * 3. 支持重复请求取消功能，重复请求：url、method、参数均一致为重复，也可以自己传入判断函数
   * 4. 支持直接请求绝对地址
   * 5. ts类型推断增强，更好的类型提示
   * @param config  配置
   */
  constructor(config: InstanceRequestConfig<D, R>) {
    this.config = config;
    this.instance = axios.create(config);
    this.registerInterceptors();
    config.generateRequestKey && (this.generateRequestKey = config.generateRequestKey);
  }
  /**
   * 创建请求创建唯一标识，重复请求用此作区分, 默认基于url、method、参数生成
   * 在实例设置时
   * @param requestConfig
   * @returns
   */
  private generateRequestKey({ method = '', url = '', params = '', data = '' }: RequestConfig) {
    return JSON.stringify({
      method,
      url,
      params,
      data
    });
  }
  /**
   * 注册拦截器
   *  拦截器执行顺序采用[洋葱模型],执行顺序： 实例 -> 类 -> 类 -> 实例
   */
  private registerInterceptors() {
    const classInterceptors = Request.interceptors;
    const instanceInterceptors = this.config.interceptors;
    // 全局前置拦截器
    this.instance.interceptors.request.use(
      classInterceptors?.requestInterceptor,
      classInterceptors?.requestInterceptorCatch,
      instanceInterceptors?.requestInterceptorOption
    );
    // 实例前置拦截器
    this.instance.interceptors.request.use(
      instanceInterceptors?.requestInterceptor,
      instanceInterceptors?.requestInterceptorCatch,
      instanceInterceptors?.requestInterceptorOption
    );
    // 全局后置拦截器
    this.instance.interceptors.response.use(
      classInterceptors?.responseInterceptor,
      classInterceptors?.responseInterceptorCatch,
      classInterceptors?.responseInterceptorOption
    );
    // 实例后置拦截器
    this.instance.interceptors.response.use(
      instanceInterceptors?.responseInterceptor,
      instanceInterceptors?.responseInterceptorCatch,
      instanceInterceptors?.responseInterceptorOption
    );
  }
  /**
   * 获取axios实例
   * @returns
   */
  getInstance() {
    return this.instance;
  }
  /**
   * 设置全局类拦截器
   * @param interceptors
   */
  static setInterceptors<DATA = any, RES = any>(interceptors: RequestInterceptors<DATA, RES>) {
    Request.interceptors = interceptors;
  }
  /**
   * 获取配置的拦截器，包含全局和实例
   */
  getInterceptors() {
    return {
      class: Request.interceptors,
      instance: this.config.interceptors
    };
  }
  /**
   * 移除拦截器
   * @param interceptorId
   */
  removeInterceptors(interceptorId: number) {
    this.instance.interceptors.request.eject(interceptorId);
  }
  /**
   * 清除拦截器
   * @param type
   */
  clearInterceptors(type: 'request' | 'response' | 'all' = 'all') {
    if (type === 'request') {
      this.instance.interceptors.request.clear();
    } else if (type === 'response') {
      this.instance.interceptors.response.clear();
    } else {
      this.instance.interceptors.request.clear();
      this.instance.interceptors.response.clear();
    }
  }
  /**
   * 用来改变request默认的header配置，不要在拦截器中使用
   * @param {*} headers
   * @returns
   */
  setHeader(headers: Partial<AxiosRequestHeaders>) {
    this.instance?.defaults?.headers && Object.assign(this.instance.defaults.headers, headers);
  }
  private _generUniqueRequestKey(config: RequestConfig) {
    if (config.requestUniqueKey) {
      return config.requestUniqueKey;
    }
    return this.generateRequestKey(config);
  }
  /**
   * 添加请求到列表
   * @param config
   * @param controller
   */
  private _addPendingRequest(config: RequestConfig, controller: AbortController) {
    const key = this._generUniqueRequestKey(config);
    this.pendingRequests.has(key)
      ? controller.abort('请求被取消,config:' + config)
      : this.pendingRequests.set(key, controller);
  }
  /**
   * 从列表中移除请求
   * @param config
   */
  private _removePendingRequest(config: RequestConfig) {
    const key = this._generUniqueRequestKey(config);
    setTimeout(() => this.pendingRequests.delete(key), 0);
  }
  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    this.pendingRequests.forEach((item) => item.abort());
  }
  /**
   * 取消请求
   * @param config
   * @returns
   */
  cancelRequest(config: RequestConfig) {
    const key = this._generUniqueRequestKey(config);
    const controller = this.pendingRequests.get(key);
    return controller?.abort();
  }
  /**
   * 请求
   * @param config
   * @returns
   */
  request<RES = R, DATA = D>(config: RequestConfig<DATA>) {
    // 如果开启了取消重复请求
    if (this.config.cancelDuplicateRequest || config.cancelDuplicateRequest) {
      const controller = new AbortController();
      config.signal = controller.signal;
      this._addPendingRequest(config, controller);
      const cancelPendingTime = this.config.cancelPendingTime || config.cancelPendingTime;
      cancelPendingTime && setTimeout(() => this._removePendingRequest(config), cancelPendingTime);
      return this.instance.request<RES, RES extends R ? R : RES, DATA>(config).finally(() => {
        this._removePendingRequest(config);
      });
    }
    return this.instance.request<RES, RES extends R ? R : RES, DATA>(config);
  }
  /**
   * get
   * @param url
   * @param params
   * @param config
   * @returns
   */
  get<RES = R, DATA = D>(url: string, params: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'get',
      url,
      params,
      ...config
    });
  }
  /**
   * post
   * @param url
   * @param data
   * @param config
   * @returns
   */
  post<RES = R, DATA = D>(url: string, data: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'post',
      url,
      data,
      ...config
    });
  }
  /**
   * put
   * @param url
   * @param data
   * @param config
   * @returns
   */
  put<RES = R, DATA = D>(url: string, data: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'put',
      url,
      data,
      ...config
    });
  }
  /**
   * patch
   * @param url
   * @param data
   * @param config
   * @returns
   */
  patch<RES = R, DATA = D>(url: string, data: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'patch',
      url,
      data,
      ...config
    });
  }
  /**
   * delete
   * @param url
   * @param data
   * @param config
   * @returns
   */
  delete<RES = R, DATA = D>(url: string, data: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'delete',
      url,
      data,
      ...config
    });
  }
}
export default Request;
