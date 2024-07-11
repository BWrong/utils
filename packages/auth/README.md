# Auth-Tool

![npm](https://img.shields.io/npm/dt/@bwrong/auth-tool)
![npm](https://img.shields.io/npm/v/@bwrong/auth-tool)
![NPM](https://img.shields.io/npm/l/@bwrong/auth-tool)
![GitHub stars](https://img.shields.io/github/stars/BWrong/utils?style=social)

一款适用于Vue3的权限控制工具，可以实现菜单、按钮等资源权限控制，可以满足管理系统中灵活的权限控制需求。

提供如下功能：
- 根据后端设置的权限集过滤出有权限的路由，用作动态路由，以实现页面（路由）的权限控制。
- 根据权限标识，将对应路由的path 添加到菜单的url字段，即可用于渲染导航菜单，当然如果菜单数据本身具有url，则优先使用菜单自身的url。
- 内置权限指令和权限组件，可实现页面元素，如按钮、tab等元素的权限控制。
- 还内置了一些方法，可以自己实现更加复杂的需求。

**注意：V3版本属于重构，V2版本不能直接升级，且V3版本仅支持Vue3，不再兼容Vue2**

### 使用方法
#### 安装
```shell
npm install -S @BWrong/auth-tool
```
#### `initAuth(options)`权限数据处理
```ts
import { initAuth } from '@BWrong/auth-tool';
const { routes, menus } = initAuth({ routes, permissions, authKey: 'permission' });
// 返回数据说明
//- routes: 过滤了没权限的路由，可用于动态注册路由
//- menus:注入了路由path的权限集数据（菜单），可用于渲染菜单
```
**options：**

- routes：动态路由配置表，数据格式如下：

```js
export default [
  {
    path: '/system',
    name: 'system',
    redirect: '/system/department', // 如果不设置redirect，则使用children中的第一个（有权限的）
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

**注意：**
要求传入的permissions为一维数组格式，如果使用数据是树形数组，则需要使用内置的`convertTreeToArray`进行处理后，再传入`initAuth`
```json
[
    {
        "id": 1,
        "permission": "system",
        "title": "系统管理",
        "type": 0,
        "priority": 0,
        "icon": "icon-setting",
        "parentId": 0,
        "url": "/system",
        "children": [
            {
                "id": 2,
                "permission": "system/config",
                "title": "系统配置",
                "type": 0,
                "priority": 0,
                "icon": "icon-setting",
                "parentId": 1,
                "url": "/system/config",
                "children": []
            },
            {
                "id": 3,
                "permission": "system/menu",
                "title": "菜单管理",
                "type": 0,
                "priority": 0,
                "icon": "icon-appstore-o",
                "parentId": 1,
                "url": "/system/menu",
                "children": []
            },
            // ...
        ]
    },
    {
        "id": 9,
        "permission": "system",
        "title": "系统管理2",
        "type": 0,
        "priority": 0,
        "icon": "icon-setting",
        "parentId": 0,
        "url": "/system",
        "children": [
            // ...
        ]
    }
]
```
```ts
import { convertTreeToArray } from '@BWrong/auto-tool';
permissions = convertTreeToArray(permissions)
```
- authKey：**权限集**中用于标识权限的字段名，默认为`permission`，仅用于控制权限集，和路由中的`meta.permission`没关系，路由的这个不可修改，必须为permission。之所以权限集中可修改，是因为该数据来自后台，不可控。

- `checkAuth(route, authMap)`: 权限过滤方法，一般不需要修改。
返回true通过校验，返回false则会忽略该项。默认为：
```js
/**
 * 清洗方法，权限标识不存在或者存在且匹配，则返回true
 * @param {*} route 检测的路由对象
 * @param {*} permissionMap 权限标识表, object, key配置的authKey的值
 */
const checkAuth: CheckAuth = (route, permissionMap) => (route.meta?.permission ? !!permissionMap[route.meta.permission] : true);
```
- `mergeMeta(routeMeta, authMeta)`: 定义route.meta数据的合并策略，一般不需要修改。
返回合并后的数据，返回的数据会覆盖`route.meta`。
```js
/**
 * route.meta数据合并策略
 * @param {*} routeMeta 路由meta数据
 * @param {*} authMeta 路由对应权限菜单数据
 */
const mergeMeta: MergeMeta = (routeMeta, authMeta) => Object.assign(routeMeta, authMeta);
```
- `getRedirectUrl(routes,permissionMap)`: 自定义获取路由redirect方法
```ts
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
```
#### 控制页面资源权限
使用前需要先注册：
```ts
import { authPlugin } from '@BWrong/auto-tool';
const app = createApp(App);
app.use(authPlugin)
```
- `v-auth`指令
```html
<!-- 单个值 -->
<a-button v-auth="'user:edit'">按钮</a-button>
<!-- 多个值数组，可通过参数配置对比策略，默认是every, 必须都满足才有权限 -->
<a-button v-auth="['user:edit','user:add']">按钮</a-button>
<a-button v-auth:every="['user:edit','user:add']">按钮</a-button>
<!-- some, 满足其一即有权限 -->
<a-button v-auth:some="['user:add','user:add']">按钮</a-button>
```
- 组件`Auth`
```html
<Auth value="user:edit">
  <!-- 需要控制权限的元素 -->
  <button>按钮</button>
</Auth>
<Auth :value="['user:edit','user:add']" model="every">
  <!-- 需要控制权限的元素 -->
  <button>按钮</button>
</Auth>
<Auth :value="['user:edit','user:add']" model="some">
  <!-- 需要控制权限的元素 -->
  <button>按钮</button>
</Auth>
```

#### 其他API

以下方法只有在initAuth后调用才会有数据。
##### 权限信息
- `getPermissionKeys()`：获取权限集keys
- `setPermissionKeys(permissionKeys: string[])`: 设置权限集keys
- `addPermissionKeys(keys: string[])`：添加权限集keys
- `removePermissionKeys(keys: string[])`：移除权限集keys
- `hasPermission(
  permission: string | string[],
  model: typeof permission extends string ? never : 'every' | 'some' = 'every'
)`：判断是否有权限

- `getPermissionsData`：获取权限集数据
- `getPermissionsTree(options: ITreeData)`：获取权限集树形数据
```ts
interface ITreeData {
  pid?: number | string;
  children?: string;
  pidName?: string;
  idName?: string;
}
```
- `clearAuth()`：清除权限数据
