/* libName: authTool version: 2.2.0 author: bwrong<ibwrong@foxmail.com> */
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

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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
    return routes.filter(function (item) {
        var _a;
        // 防止污染原路由数据
        var route = __assign({}, item);
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
var ganerAuthData = (function (_a) {
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

function convertArrayToTree(_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.pid, pid = _c === void 0 ? 0 : _c, _d = _a.children, children = _d === void 0 ? 'children' : _d, _e = _a.pidName, pidName = _e === void 0 ? 'parentId' : _e, _f = _a.idName, idName = _f === void 0 ? 'id' : _f;
    var tree = [], map = {};
    data.forEach(function (item) {
        item[children] = map[item[idName]] = map[item[idName]] || [];
        if (item[pidName]) {
            map[item[pidName]] = map[item[pidName]] || [];
            map[item[pidName]].push(item);
        }
        else {
            tree.push(item);
        }
    });
    return pid ? map[pid] : tree;
}
/**
 * 将树形数组转换成一维数组
 * @param treeData
 * @param result
 * @returns
 */
function convertTreeToArray(treeData, result) {
    if (result === void 0) { result = []; }
    treeData.forEach(function (node) {
        var _a;
        result.push(__assign(__assign({}, node), { children: [] }));
        if ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) {
            convertTreeToArray(node.children, result);
        }
    });
    return result;
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
  convertArrayToTree: convertArrayToTree,
  convertTreeToArray: convertTreeToArray,
  getParentsFromArray: getParentsFromArray
});

/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-12-10 11:04:57
 * @LastEditors: Bwrong
 * @LastEditTime: 2022-11-03 15:39:28
 */
var util = utils;

export { authDirective, ganerAuthData, util };
