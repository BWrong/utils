/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-12-10 11:04:57
 * @LastEditors: Bwrong
 * @LastEditTime: 2023-05-28 21:56:45
 */
export { authDirective } from './directive';
export { default as ganerAuthData } from './ganerAuthData';
import * as utils from './util';
export const util = utils;

// 1. 管理token，set，remove，has，isExpired
// 2. 处理权限ganerAuthData getMenuList getMenuTree getPermissions hasAccess setPermissions
// 支持多种模式，1. 动态路由：后端提供菜单，动态生成路由   2. 静态路由，菜单和路由均由前端提供
//
// 3. 注册权限指令、组件
