/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-07-03 15:57:14
 * @LastEditors: Bwrong
 * @LastEditTime: 2024-02-05 17:25:11
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
 * 清洗路由，获取具有权限的路由
 * @param {*} routes 前端路由映射表
 * @param {*} permissionMap 权限标识表，map
 * @param {*} checkAuth 权限检查方法
 * @param {*} mergeMeta meta数据合并策略
 */
function _getAuthRoutes(routes: Route[] = [], permissionMap: Record<string, any> = {}, prefix = '', checkAuth = _checkAuth, mergeMeta = _mergeMeta) {
  return routes.filter(item => {
    // 防止影响原数据
    let route = { ...item };
    if (checkAuth(route, permissionMap)) {
      if (route.meta?.permission) {
        // 处理嵌套路由写法
        route.path = route.path.match(/^\/.+/) ? route.path : `${prefix}/${route.path}`;
        // 将路由存入routeMap, 方便_addUrlToPermissions查找路由
        cacheRouteMap[route.meta.permission] = route;
        route.meta = mergeMeta(route.meta, permissionMap[route.meta.permission]) as Route['meta'];
      }
      if (route.children) {
        route.redirect = route.redirect || route.children?.[0]?.redirect || route.path;
        route.children = _getAuthRoutes(route.children, permissionMap, route.path);
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

export default ({ routes = [], permissions = [], authKey = 'permission', checkAuth, mergeMeta }: InitAuthOptins): AuthData => {
  // 校验参数
  _checkParamIsArray(routes, 'routes');
  _checkParamIsArray(permissions, 'permissions');
  // 权限映射表
  const permissionMap = _permissionToMap(permissions, authKey);
  setPermissionKeys(Object.keys(permissionMap));
  // 清洗后，有权限额路由，用于动态注册路由
  const authRoutes = _getAuthRoutes(routes, permissionMap, '', checkAuth, mergeMeta);
  // 添加了path/url的菜单，用于渲染导航
  const permissionsWithUrl = _addUrlToPermissions(cacheRouteMap, permissions, authKey);
  setPermissionsData(permissionsWithUrl);
  return {
    routes: authRoutes,
    permissionsData: permissionsWithUrl,
  };
};
