/* libName: authTool version: 1.2.4 author: bwrong<ibwrong@foxmail.com> */
/**
 * 注册权限指令
 * @param {*} directiveName  指令名字
 * @param {*} hasAuth  检查函数
 */
var authDirective = {
    install: function (Vue, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.directiveName, directiveName = _c === void 0 ? 'auth' : _c, _d = _b.hasAuth, hasAuth = _d === void 0 ? function (value) { return true; } : _d;
        if (isVue3(Vue)) {
            Vue.directive(directiveName, {
                mounted: function (el, binding) {
                    var _a;
                    !hasAuth(binding.value) && ((_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el));
                }
            });
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

/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-07-03 15:57:14
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-05-31 15:28:41
 */
var routeMap = {}; // 路由映射表
var defaultAuthKey = 'permission';
var ganerAuthDataSrc = (function (_a) {
    var _b = _a.routes, routes = _b === void 0 ? [] : _b, _c = _a.permissions, permissions = _c === void 0 ? [] : _c, _d = _a.authKey, authKey = _d === void 0 ? defaultAuthKey : _d, _e = _a.checkAuth, checkAuth = _e === void 0 ? _checkAuth : _e, _f = _a.mergeMeta, mergeMeta = _f === void 0 ? _mergeMeta : _f;
    // 校验参数
    _checkParamIsArray(routes, 'routes');
    _checkParamIsArray(permissions, 'permissions');
    // 权限映射表
    var authMap = _ganAuthMap(permissions, authKey);
    // 清洗后，有权限额路由，用于动态注册路由
    var authRoutes = _getAuthRoutes(routes, authMap, checkAuth, mergeMeta);
    // 添加了path/url的菜单，用于渲染导航
    var menusWithPath = _addPathOfMenus(routeMap, permissions, authKey);
    return {
        authMap: authMap,
        routes: authRoutes,
        menus: menusWithPath
    };
});
/**
 * 创建权限映射表
 * @param {*} permissions  权限映射表
 * @param {*} authKey  权限集权限标识key名
 */
function _ganAuthMap(permissions, authKey) {
    if (permissions === void 0) { permissions = []; }
    if (authKey === void 0) { authKey = defaultAuthKey; }
    // TODO:支持嵌套结构
    return permissions.reduce(function (temp, item) { return ((temp[item[authKey]] = item), temp); }, {});
}
/**
 * 清洗路由，获取具有权限的路由
 * @param {*} routes 前端路由映射表
 * @param {*} authMap 权限标识表，map
 * @param {*} checkAuth 权限检查方法
 * @param {*} mergeMeta meta数据合并策略
 */
function _getAuthRoutes(routes, authMap, checkAuth, mergeMeta) {
    if (routes === void 0) { routes = []; }
    if (authMap === void 0) { authMap = {}; }
    if (checkAuth === void 0) { checkAuth = _checkAuth; }
    if (mergeMeta === void 0) { mergeMeta = _mergeMeta; }
    return routes.filter(function (route) {
        var _a;
        if (checkAuth(route, authMap)) {
            if ((_a = route.meta) === null || _a === void 0 ? void 0 : _a.permission) {
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
function _addPathOfMenus(routeMap, menus, authKey) {
    if (routeMap === void 0) { routeMap = {}; }
    if (menus === void 0) { menus = []; }
    if (authKey === void 0) { authKey = defaultAuthKey; }
    return menus.map(function (item) {
        var _a, _b;
        item.url = item.path = (item[authKey] && ((_a = routeMap[item[authKey]]) === null || _a === void 0 ? void 0 : _a.path)) || '';
        if ((_b = item.children) === null || _b === void 0 ? void 0 : _b.length) {
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
    var _a;
    return ((_a = route.meta) === null || _a === void 0 ? void 0 : _a.permission) ? !!authMap[route.meta.permission] : true;
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
    return Array.isArray(param) || (console.error("@bwrong/auth-tool/ganerAuthData: " + key + "\u53C2\u6570\u4F20\u5165\u6570\u636E\u7C7B\u578B\u4E0D\u6B63\u786E\uFF0C\u8BF7\u4F20\u5165Array\u6570\u636E\u7C7B\u578B"), false);
}

/********** 工具函数 ************/
/**
 * 将一维数组格式转换成树结构
 * TODO: 考虑使用尾递归优化算法。
 * @param {*} data  需要转换的数据
 * @param {*} pid   顶级节点的id
 * @param {*} children   子集标识key
 * @param {*} pidName    父级标识key
 * @param {*} idName     id标识key
 */
function convertToTree(_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.pid, pid = _c === void 0 ? 0 : _c, _d = _a.children, children = _d === void 0 ? 'children' : _d, _e = _a.pidName, pidName = _e === void 0 ? 'parentId' : _e, _f = _a.idName, idName = _f === void 0 ? 'id' : _f;
    var arr = [];
    data.map(function (item) {
        if (item[pidName] === pid) {
            var child = item[children] || [];
            item[children] = child.concat(convertToTree({ data: data, pid: item[idName], children: children, pidName: pidName, idName: idName }));
            arr.push(item);
        }
    });
    return arr;
}
function getParentsFromArray(_a) {
    var id = _a.id, data = _a.data, _b = _a.idName, idName = _b === void 0 ? 'id' : _b, _c = _a.pidName, pidName = _c === void 0 ? 'parentId' : _c, _d = _a.result, result = _d === void 0 ? [] : _d;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        if (item[idName] === id) {
            result.unshift(item);
            getParentsFromArray({ id: item[pidName], data: data, idName: idName, pidName: pidName, result: result });
        }
    }
    return result;
}

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    convertToTree: convertToTree,
    getParentsFromArray: getParentsFromArray
});

/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-12-10 11:04:57
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-05-31 15:47:02
 */
var util = utils;
var ganerAuthData = ganerAuthDataSrc;
var authDirective$1 = authDirective;

export { authDirective$1 as authDirective, ganerAuthData, util };
