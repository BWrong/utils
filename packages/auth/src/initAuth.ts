/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-07-03 15:57:14
 * @LastEditors: Bwrong
 * @LastEditTime: 2024-02-06 10:46:24
 */
import type { RouteRecordRaw } from 'vue-router';
import { setPermissionKeys } from './permissions';
import { setPermissionsData } from './storage';
const pkgName = '@BWrong/auth';
interface RouteMeta {
  permission?: string;
  [key: string]: any;
}
type Route = RouteRecordRaw & {
  meta?: RouteMeta | undefined;
  children?: Route[];
};

type CheckAuth = (route: Route, permissionMap: Record<string, any>) => boolean;
type MergeMeta = (routeMeta: object, authMeta: Record<string, any>) => object;
export interface InitAuthOptins {
  routes: Route[];
  permissions: object[];
  authKey?: string;
  checkAuth?: CheckAuth;
  mergeMeta?: MergeMeta;
  getRedirectUrl?: (routes: Route[], permissionMap: Record<string, any>) => string;
  prefix?: string;
}

export interface AuthData {
  routes: Route[];
  permissionsData: object[];
}

// eslint-disable-next-line prefer-const
let cacheRouteMap: Record<string, any> = {}; // 路由映射表
/**
 * 创建权限映射表
 * @param {*} permissions  权限映射表
 * @param {*} authKey  权限集权限标识key名
 */
function _permissionToMap(permissions: any[] = [], authKey: string) {
  return permissions.reduce((temp, item) => ((temp[item[authKey]] = item), temp), {});
}
/**
 * 清洗方法，权限标识不存在或者存在且匹配，则返回true
 * @param {*} route 检测的路由对象
 * @param {*} permissionMap 权限标识表, object, key配置的authKey的值
 */
const _checkAuth: CheckAuth = (route, permissionMap) => (route.meta?.permission ? !!permissionMap[route.meta.permission] : true);

/**
 * route.meta数据合并策略
 * @param {*} routeMeta 路由meta数据
 * @param {*} authMeta 路由对应权限菜单数据
 */
const _mergeMeta: MergeMeta = (routeMeta, authMeta) => Object.assign(routeMeta, authMeta);

/**
 * 获取路由重定向地址
 * @param {*} routes 路由对象
 * @param {*} permissionMap 权限标识表
 * @returns 路由重定向地址
 */
function _getRedirectUrl(routes: any, permissionMap: any) {
  let url = '';

  for (const item of routes) {
    if (item.children?.length) {
      url = _getRedirectUrl(item.children, permissionMap);
      break;
    } else {
      url = item.path || item.url;
      break;
    }
  }
  return url;
}
/**
 * 清洗路由，获取具有权限的路由
 * @param {*} routes 前端路由映射表
 * @param {*} permissionMap 权限标识表，map
 * @param {*} checkAuth 权限检查方法
 * @param {*} mergeMeta meta数据合并策略
 */
function _getAuthRoutes(routes: Route[] = [], permissionMap: Record<string, any> = {}, prefix = '', checkAuth = _checkAuth, mergeMeta = _mergeMeta, getRedirectUrl = _getRedirectUrl) {
  return routes.filter(route => {
    if (checkAuth(route, permissionMap)) {
      // 处理嵌套路由写法
      route.path = route.path.startsWith('/') ? route.path : `${prefix}/${route.path}`;
      if (route.meta?.permission) {
        // 将路由存入routeMap, 方便_addUrlToPermissions查找路由
        cacheRouteMap[route.meta.permission] = route;
        route.meta = mergeMeta(route.meta, permissionMap[route.meta.permission]) as Route['meta'];
      }
      if (route.children) {
        route.children = _getAuthRoutes(route.children, permissionMap, route.path, checkAuth, mergeMeta, getRedirectUrl);
        route.redirect = route.redirect ?? getRedirectUrl(route.children, permissionMap);
      }
      return true;
    }
    return false;
  });
}
/**
 * 为菜单添加path
 * @param {*} routesMap  路由映射map
 * @param {*} permissions  菜单数据
 * @param {*} authKey 权限集权限标识key名
 */
function _addUrlToPermissions(routeMap: Record<string, Route> = {}, permissions: Record<string, any>[] = [], authKey: string) {
  return permissions.map(item => {
    // 如果有url，则使用，没有则取路由映射表的path
    item.url = item.url || (item[authKey] && routeMap[item[authKey]]?.path) || '';
    if (item.children?.length) {
      item.children = _addUrlToPermissions(routeMap, permissions, authKey);
    }
    return item;
  });
}

/**
 * 校验参数是否为数组
 * @param {*} param
 * @param {*} key
 */
function _checkParamIsArray(param: any, key: string) {
  return Array.isArray(param) || (console.error(`${pkgName}: ${key}参数传入数据类型不正确，请传入Array数据类型`), false);
}

export default ({ routes = [], permissions = [], authKey = 'permission', checkAuth, mergeMeta, getRedirectUrl }: InitAuthOptins): AuthData => {
  // 校验参数
  _checkParamIsArray(routes, 'routes');
  _checkParamIsArray(permissions, 'permissions');
  cacheRouteMap = {};
  // 权限映射表
  const permissionMap = _permissionToMap(permissions, authKey);
  console.log('permissionMap:', permissionMap);
  // 将权限标识key存入缓存
  setPermissionKeys(Object.keys(permissionMap));
  // 清洗后，有权限额路由，用于动态注册路由
  const authRoutes = _getAuthRoutes(routes, permissionMap, '', checkAuth, mergeMeta, getRedirectUrl);
  console.log('authRoutes:', authRoutes);

  // 添加了path/url的菜单，用于渲染导航
  const permissionsWithUrl = _addUrlToPermissions(cacheRouteMap, permissions, authKey);
  setPermissionsData(permissionsWithUrl);
  return {
    routes: authRoutes,
    permissionsData: permissionsWithUrl,
  };
};
