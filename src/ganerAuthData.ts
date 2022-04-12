/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-07-03 15:57:14
 * @LastEditors: Bwrong
 * @LastEditTime: 2022-04-12 14:32:07
 */
import {RouteRecordRaw} from 'vue-router';
type CheckAuth = (route: Route, authMap: Record<string, any>) => boolean;
type MergeMeta = (routeMeta: object, authMeta: Record<string, any>) => object;

interface RouteMeta {
  permission?: string;
  [key:string]:any
}
type Route = RouteRecordRaw & {
  meta?: RouteMeta | undefined,
  children?: Route[]
}

export interface GanerAuthDataOptins {
  routes: Route[];
  permissions: object[];
  authKey?: string;
  checkAuth?: CheckAuth;
  mergeMeta?: MergeMeta;
  prefix?: string
}

export interface AuthData {
  authMap: object;
  routes: Route[];
  menus: object[];
}
/**
 * 创建权限映射表
 * @param {*} permissions  权限映射表
 * @param {*} authKey  权限集权限标识key名
 */
function _ganAuthMap(permissions: any[] = [], authKey = defaultAuthKey) {
  return permissions.reduce((temp, item) => ((temp[item[authKey]] = item), temp), {});
}
/**
 * 清洗方法，权限标识不存在或者存在且匹配，则返回true
 * @param {*} route 检测的路由对象
 * @param {*} authMap 权限标识表, object, key为的值（配置的authKey的值）
 */
 const _checkAuth: CheckAuth = (route, authMap) => (route.meta?.permission ? !!authMap[route.meta.permission] : true);

 /**
  * route.meta数据合并策略
  * @param {*} routeMeta 路由meta数据
  * @param {*} authMeta 路由对应权限菜单数据
  */
 const _mergeMeta: MergeMeta = (routeMeta, authMeta) => Object.assign(routeMeta, authMeta);
/**
 * 清洗路由，获取具有权限的路由
 * @param {*} routes 前端路由映射表
 * @param {*} authMap 权限标识表，map
 * @param {*} checkAuth 权限检查方法
 * @param {*} mergeMeta meta数据合并策略
 */
function _getAuthRoutes(
  routes: Route[] = [],
  authMap: Record<string, any> = {},
  prefix = '',
  checkAuth = _checkAuth,
  mergeMeta = _mergeMeta
) {
  return routes.filter((route) => {
    if (checkAuth(route, authMap)) {
      if (route.meta?.permission) {
        // 处理嵌套路由写法
        route.path = route.path.match(/^\/.+/) ? route.path : `${prefix}/${route.path}`;
        // 将路由存入routeMap, 方便_addPathOfMenus查找路由
        routeMap[route.meta.permission] = route;
        route.meta = mergeMeta(route.meta, authMap[route.meta.permission]) as Route['meta'];
      }
      route.children && (route.children = _getAuthRoutes(route.children, authMap, route.path));
      return true;
    }
    return false;
  });
}
/**
 * 为菜单添加path
 * @param {*} routesMap  路由映射map
 * @param {*} menus  菜单数据
 * @param {*} authKey 权限集权限标识key名
 */
function _addPathOfMenus(
  routeMap: Record<string, Route> = {},
  menus: Record<string, any>[] = [],
  authKey = defaultAuthKey
) {
  return menus.map((item) => {
    item.url = item.url || (item[authKey] && routeMap[item[authKey]]?.path) || '';
    if (item.children?.length) {
      item.children = _addPathOfMenus(routeMap, menus, authKey);
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
  return (
    Array.isArray(param) ||
    (console.error(`@bwrong/auth-tool/ganerAuthData: ${key}参数传入数据类型不正确，请传入Array数据类型`), false)
  );
}

let routeMap: Record<string, any> = {}; // 路由映射表
const defaultAuthKey = 'permission';
export default ({
  routes = [],
  permissions = [],
  authKey = defaultAuthKey,
  checkAuth = _checkAuth,
  mergeMeta = _mergeMeta,
  prefix=''
}: GanerAuthDataOptins): AuthData => {
  // 校验参数
  _checkParamIsArray(routes, 'routes');
  _checkParamIsArray(permissions, 'permissions');
  // 权限映射表
  const authMap = _ganAuthMap(permissions, authKey);
  // 清洗后，有权限额路由，用于动态注册路由
  const authRoutes = _getAuthRoutes(routes, authMap,prefix, checkAuth, mergeMeta);
  // 添加了path/url的菜单，用于渲染导航
  const menusWithPath = _addPathOfMenus(routeMap, permissions, authKey);
  return {
    authMap,
    routes: authRoutes,
    menus: menusWithPath
  };
};
