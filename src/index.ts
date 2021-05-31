/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-12-10 11:04:57
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-05-31 15:47:19
 */
import { authDirective as authDirectiveSrc } from './directive';
import ganerAuthDataSrc from './ganerAuthData';
import * as utils from './util';
import { Plugin } from 'vue'
export const util = utils;
export const ganerAuthData = ganerAuthDataSrc;
export const authDirective:Plugin = authDirectiveSrc;
