import type { App, Component, DirectiveBinding } from 'vue';
import { hasPermission } from './permissions';
/**
 * 注册权限指令
 */
export function createDirective(app: App) {
  app.directive('auth', (el: Element, binding: DirectiveBinding) => {
    const { value, arg } = binding;
    hasPermission(value, arg as 'every' | 'some') || el.parentNode?.removeChild(el);
  });
}
interface Props {
  value: string | string[];
  model?: 'every' | 'some';
}
// 注册组件
export function createComponent(app: App) {
  const Auth: Component = (props: Props, { slots }) => {
    const access = hasPermission(props.value, props.model as 'every' | 'some');
    if (!access || !slots.default) return null;
    return slots.default();
  };
  app.component('Auth', Auth);
}
