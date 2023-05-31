/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-12-10 11:04:57
 * @LastEditors: Bwrong
 * @LastEditTime: 2023-05-31 15:07:32
 */
import type { Plugin } from 'vue';
import { createComponent, createDirective } from './plugin';
import { storage } from './storage';
export { convertArrayToTree, convertTreeToArray, getParentsFromArray } from './util';
export { getPermissionKeys, setPermissionKeys, addPermissionKeys, removePermissionKeys, hasPermission } from './permissions';
export { getPermissionsData, getPermissionsTree, storage } from './storage';

export { default as ganerAuthData } from './ganerAuthData';

export const clearAuth = () => {
  storage.clear();
};
// 注册权限指令、组件
export const authPlugin: Plugin = {
  install(app) {
    createDirective(app);
    createComponent(app);
  },
};
