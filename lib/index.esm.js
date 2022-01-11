/* libName: authTool version: 1.3.2 author: bwrong<ibwrong@foxmail.com> */
/**
 * 注册权限指令
 * @param {*} directiveName  指令名字
 * @param {*} hasAuth  检查函数
 */
var authDirective$1 = {
    install: function (Vue, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.directiveName, directiveName = _c === void 0 ? 'auth' : _c, _d = _b.hasAuth, hasAuth = _d === void 0 ? function (value) { return true; } : _d;
        if (isVue3(Vue)) {
            Vue.directive(directiveName, {
                mounted: function (el, binding) {
                    var _a;
                    !hasAuth(binding.value) && ((_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el));
                }
            });
            return;
        }
        Vue.directive(directiveName, {
            inserted: function (el, binding) {
                var _a;
                !hasAuth(binding.value) && ((_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el));
            }
        });
    }
};
function isVue3(app) {
    return !!app.version.match(/^3/);
}

/**
 * 创建权限映射表
 * @param {*} permissions  权限映射表
 * @param {*} authKey  权限集权限标识key名
 */
function _ganAuthMap(permissions, authKey) {
    if (permissions === void 0) { permissions = []; }
    if (authKey === void 0) { authKey = defaultAuthKey; }
    return permissions.reduce(function (temp, item) { return ((temp[item[authKey]] = item), temp); }, {});
}
/**
 * 清洗方法，权限标识不存在或者存在且匹配，则返回true
 * @param {*} route 检测的路由对象
 * @param {*} authMap 权限标识表, object, key为的值（配置的authKey的值）
 */
var _checkAuth = function (route, authMap) { var _a; return (((_a = route.meta) === null || _a === void 0 ? void 0 : _a.permission) ? !!authMap[route.meta.permission] : true); };
/**
 * route.meta数据合并策略
 * @param {*} routeMeta 路由meta数据
 * @param {*} authMeta 路由对应权限菜单数据
 */
var _mergeMeta = function (routeMeta, authMeta) { return Object.assign(routeMeta, authMeta); };
/**
 * 清洗路由，获取具有权限的路由
 * @param {*} routes 前端路由映射表
 * @param {*} authMap 权限标识表，map
 * @param {*} checkAuth 权限检查方法
 * @param {*} mergeMeta meta数据合并策略
 */
function _getAuthRoutes(routes, authMap, prefix, checkAuth, mergeMeta) {
    if (routes === void 0) { routes = []; }
    if (authMap === void 0) { authMap = {}; }
    if (prefix === void 0) { prefix = ''; }
    if (checkAuth === void 0) { checkAuth = _checkAuth; }
    if (mergeMeta === void 0) { mergeMeta = _mergeMeta; }
    return routes.filter(function (route) {
        var _a;
        if (checkAuth(route, authMap)) {
            if ((_a = route.meta) === null || _a === void 0 ? void 0 : _a.permission) {
                // 处理嵌套路由写法
                route.path = route.path.match(/^\/.+/) ? route.path : "".concat(prefix, "/").concat(route.path);
                // 将路由存入routeMap, 方便_addPathOfMenus查找路由
                routeMap[route.meta.permission] = route;
                route.meta = mergeMeta(route.meta, authMap[route.meta.permission]);
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
function _addPathOfMenus(routeMap, menus, authKey) {
    if (routeMap === void 0) { routeMap = {}; }
    if (menus === void 0) { menus = []; }
    if (authKey === void 0) { authKey = defaultAuthKey; }
    return menus.map(function (item) {
        var _a, _b;
        item.url = item.url || (item[authKey] && ((_a = routeMap[item[authKey]]) === null || _a === void 0 ? void 0 : _a.path)) || '';
        if ((_b = item.children) === null || _b === void 0 ? void 0 : _b.length) {
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
function _checkParamIsArray(param, key) {
    return (Array.isArray(param) ||
        (console.error("@bwrong/auth-tool/ganerAuthData: ".concat(key, "\u53C2\u6570\u4F20\u5165\u6570\u636E\u7C7B\u578B\u4E0D\u6B63\u786E\uFF0C\u8BF7\u4F20\u5165Array\u6570\u636E\u7C7B\u578B")), false));
}
var routeMap = {}; // 路由映射表
var defaultAuthKey = 'permission';
var ganerAuthDataSrc = (function (_a) {
    var _b = _a.routes, routes = _b === void 0 ? [] : _b, _c = _a.permissions, permissions = _c === void 0 ? [] : _c, _d = _a.authKey, authKey = _d === void 0 ? defaultAuthKey : _d, _e = _a.checkAuth, checkAuth = _e === void 0 ? _checkAuth : _e, _f = _a.mergeMeta, mergeMeta = _f === void 0 ? _mergeMeta : _f, _g = _a.prefix, prefix = _g === void 0 ? '' : _g;
    // 校验参数
    _checkParamIsArray(routes, 'routes');
    _checkParamIsArray(permissions, 'permissions');
    // 权限映射表
    var authMap = _ganAuthMap(permissions, authKey);
    // 清洗后，有权限额路由，用于动态注册路由
    var authRoutes = _getAuthRoutes(routes, authMap, prefix, checkAuth, mergeMeta);
    // 添加了path/url的菜单，用于渲染导航
    var menusWithPath = _addPathOfMenus(routeMap, permissions, authKey);
    return {
        authMap: authMap,
        routes: authRoutes,
        menus: menusWithPath
    };
});

/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-12-10 11:04:57
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-05-31 16:22:19
 */
// export const util = utils;
var ganerAuthData = ganerAuthDataSrc;
var authDirective = authDirective$1;

export { authDirective, ganerAuthData };
