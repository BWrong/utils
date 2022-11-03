import { RouteRecordRaw } from 'vue-router';
declare type CheckAuth = (route: Route, authMap: Record<string, any>) => boolean;
declare type MergeMeta = (routeMeta: object, authMeta: Record<string, any>) => object;
interface RouteMeta {
    permission?: string;
    [key: string]: any;
}
declare type Route = RouteRecordRaw & {
    meta?: RouteMeta | undefined;
    children?: Route[];
};
export interface GanerAuthDataOptins {
    routes: Route[];
    permissions: object[];
    authKey?: string;
    checkAuth?: CheckAuth;
    mergeMeta?: MergeMeta;
    prefix?: string;
}
export interface AuthData {
    authMap: object;
    routes: Route[];
    menus: object[];
}
declare const _default: ({ routes, permissions, authKey, checkAuth, mergeMeta, prefix }: GanerAuthDataOptins) => AuthData;
export default _default;
