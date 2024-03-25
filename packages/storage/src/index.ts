import UStorage, { type StorageConfig, type StorageOption } from './Storage';

export default UStorage;

const globalStorage = new UStorage({ driver: window.localStorage });
// 设置全局缓存配置
export const setStorageConfig = (config:StorageOption) => {
  globalStorage.config(config);
};
// 设置缓存
export const setStorage = (key: string, data: any, config?: StorageConfig) => {
  globalStorage.set(key, data, config);
};
// 获取缓存
export const getStorage = <T = any>(key: string) => {
  return globalStorage.get<T>(key);
};
// 移除缓存
export const removeStorage = (...keys: string[]) => {
  return globalStorage.remove(...keys);
};
// 清楚缓存
export const clearStorage = (excludeKeys?: string[]) => {
  return globalStorage.clear(excludeKeys);
};
