/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-07-03 15:57:14
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-03-05 16:43:05
 */
let routeMap = {}; // 路由映射表
const defaultAuthKey = 'permission';
export default ({ routes = [], permissions = [], authKey = defaultAuthKey, checkAuth = _checkAuth, mergeMeta = _mergeMeta }) => {
  // 校验参数
  _checkParamIsArray(routes, 'routes');
  _checkParamIsArray(permissions, 'permissions');
  // 权限映射表
  const authMap = _ganAuthMap(permissions, authKey);
  // 清洗后，有权限额路由，用于动态注册路由
  const authRoutes = _getAuthRoutes(routes, authMap, checkAuth, mergeMeta);
  // 添加了path/url的菜单，用于渲染导航
  const menusWithPath = _addPathOfMenus(routeMap, permissions, authKey);
  return {
    authMap,
    routes: authRoutes,
    menus: menusWithPath
  };
};
/**
 * 创建权限映射表
 * @param {*} permissions  权限映射表
 * @param {*} authKey  权限集权限标识key名
 */
function _ganAuthMap(permissions = [], authKey = defaultAuthKey) {
  // TODO:支持嵌套结构
  return permissions.reduce((temp, item) => ((temp[item[authKey]] = item), temp), {});
}
/**
 * 清洗路由，获取具有权限的路由
 * @param {*} routes 前端路由映射表
 * @param {*} authMap 权限标识表，map
 * @param {*} checkAuth 权限检查方法
 * @param {*} mergeMeta meta数据合并策略
 */
function _getAuthRoutes(routes = [], authMap = {}, checkAuth = _checkAuth, mergeMeta = _mergeMeta) {
  return routes.filter((route) => {
    if (checkAuth(route, authMap)) {
      if (route.meta?.permission) {
        // 将路由存入routeMap, 方便_addPathOfMenus查找路由
        routeMap[route.meta.permission] = route;
        route.meta = mergeMeta(route.meta, authMap[route.meta.permission]);
      }
      route.children && (route.children = _getAuthRoutes(route.children, authMap));
      return true;
    }
    return false;
  });
}
/**
 * 为菜单添加path
 * TODO: 增加对相对路径的支持
 * @param {*} routesMap  路由映射map
 * @param {*} menus  菜单数据
 * @param {*} authKey 权限集权限标识key名
 */
function _addPathOfMenus(routeMap = {}, menus = [], authKey = defaultAuthKey) {
  return menus.map((item) => {
    item.url = item.path = (item[authKey] && routeMap[item[authKey]]?.path) || '';
    if (item.children?.length) {
      item.children = _addPathOfMenus(routeMap, menus, authKey);
    }
    return item;
  });
}
/**
 * 清洗方法，权限标识不存在或者存在且匹配，则返回true
 * @param {*} route 检测的路由对象
 * @param {*} authMap 权限标识表, object, key为的值（配置的authKey的值）
 */
function _checkAuth(route, authMap) {
  return route.meta?.permission ? !!authMap[route.meta.permission] : true;
}
/**
 * route.meta数据合并策略
 * @param {*} routeMeta 路由meta数据
 * @param {*} authMeta 路由对应权限菜单数据
 */
function _mergeMeta(routeMeta, authMeta) {
  return Object.assign(routeMeta, authMeta);
}
/**
 * 校验参数是否为数组
 * @param {*} param
 * @param {*} key
 */
function _checkParamIsArray(param, key) {
  return Array.isArray(param) || (console.error(`@bwrong/auth-tool/ganerAuthData: ${key}参数传入数据类型不正确，请传入Array数据类型`), false);
}
