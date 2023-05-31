/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-12-10 11:04:57
 * @LastEditors: Bwrong
 * @LastEditTime: 2023-05-31 23:14:41
 */
import type { Plugin } from 'vue';
import { createComponent, createDirective } from './plugin';
import { setPermissionsData, storage } from './storage';
import { setPermissionKeys } from './permissions';
export { convertArrayToTree, convertTreeToArray, getParentsFromArray } from './util';
export { getPermissionKeys, setPermissionKeys, addPermissionKeys, removePermissionKeys, hasPermission } from './permissions';
export { getPermissionsData, getPermissionsTree, storage } from './storage';

export { default as initAuth } from './initAuth';

export const clearAuth = () => {
  storage.clear();
  setPermissionKeys([]);
  setPermissionsData([]);
};
// 注册权限指令、组件
export const authPlugin: Plugin = {
  install(app) {
    createDirective(app);
    createComponent(app);
  },
};
