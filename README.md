# Auth-Tool

![npm](https://img.shields.io/npm/dt/@bwrong/auth-tool)
![npm](https://img.shields.io/npm/v/@bwrong/auth-tool)
![NPM](https://img.shields.io/npm/l/@bwrong/auth-tool)
![build](https://api.travis-ci.org/BWrong/auth-tool.svg?branch=master)
![GitHub stars](https://img.shields.io/github/stars/bwrong/auth-tool?style=social)

vue 项目资源权限控制解决方案。管理系统一般都会包含权限控制，登录不同的用户可以看到不同的资源（菜单、路由、按钮等），此工具封装了权限处理逻辑，资源权限和路由仅通过一个权限标识关联对应，最大程度降低耦合，通过这个标识可以完成很多功能：

1. 清洗出有权限的路由，并动态注册到路由，实现菜单和路由的控制。
2. 通过标识对比，将路由的 path 添加到菜单（前面后台返回的资源权限），这样后台不需要设置菜单 url，即可用于渲染导航菜单。
3. 内置了权限指令，可以通过将某个权限标识和生成的权限集做对比，从而判断是否具有权限来决定显示状态。

### 使用方法
#### 安装
```shell
npm install -S @bwrong/auth-tool
```
#### 生成相关数据

##### 通过调用`ganerAuthData(options)`生成相关数据

**options：**

- routes：动态路由配置表，数据格式如下：

```js
export default [
  {
    path: '/system',
    name: 'system',
    redirect: '/system/department',
    meta: {
      permission: 'system'
    },
    children: [
      {
        path: '/system/role', // 路径暂时仅支持完整格式
        name: 'role',
        component: () => import('@/views/system/Role.vue'),
        meta: {
          permission: 'system/role'
        }
      },
      {
        path: '/system/menu',
        name: 'menu',
        component: () => import('@/views/system/Menu.vue'),
        meta: {
          permission: 'system/menu'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User.vue'),
    meta: {
      permission: 'user'
    }
  }
];
```

- permissions：权限映射表。

```json
[
  {
    "id": 1,
    "permission": "system", // 权限标识，因为该数据为后端返回，所以权限标识的key，不同项目可能会不一样，所以提供下面authKey的参数用来配置key名
    "name": "系统管理",
    "type": 0,
    "parentId": 0
  },
  {
    "id": 2,
    "permission": "system/role",
    "name": "角色管理",
    "type": 0,
    "parentId": 1
  },

  {
    "id": 3,
    "permission": "system/menu",
    "name": "菜单管理",
    "type": 0,
    "parentId": 1
  },
  {
    "id": 4,
    "permission": "user",
    "name": "用户管理",
    "type": 0,
    "parentId": 0
  },
  // ....
]
```

- authKey：配置权限标识的 key 名，默认为`permission`。
上面permissions（权限映射表）中用来标识权限标识的key名，因为permissions数据由后端提供，所以权限标识的key不同项目可能会不一样，可通过authKey参数配置修改。但是此配置不影响routes路由配置表中的key名，因为路由由前端自己配置，可以保证数据格式的统一。

- `checkAuth(route, authMap)`: 权限过滤方法。
返回true通过校验，返回false则会忽略该项。默认为：
```js
/**
 * 清洗方法，权限标识不存在或者存在且匹配,则返回true
 * @param {*} route 检测的路由对象
 * @param {*} authMap 权限标识表，map
 */
function checkAuth(route, authMap) {
  return route.meta?.permission ? !!authMap[route.meta.permission] : true;
}
```
- `mergeMeta(routeMeta, authMeta)`: 定义route.meta数据的合并策略。
返回合并后的数据，返回的数据会覆盖`route.meta`。
```js
/**
 * route.meta数据合并策略
 * @param {*} routeMeta 路由meta数据
 * @param {*} authMeta 路由对应权限菜单数据
 */
function mergeMeta(routeMeta, authMeta) {
  return Object.assign(routeMeta, authMeta)
}
```

调用方法并生成需要的数据：
```js
import { ganerAuthData } from '@bwrong/auth-tool';
const { authMap, routes, menus } = ganerAuthData({ routes, permissions, authKey: 'permission' });
// 返回数据说明
//- routes: 清洗后的路由，过滤调了没权限的路由，用于动态注册路由
//- authMap: 权限映射表，用于根据权限标识查找对应的菜单
//- menus: 添加了对应url的菜单，用于渲染菜单
```

#### 控制页面资源

- 使用`v-auth`指令

```js
import Vue from 'vue';
import { getStorage } from '@/utils/storage';
import { authDirective } from '@bwrong/auth-tool';
let authMap = null;
// 注册权限指令
Vue.use(authDirective, {
  directiveName: 'auth', // 注册指令的名字，默认为auth
  hasAuth(authValue) { // 需要传入对比方法，返回false的资源将被移除，默认均返回true，不过滤
    authMap = authMap || getStorage('permissions') || [];
    return authMap.includes(authValue);
  }
});
```

```html
<!-- 按钮 -->
<a-button v-auth="'btn_ipBinding_edit'">权限资源</a-button>
<!-- 选项卡 -->
<a-tabs default-active-key="1" @change="callback">
  <a-tab-pane key="1" tab="Tab 1">1</a-tab-pane>
  <a-tab-pane key="2" tab="Tab 2" v-auth="'btn_ipBinding_edit'">2</a-tab-pane>
  <a-tab-pane key="3" tab="Tab 3">3</a-tab-pane>
</a-tabs>
<!-- 更多 -->
```
- 其他方式（自行实现）

除了上述指令的方式，还可以自己封装组件，将需要控制的元素用该组件包裹，在组件内部判断是否显示包裹的资源。
