import UStorage from '@bwrong/storage';
import { convertArrayToTree } from './util';
export const storage = new UStorage({
  driver: localStorage,
  prefix: 'auth__',
});
// 存储permission数据
const storageKey = 'permissionData';
// 权限数据
let cachePermissionsData = storage.get(storageKey) || [];
/**
 * 获取权限集数据
 */
export const getPermissionsData = () => cachePermissionsData || [];
/**
 * 设置权限集数据
 */
export const setPermissionsData = <T = any>(permissionsData: T) => {
  storage.set(storageKey, permissionsData);
  cachePermissionsData = permissionsData;
};

interface ITreeData {
  pid?: number | string;
  children?: string;
  pidName?: string;
  idName?: string;
}
/**
 * 获取权限集树形数据
 * @param {*} pid   顶级节点的id
 * @param {*} children   子集标识key
 * @param {*} pidName    父级标识key
 * @param {*} idName     id标识key
 */
export const getPermissionsTree = ({ pid = 0, children = 'children', pidName = 'parentId', idName = 'id' }: ITreeData = {}) => {
  const permissionsData = getPermissionsData();
  return convertArrayToTree({
    data: permissionsData,
    pid,
    children,
    pidName,
    idName,
  });
};
