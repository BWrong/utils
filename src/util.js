/********** 工具函数 ************/
/**
 * 将一维数组格式转换成树结构
 * TODO: 考虑使用尾递归优化算法。
 * @param {*} data  需要转换的数据
 * @param {*} pid   顶级节点的id
 * @param {*} children   子集标识key
 * @param {*} pidName    父级标识key
 * @param {*} idName     id标识key
 */
export function convertToTree({ data = [], pid = 0, children = 'children', pidName = 'parentId', idName = 'id' }) {
  let arr = [];
  data.map((item) => {
    if (item[pidName] === pid) {
      let child = item[children] || [];
      item[children] = child.concat(convertToTree({ data, pid: item[idName], children, pidName, idName }));
      arr.push(item);
    }
  });
  return arr;
}
/**
 * 从数组中根据id获取所有父级元素，返回数组
 * TODO: 考虑使用尾递归优化算法
 * @param id  // 当前项的id
 * @param data  // 要查找的数组
 * @param {*} idName     id标识key
 * @param {*} pidName    父级标识key
 * @param result // 返回结果
 */
export function getParentsFromArray({id, data, idName = 'id', pidName = 'parentId', result = []}) {
  for (const item of data) {
    if (item[idName] === id) {
      result.unshift(item);
      getParentsFromArray({ id:item[pidName], data, idName, pidName, result });
    }
  }
  return result;
}
