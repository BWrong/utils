/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-07-03 15:57:14
 * @LastEditors: Bwrong
 * @LastEditTime: 2020-12-16 08:55:47
 */
let routeMap = {}; // 路由映射表

export default ({ routes = [], permissions = [], authKey = 'permission' }) => {
  // 权限映射表
  const authMap = _ganAuthMap(permissions, authKey);
  // 清洗后，有权限额路由，用于动态注册路由
  const authRoutes = _getAuthRoutes(routes, authMap);
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
function _ganAuthMap(permissions, authKey) {
  return permissions.reduce((temp, item) => ((temp[item[authKey]] = item), temp), {});
}
/**
 * 清洗路由，获取具有权限的路由
 * @param {*} routes 前端路由映射表
 * @param {*} authMap 权限标识表，map
 */
function _getAuthRoutes(routes = [], authMap = {}) {
  return routes.filter((route) => {
    let newRoute = { ...route };
    if (_checkAuth(newRoute, authMap)) {
      if (route.meta?.permission) {
        // 将路由存入routeMap
        routeMap[route.meta.permission] = route;
        route.meta.auth = authMap[route.meta.permission];
      }
      newRoute.children && (newRoute.children = _getAuthRoutes(newRoute.children, authMap));
      return true;
    }
    return false;
  });
}
/**
 * 清洗方法，权限标识不存在或者存在且匹配返回true
 * @param {*} route 路由对象
 * @param {*} authMap 权限标识表，map
 */
function _checkAuth(route, authMap) {
  return route.meta?.permission ? !!authMap[route.meta.permission] : true;
}
/**
 * 为菜单添加path
 * TODO: 增加对相对路径的支持
 * @param {*} routesMap  路由映射map
 * @param {*} menus  菜单数据
 * @param {*} authKey 权限集权限标识key名
 */
function _addPathOfMenus(routeMap = {}, menus = [], authKey) {
  return menus.map((item) => {
    item.url = (item[authKey] && routeMap[item[authKey]]?.path) || '';
    if (item.children?.length) {
      item.children = this._addPathOfMenus(routeMap, menus, authKey);
    }
    return item;
  });
}
