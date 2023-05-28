# @bwrong/request

![npm](https://img.shields.io/npm/dt/@bwrong/request) ![npm](https://img.shields.io/npm/v/@bwrong/request)

基于 axios 二次封装的请求库。

1. 多实例，在存在多个请求服务时使用
2. 拦截器增强，支持全局拦截器和实例拦截器，执行顺序采用洋葱模型
3. 支持重复请求取消功能，重复请求：url、method、参数均一致为重复，也可以自己传入判断函数
4. 支持直接请求绝对地址
5. ts 类型推断增强，更好的类型提示

## 安装

```shell
npm install @bwrong/request
// 或
yarn add @bwrong/request
// 或
pnpm install @bwrong/request
```

## 基本使用

```javascript
// 全局响应类型声明
export type ResponseType = {
  code: number;
  msg: string;
  data: {
    current: number;
    list: any[];
    size: number;
    total: number;
  };
  [key: string]: any;
};
const request = new Request<ResponseType>({
  baseURL:'/api',
  timeout: 10 * 1000,
  interceptors,
  transforms,
   // 是否取消重复请求
  cancelDuplicateRequest: false,
  // 拦截器设置
  interceptors: {
    requestInterceptor(config) {
      return config;
    },
    responseInterceptor({ data, config }) {
      return Promise.resolve(data);
    },
    responseInterceptorCatch(error) {
      return Promise.reject(error);
    }
  }
  // 更多axios支持的配置
});
export const get = request.get.bind(request);
export const post = request.post.bind(request);
export const put = request.put.bind(request);
export const patch = request.patch.bind(request);
export const del = request.delete.bind(request);
```

## 类型说明

```ts
// 拦截器
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
// 请求配置
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
```
## 方法
- `static setInterceptors<DATA = any, RES = any>(interceptors: RequestInterceptors<DATA, RES>)`
静态方法，设置全局拦截器

- `new Request(config: InstanceRequestConfig<D, R>)`
实例化

- `getInstance()`
获取axios实例

- `getInterceptors()`
获取配置的拦截器，包含全局和实例

- `removeInterceptors(interceptorId: number)`
移除拦截器

- `clearInterceptors(type: 'request' | 'response' | 'all' = 'all')`
清除拦截器

- `setHeader(headers: Partial<AxiosRequestHeaders>)`
用来改变request默认的header配置，不要在拦截器中使用

- `cancelAllRequest()`
取消全部请求

- `cancelRequest(config: RequestConfig)`
取消特定请求

- `request<RES = R, DATA = D>(config: RequestConfig<DATA>)`
请求

- `get<RES = R, DATA = D>(url: string, params: any = {}, config: RequestConfig<DATA> = {})`
- `post<RES = R, DATA = D>(url: string, params: any = {}, config: RequestConfig<DATA> = {})`
- `put<RES = R, DATA = D>(url: string, params: any = {}, config: RequestConfig<DATA> = {})`
- `patch<RES = R, DATA = D>(url: string, params: any = {}, config: RequestConfig<DATA> = {})`
- `delete<RES = R, DATA = D>(url: string, params: any = {}, config: RequestConfig<DATA> = {})`
一些快捷方法
