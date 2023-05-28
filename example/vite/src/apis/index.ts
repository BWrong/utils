/*
 * @Author: bwrong
 * @Github: https://github.com/bwrong
 * @Date: 2021-07-05 14:53:16
 * @LastEditors: bwrong
 * @LastEditTime: 2022-04-24 15:08:58
 * @Description:api统一管理
 */
import request from '@/utils/request';

export interface ApiPagination {
  url: string;
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export interface ApiDepartmentItem {
  id: string;
  name: string;
  parentId: string;
  createTime: string;
  updateTime: string;
  sort: number;
  remark: string;
  status: number;
}

export interface ApiDepartment {
  pagination: ApiPagination;
  list: ApiDepartmentItem[];
}

// export const getDepartmentList = () => request.get<ApiDepartment>('/department'); //业务成功

// export const getDepartmentList = () => request.get<ApiDepartment>('/department?apifoxResponseId=13587582', {});  // 业务失败

export const getDepartmentList = () => request.get<ApiDepartment>('/department?apifoxResponseId=35945705', {}, { ignoreCancelToken: true, isNotTips:false }); // 未授权
