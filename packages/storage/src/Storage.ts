export type StorageCryptFn = (val: string) => string;
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
export interface StorageConfig {
  //过期时间 单位秒
  expire?: number;
}
export interface StorageData<T = unknown> {
  data: T;
  expire?: number;
}
/**
 * 封装Store，支持存储对象和过期时间
 */
export default class UStorage {
  private driver: Storage;
  private prefix: string;
  private encryptFn: StorageCryptFn = (val) => val;
  private decryptFn: StorageCryptFn = (val) => val;
  constructor(option: StorageOption) {
    this.driver = option.driver || window.localStorage;
    this.prefix = option.prefix || '';
    this.encryptFn = option.encryptFn || this.encryptFn;
    this.decryptFn = option.decryptFn || this.decryptFn;
  }
  /**
   * 配置
   * @param option
   * @returns
   */
  config(option: StorageOption) {
    this.driver = option.driver || this.driver;
    this.prefix = option.prefix || this.prefix;
    this.encryptFn = option.encryptFn || this.encryptFn;
    this.decryptFn = option.decryptFn || this.decryptFn;
    return this;
  }
  /**
   * 设置缓存
   * @param key
   * @param data
   * @param config
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(key: string, data: any, config?: StorageConfig) {
    key = this.getKey(key);
    const time = new Date().getTime();
    const value = {
      expire: config?.expire ? time + config.expire * 1000 : undefined,
      data
    } as StorageData;
    let setValue = JSON.stringify(value);
    setValue = this.encryptFn(setValue);
    this.driver.setItem(key, setValue);
  }
  /**
   * 获取缓存
   * @param key
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T = any>(key: string) {
    key = this.getKey(key);
    let value = this.driver.getItem(key) || '';
    if (value) {
      value = this.decryptFn(value);
      const storageData = JSON.parse(value) as StorageData<T>;
      const time = new Date().getTime();
      if (storageData.expire && time > storageData.expire) {
        this.remove(key);
        return null;
      } else {
        return storageData.data;
      }
    }
    return null;
  }
  /**
   * 移除缓存
   * @param keys
   */
  remove(...keys: string[]) {
    keys.forEach((item) => this.driver.removeItem(this.getKey(item)));
  }
  /**
   * 清除缓存
   * @param excludeKeys
   */
  clear(excludeKeys?: string[]) {
    if (excludeKeys?.length) {
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          excludeKeys.includes(key) || this.driver.removeItem(key);
        }
      }
    } else {
      this.driver.clear();
    }
  }
  private getKey(key: string) {
    return this.prefix + key;
  }
}
