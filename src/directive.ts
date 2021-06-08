import { App, DirectiveBinding, Plugin } from 'vue'

/**
 * 注册权限指令
 * @param {*} directiveName  指令名字
 * @param {*} hasAuth  检查函数
 */
export const authDirective:Plugin = {
  install(Vue:any, { directiveName = 'auth', hasAuth = (value?:string) => true } = {}) {
    if (isVue3(Vue)) {
      Vue.directive(directiveName, {
        mounted(el:Element, binding) {
          !hasAuth(binding.value) && el.parentNode?.removeChild(el);
        }
      });
      return;
    }
    Vue.directive(directiveName, {
      inserted(el:Element, binding:DirectiveBinding<any>) {
        !hasAuth(binding.value) && el.parentNode?.removeChild(el);
      }
    });
  }
};
function isVue3(app: App | any): app is App{
  return !!(app as App).version.match(/^3/)
}