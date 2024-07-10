<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import HelloWorld from './components/HelloWorld.vue';
  import Storage from './components/Storage.vue';
import Request from './components/Request.vue';
import menus from './menus.js'
import routes from './routes.json'
import { initAuth } from '../../../packages/auth/src';
function ganerRoutesAndMenus(routes: Array<RouteRecordRaw>, permissions: Record<string, unknown>[]) {
  const { routes: filterRoutes } = initAuth({
    routes,
    permissions,
    authKey: 'code'
  });
  return filterRoutes as RouteRecordRaw[];
}
const filterRoutes = ganerRoutesAndMenus(routes, menus)
console.log(filterRoutes);

</script>

<template>
  <Storage></Storage>
  <Request></Request>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
