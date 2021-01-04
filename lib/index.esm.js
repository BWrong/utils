/* libName: authTool version: 1.2.2 author: bwrong<ibwrong@foxmail.com> */
/**
 * 注册权限指令
 * @param {*} directiveName  指令名字
 * @param {*} hasAuth  检查函数
 */
var authDirective = {
  install: function install(Vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$directiveName = _ref.directiveName,
        directiveName = _ref$directiveName === void 0 ? 'auth' : _ref$directiveName,
        _ref$hasAuth = _ref.hasAuth,
        hasAuth = _ref$hasAuth === void 0 ? function () {
      return true;
    } : _ref$hasAuth;

    Vue.directive(directiveName, {
      inserted: function inserted(el, binding) {
        var _el$parentNode;

        !hasAuth(binding.value) && ((_el$parentNode = el.parentNode) === null || _el$parentNode === void 0 ? void 0 : _el$parentNode.removeChild(el));
      }
    });
  }
};

/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-07-03 15:57:14
 * @LastEditors: Bwrong
 * @LastEditTime: 2020-12-31 11:17:17
 */
var routeMap = {}; // 路由映射表

var defaultAuthKey = 'permission';
var ganerAuthDataSrc = (function (_ref) {
  var _ref$routes = _ref.routes,
      routes = _ref$routes === void 0 ? [] : _ref$routes,
      _ref$permissions = _ref.permissions,
      permissions = _ref$permissions === void 0 ? [] : _ref$permissions,
      _ref$authKey = _ref.authKey,
      authKey = _ref$authKey === void 0 ? defaultAuthKey : _ref$authKey,
      _ref$checkAuth = _ref.checkAuth,
      checkAuth = _ref$checkAuth === void 0 ? _checkAuth : _ref$checkAuth,
      _ref$mergeMeta = _ref.mergeMeta,
      mergeMeta = _ref$mergeMeta === void 0 ? _mergeMeta : _ref$mergeMeta;

  // 校验参数
  _checkParamIsArray(routes, 'routes');

  _checkParamIsArray(permissions, 'permissions'); // 权限映射表


  var authMap = _ganAuthMap(permissions, authKey); // 清洗后，有权限额路由，用于动态注册路由


  var authRoutes = _getAuthRoutes(routes, authMap, checkAuth, mergeMeta); // 添加了path/url的菜单，用于渲染导航


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

function _ganAuthMap() {
  var permissions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var authKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultAuthKey;
  // TODO:支持嵌套结构
  return permissions.reduce(function (temp, item) {
    return temp[item[authKey]] = item, temp;
  }, {});
}
/**
 * 清洗路由，获取具有权限的路由
 * @param {*} routes 前端路由映射表
 * @param {*} authMap 权限标识表，map
 * @param {*} checkAuth 权限检查方法
 * @param {*} mergeMeta meta数据合并策略
 */


function _getAuthRoutes() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var authMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var checkAuth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _checkAuth;
  var mergeMeta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _mergeMeta;
  return routes.filter(function (route) {
    if (checkAuth(route, authMap)) {
      var _route$meta;

      if ((_route$meta = route.meta) !== null && _route$meta !== void 0 && _route$meta.permission) {
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


function _addPathOfMenus() {
  var routeMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var menus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var authKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultAuthKey;
  return menus.map(function (item) {
    var _routeMap$item$authKe, _item$children;

    item.url = item[authKey] && ((_routeMap$item$authKe = routeMap[item[authKey]]) === null || _routeMap$item$authKe === void 0 ? void 0 : _routeMap$item$authKe.path) || '';

    if ((_item$children = item.children) !== null && _item$children !== void 0 && _item$children.length) {
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
  var _route$meta2;

  return (_route$meta2 = route.meta) !== null && _route$meta2 !== void 0 && _route$meta2.permission ? !!authMap[route.meta.permission] : true;
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
  return Array.isArray(param) || (console.error("@bwrong/auth-tool/ganerAuthData: ".concat(key, "\u53C2\u6570\u4F20\u5165\u6570\u636E\u7C7B\u578B\u4E0D\u6B63\u786E\uFF0C\u8BF7\u4F20\u5165Array\u6570\u636E\u7C7B\u578B")), false);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
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
function convertToTree(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$pid = _ref.pid,
      pid = _ref$pid === void 0 ? 0 : _ref$pid,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? 'children' : _ref$children,
      _ref$pidName = _ref.pidName,
      pidName = _ref$pidName === void 0 ? 'parentId' : _ref$pidName,
      _ref$idName = _ref.idName,
      idName = _ref$idName === void 0 ? 'id' : _ref$idName;
  var arr = [];
  data.map(function (item) {
    if (item[pidName] === pid) {
      var child = item[children] || [];
      item[children] = child.concat(convertToTree({
        data: data,
        pid: item[idName],
        children: children,
        pidName: pidName,
        idName: idName
      }));
      arr.push(item);
    }
  });
  return arr;
}
/**
 * 从数组中根据id获取所有父级元素，返回数组
 * TODO: 考虑使用尾递归优化算法
 * @param id  // 当前项的id
 * @param data  // 要查找的数组
 * @param {*} idName     id标识key
 * @param {*} pidName    父级标识key
 * @param result // 返回结果
 */

function getParentsFromArray(_ref2) {
  var id = _ref2.id,
      data = _ref2.data,
      _ref2$idName = _ref2.idName,
      idName = _ref2$idName === void 0 ? 'id' : _ref2$idName,
      _ref2$pidName = _ref2.pidName,
      pidName = _ref2$pidName === void 0 ? 'parentId' : _ref2$pidName,
      _ref2$result = _ref2.result,
      result = _ref2$result === void 0 ? [] : _ref2$result;

  var _iterator = _createForOfIteratorHelper(data),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;

      if (item[idName] === id) {
        result.unshift(item);
        getParentsFromArray({
          id: item[pidName],
          data: data,
          idName: idName,
          pidName: pidName,
          result: result
        });
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
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
 * @LastEditTime: 2020-12-13 22:01:04
 */
var util = utils;
var ganerAuthData = ganerAuthDataSrc;
var authDirective$1 = authDirective;
var index = {
  ganerAuthData: ganerAuthData,
  authDirective: authDirective$1,
  util: util
};

export default index;
export { authDirective$1 as authDirective, ganerAuthData, util };
