declare type CheckAuth = (route: Route, authMap: Record<string, any>) => boolean;
declare type MergeMeta = (routeMeta: object, authMeta: Record<string, any>) => object;
interface RouteMeta {
    permission: string;
}
interface Route {
    path: string;
    meta?: RouteMeta | undefined;
    children?: Route[];
    [key: string]: any;
}
export interface GanerAuthDataOptins {
    routes: Route[];
    permissions: object[];
    authKey?: string;
    checkAuth?: CheckAuth;
    mergeMeta?: MergeMeta;
}
export interface AuthData {
    authMap: object;
    routes: Route[];
    menus: object[];
}
declare const _default: ({ routes, permissions, authKey, checkAuth, mergeMeta }: GanerAuthDataOptins) => AuthData;
export default _default;
