# Auth-Tool
![npm](https://img.shields.io/npm/dt/@bwrong/auth-tool)
![npm](https://img.shields.io/npm/v/@bwrong/auth-tool)
![NPM](https://img.shields.io/npm/l/@bwrong/auth-tool)
![GitHub stars](https://img.shields.io/github/stars/bwrong/auth-tool?style=social)

vue项目资源权限控制解决方案。管理系统一般都会包含权限控制，登录不同的用户可以看到不同的资源（菜单、路由、按钮等），此工具封装了权限处理逻辑，资源权限和路由仅通过一个权限标识关联对应，最大程度降低耦合，通过这个标识可以完成很多功能：
1. 清洗出有权限的路由，并动态注册到路由，实现菜单和路由的控制。
2. 通过标识对比，将路由的path添加到菜单（前面后台返回的资源权限），这样后台不需要设置菜单url，即可用于渲染导航菜单。
3. 内置了权限指令，可以通过将某个权限标识和生成的权限集做对比，从而判断是否具有权限来决定显示状态。
### 使用方法
#### 生成相关数据
```js
import { ganerAuthData } from '@bwrong/auth-tool';
const { authMap, routes: filterRoutes, menus } = ganerAuthData({ routes, permissions, authKey: 'code' });
routes // 路由，用于动态注册路由
setStorage('authMap', authMap); // 权限映射表
setStorage('menus', menus); // 用于渲染菜单
```


#### 利用指令控制页面资源
- `v-auth`
```js
import Vue from 'vue';
import { getStorage } from '@/utils/storage';
import { authDirective } from '@bwrong/auth-tool';
let authMap = null;
// 注册权限指令
Vue.use(authDirective, {
  hasAuth(authValue) { // 需要传入对比方法，返回false的资源将被移除
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
