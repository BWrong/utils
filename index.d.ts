export interface Route{
  path: string,
  meta?: object,
  children?: object[],
  [key:string]: any
}
type CheckAuth = (route: Route, authMap: object) => boolean;
type MergeMeta = (routeMeta: object, authMeta: object) => object;
export interface GanerAuthDataOptins{
  routes: Route[],
  permissions: object[],
  authKey?: string,
  checkAuth?: CheckAuth,
  mergeMeta?: MergeMeta
}

export interface AuthData{
  authMap: object,
  routes: Route[],
  menus: object[]
}

export declare function ganerAuthData(options: GanerAuthDataOptins): AuthData;

export interface AuthDirectiveOptions{
  directiveName?: string,
  hasAuth?: (permission: string) => boolean
}
interface AuthDirective<T> {
  install: (Vue: any, options?: T) => void;
  [key: string]: any;
}

export declare const authDirective: AuthDirective;

export declare const util:{
  convertToTree: (object) => object[],
  getParentsFromArray:(object) => object[],
}