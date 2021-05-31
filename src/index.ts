/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-12-10 11:04:57
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-05-31 16:22:19
 */
import { authDirective as authDirectiveSrc } from './directive';
import ganerAuthDataSrc,{GanerAuthDataOptins,AuthData} from './ganerAuthData';
// import * as utils from './util';
import { Plugin } from 'vue'
// export const util = utils;
export const ganerAuthData:(options:GanerAuthDataOptins)=> AuthData = ganerAuthDataSrc;
export const authDirective:Plugin = authDirectiveSrc;
