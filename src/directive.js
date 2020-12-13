/**
 * 注册权限指令
 * @param {*} directiveName  指令名字
 * @param {*} hasAuth  检查函数
 */
export const authDirective = {
  install(Vue, { directiveName = 'auth', hasAuth = () => true } = {}) {
    Vue.directive(directiveName, {
      inserted(el, binding) {
        !hasAuth(binding.value) && el.parentNode?.removeChild(el);
      }
    });
  }
};
