/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-12-10 11:04:57
 * @LastEditors: Bwrong
 * @LastEditTime: 2020-12-13 22:01:04
 */
import { authDirective as authDirectiveSrc } from './directive';
import ganerAuthDataSrc from './ganerAuthData';
import * as utils from './util';

export const util = utils;
export const ganerAuthData = ganerAuthDataSrc;
export const authDirective = authDirectiveSrc;
export default {
  ganerAuthData,
  authDirective,
  util
};
