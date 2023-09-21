import { storage } from './storage';
const storageKey = 'permissionKeys';
let cachePermissionKeys: string[] = storage.get(storageKey) || [];

/**
 * 获取权限集
 */
export const getPermissionKeys = () => cachePermissionKeys || [];
/**
 * 设置权限集
 * @param permissionKeys
 */
export const setPermissionKeys = (permissionKeys: string[]) => {
  storage.set(storageKey, permissionKeys);
  cachePermissionKeys = permissionKeys;
  return cachePermissionKeys;
};
/**
 * 添加权限
 * @param kys
 */
export const addPermissionKeys = (keys: string[]) => {
  let permissionKeys = getPermissionKeys();
  permissionKeys = Array.from(new Set([...permissionKeys, ...keys]));
  return setPermissionKeys(permissionKeys);
};
/**
 * 删除权限
 * @param keys
 */
export const removePermissionKeys = (keys: string[]) => {
  let permissionKeys = getPermissionKeys();
  permissionKeys = permissionKeys.filter(item => !keys.includes(item));
  return setPermissionKeys(permissionKeys);
};
/**
 * 判断权限集
 * @param permission 需要判断的权限
 * @param model 判断模式
 */
export const hasPermission = (permission: string | string[], model: typeof permission extends string ? never : 'every' | 'some' = 'every') => {
  const permissionKeys = getPermissionKeys();
  if (!permission.length) return false;
  if (Array.isArray(permission)) {
    return model === 'some' ? permission.some(item => permissionKeys.includes(item)) : permission.every(item => permissionKeys.includes(item));
  }
  return permissionKeys.includes(permission);
};
