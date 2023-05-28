/*
 * @Author: bwrong
 * @Github: https://github.com/bwrong
 * @Date: 2021-11-20 20:14:53
 * @LastEditors: bwrong
 * @LastEditTime: 2021-12-14 21:47:42
 * @Description:环境变量
 */
export const DEVELOPMENT = 'development';

export const PRODUCTION = 'production';

export const IS_PRODUCTION = isProdMode();

export const IS_DEVELOPMENT = isDevMode();

export const ENV = getEnv();

export const EVN_MODE = getEnvMode();

export function getEnv(): ImportMetaEnv {
  return import.meta.env;
}

export function getEnvMode(): string {
  return import.meta.env.MODE;
}

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
