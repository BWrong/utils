# @bwrong/storage
![npm](https://img.shields.io/npm/dt/@bwrong/storage) ![npm](https://img.shields.io/npm/v/@bwrong/storage)

为了解决本地缓存（localStorage或sessionStorage）的一些痛点,进行二次封装。

- 可设置驱动，支持localStorage和sessionStorage。
- 支持设置前缀，避免冲突
- value值支持多种格式，不必要求为string
- 支持加密存储，可自定义加密算法
- 支持class集成扩展功能

## 安装

```shell
npm install @bwrong/storage
// 或
yarn add @bwrong/storage
// 或
pnpm install @bwrong/storage
```

## 基本使用
为了方便使用，默认提供了一个全局实例，如果不满足，可以自行初始化Storage实例。

1. 使用默认全局实例。
```js
import { setStorageConfig,setStorage, getStorage, removeStorage, clearStorage } from '@bwrong/storage';
setStorageConfig({
  driver: localStorage;
  // ...
});
setStorage(key, value, { expire: 10 }); //设置缓存
getStorage(key); //获取缓存
removeStorage(key1，key2); //移除特定标识缓存
clearStorage(); //清除所有缓存
```
2. 自己实例化
```ts
import UStorage from '@bwrong/storage';
// import Utf8 from 'crypto-js/enc-utf8';
// import Base64 from 'crypto-js/enc-base64';

const storage = new UStorage({
  driver: localStorage,
  prefix: ''
  // 需要加密的时候可以使用
  // encryptFn(val) {
  //   return Base64.stringify(Utf8.parse(val));
  // },
  // decryptFn(val) {
  //   return Base64.parse(val).toString(Utf8);
  // }
});
export const getStorage = storage.get.bind(storage);
export const setStorage = storage.set.bind(storage);
export const removeStorage = storage.remove.bind(storage);
export const clearStorage = storage.clear.bind(storage);

```
## 配置

- `driver?: Storage`

驱动：localStorage、sessionStorage，默认使用 localStorage

- `prefix?: string`

名称前缀，方便区分

- `encryptFn?: StorageCryptFn`

加密，配合解密decryptFn使用，需要保证使用一致算法加解密

- `decryptFn?: StorageCryptFn`

解密，配合加密encryptFn使用，需要保证使用一致算法加解密

## 方法

- `new Storage(option: StorageOption)`
实例化新的实例
- `config(option: StorageOption)`
配置，也可以在实例化时传入
```ts
export interface StorageOption {
  /** 驱动：localStorage、sessionStorage，默认使用 localStorage*/
  driver?: Storage;
  /** 名称前缀，方便区分 */
  prefix?: string;
  /** 加密，配合解密decryptFn使用，需要保证使用统一算法加解密 */
  encryptFn?: StorageCryptFn;
  /** 解密，配合加密encryptFn使用，需要保证使用统一算法加解密 */
  decryptFn?: StorageCryptFn;
}
```

- `set(key: string, data: any, config?: StorageConfig)`
设置缓存
```ts
export interface StorageConfig {
  //过期时间 单位秒
  expire?: number;
}
```

- `get<T = any>(key: string)`
获取缓存

- `remove(...keys: string[])`
移除缓存

- `clear`
清除缓存
