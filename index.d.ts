export interface Route{
  meta?: object,
  children?: object[],
  [key:string]: any
}
export type CheckAuth = (route: Route, authMap: object) => boolean;
export type MergeMeta = (routeMeta: object, authMeta: object) => object;
export interface AuthData{
  authMap: object,
  routes: Route[],
  menus: object[]
}
export type ganerAuthData = (routes: Route[], permissions: object[], authKey?: string, checkAuth?: CheckAuth, mergeMeta?: MergeMeta) => AuthData;


export interface AuthDirective<T> {
  install: (Vue: any, options?: T) => void;
  [key: string]: any;
}

export interface AuthUtil{
  convertToTree:(object) => object[],
  getParentsFromArray:(object) => object[],
}