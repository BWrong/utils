const menus = [
  {
    "id": 1000,
    "code": "salesTarget",
    "title": "设置目标",
    "type": "action",
    "icon": "",
    "parentId": 0
  },
  {
    "id": 1001,
    "code": "customFeat",
    "title": "常用功能自定义",
    "type": "action",
    "icon": "",
    "parentId": 0
  },
  {
    "id": 1,
    "code": "sales",
    "title": "销售管理",
    "type": "menu",
    "icon": "",
    "parentId": 0
  },
  {
    "id": 11,
    "code": "sales/opportunity",
    "title": "目标订单",
    "type": "menu",
    "icon": "",
    "parentId": 1
  },
  // {
  //   "id": 111,
  //   "code": "sales/follow",
  //   "title": "目标订单跟进",
  //   "type": "menu",
  //   "icon": "icon-icon-3",
  //   "parentId": 11
  // },
  // {
  //   "id": 1111,
  //   "code": "sales/follow/add",
  //   "title": "创建目标订单",
  //   "type": "action",
  //   "icon": "",
  //   "parentId": 111
  // },
  // {
  //   "id": 1112,
  //   "code": "sales/follow/import",
  //   "title": "导入",
  //   "type": "action",
  //   "icon": "",
  //   "parentId": 111
  // },
  // {
  //   "id": 1113,
  //   "code": "sales/follow/export",
  //   "title": "导出",
  //   "type": "action",
  //   "icon": "",
  //   "parentId": 111
  // },
  // {
  //   "id": 1114,
  //   "code": "sales/follow/edit",
  //   "title": "修改目标订单",
  //   "type": "action",
  //   "icon": "",
  //   "parentId": 111
  // },
  // {
  //   "id": 1115,
  //   "code": "sales/follow/delete",
  //   "title": "删除目标订单",
  //   "type": "action",
  //   "icon": "",
  //   "parentId": 111
  // },
  // {
  //   "id": 112,
  //   "code": "sales/stage",
  //   "title": "目标订单阶段管理",
  //   "type": "menu",
  //   "icon": "icon-icon-4",
  //   "parentId": 11
  // },
  // {
  //   "id": 1121,
  //   "code": "sales/stage/add",
  //   "title": "增加目标订单阶段",
  //   "type": "action",
  //   "icon": "",
  //   "parentId": 112
  // },
  // {
  //   "id": 1122,
  //   "code": "sales/stage/edit",
  //   "title": "编辑目标订单阶段",
  //   "type": "action",
  //   "icon": "",
  //   "parentId": 112
  // },
  // {
  //   "id": 1123,
  //   "code": "sales/stage/delete",
  //   "title": "删除目标订单阶段",
  //   "type": "action",
  //   "icon": "",
  //   "parentId": 112
  // },
  {
    "id": 12,
    "code": "sales/manage",
    "title": "销售管理",
    "type": "menu",
    "icon": "",
    "parentId": 1
  },
  {
    "id": 121,
    "code": "sales/seas",
    "title": "公海",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 12
  },
  {
    "id": 1211,
    "code": "sales/seas/assign",
    "title": "分配负责人",
    "type": "action",
    "icon": "",
    "parentId": 121
  },
  {
    "id": 1212,
    "code": "sales/seas/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 121
  },
  {
    "id": 122,
    "code": "sales/order",
    "title": "销售合同",
    "type": "menu",
    "icon": "icon-icon2",
    "parentId": 12
  },
  {
    "id": 1221,
    "code": "sales/order/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 1222,
    "code": "sales/order/add",
    "title": "创建销售合同",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 1223,
    "code": "sales/order/delete",
    "title": "删除订单",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 1224,
    "code": "sales/order/return",
    "title": "退货",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 1225,
    "code": "sales/order/exchange",
    "title": "换货",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 1226,
    "code": "sales/order/delivery",
    "title": "发货",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 1227,
    "code": "sales/order/setting",
    "title": "订单设置",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 1228,
    "code": "sales/order/edit",
    "title": "编辑信息",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 1229,
    "code": "sales/order/status",
    "title": "流转状态",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 12210,
    "code": "sales/order/audit",
    "title": "撤回审核",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 12211,
    "code": "sales/order/import",
    "title": "导入合同",
    "type": "action",
    "icon": "",
    "parentId": 122
  },
  {
    "id": 123,
    "code": "sales/delivery-order",
    "title": "发货订单",
    "type": "menu",
    "icon": "icon-fahuo",
    "parentId": 12
  },
  {
    "id": 1231,
    "code": "sales/delivery-order/add",
    "title": "创建发货订单",
    "type": "action",
    "icon": "",
    "parentId": 123
  },
  {
    "id": 1232,
    "code": "sales/delivery-order/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 123
  },
  {
    "id": 1233,
    "code": "sales/delivery-order/status",
    "title": "状态",
    "type": "action",
    "icon": "",
    "parentId": 123
  },
  {
    "id": 1234,
    "code": "sales/delivery-order/invoice",
    "title": "开票",
    "type": "action",
    "icon": "",
    "parentId": 123
  },
  {
    "id": 1235,
    "code": "sales/delivery-order/cancel",
    "title": "撤销",
    "type": "action",
    "icon": "",
    "parentId": 123
  },
  {
    "id": 1236,
    "code": "sales/delivery-order/import",
    "title": "导入订单",
    "type": "action",
    "icon": "",
    "parentId": 123
  },
  {
    "id": 124,
    "code": "sales/return-order",
    "title": "退货单",
    "type": "menu",
    "icon": "icon-tuihuo",
    "parentId": 12
  },
  {
    "id": 1241,
    "code": "sales/return-order/add",
    "title": "创建退货单",
    "type": "action",
    "icon": "",
    "parentId": 124
  },
  {
    "id": 1242,
    "code": "sales/return-order/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 124
  },
  {
    "id": 1243,
    "code": "sales/return-order/status",
    "title": "状态",
    "type": "action",
    "icon": "",
    "parentId": 124
  },
  {
    "id": 125,
    "code": "sales/exchange-order",
    "title": "换货单",
    "type": "menu",
    "icon": "icon-huanhuo",
    "parentId": 12
  },
  {
    "id": 1251,
    "code": "sales/exchange-order/add",
    "title": "创建退货单",
    "type": "action",
    "icon": "",
    "parentId": 125
  },
  {
    "id": 1252,
    "code": "sales/exchange-order/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 125
  },
  {
    "id": 1253,
    "code": "sales/exchange-order/status",
    "title": "状态",
    "type": "action",
    "icon": "",
    "parentId": 125
  },
  {
    "id": 126,
    "code": "sales/sample-application",
    "title": "送样申请",
    "type": "menu",
    "icon": "icon-huanhuo",
    "parentId": 12
  },
  {
    "id": 1261,
    "code": "sales/sample-application/add",
    "title": "创建送样",
    "type": "action",
    "icon": "",
    "parentId": 126
  },
  {
    "id": 1262,
    "code": "sales/sample-application/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 126
  },
  {
    "id": 1263,
    "code": "sales/sample-application/delete",
    "title": "删除",
    "type": "action",
    "icon": "",
    "parentId": 126
  },
  {
    "id": 1264,
    "code": "sales/sample-application/delivery",
    "title": "发货",
    "type": "action",
    "icon": "",
    "parentId": 126
  },
  {
    "id": 1265,
    "code": "sales/sample-application/feedback",
    "title": "反馈",
    "type": "action",
    "icon": "",
    "parentId": 126
  },
  {
    "id": 127,
    "code": "sales/feedback",
    "title": "反馈",
    "type": "menu",
    "icon": "icon-huanhuo",
    "parentId": 12
  },
  {
    "id": 1271,
    "code": "sales/feedback/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 127
  },{
    "id": 1272,
    "code": "sales/feedback/solution",
    "title": "解决方案",
    "type": "action",
    "icon": "",
    "parentId": 127
  },
  {
    "id": 13,
    "code": "sales/setting/menu",
    "title": "销售设置",
    "type": "menu",
    "icon": "",
    "parentId": 1
  },
  {
    "id": 131,
    "code": "sales/setting",
    "title": "销售设置",
    "type": "menu",
    "icon": "icon-shezhi",
    "parentId": 13
  },
  {
    "id": 1311,
    "code": "sales/setting/industry/add",
    "title": "添加行业",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 1312,
    "code": "sales/setting/industry/edit",
    "title": "编辑行业",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 1313,
    "code": "sales/setting/industry/delete",
    "title": "删除行业",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 1314,
    "code": "sales/setting/industry/setting",
    "title": "行业属性设置",
    "type": "action",
    "icon": "",
    "parentId": 131
  }, {
    "id": 1315,
    "code": "sales/setting/payment/add",
    "title": "添加付款条件",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 1316,
    "code": "sales/setting/payment/edit",
    "title": "编辑付款条件",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 1317,
    "code": "sales/setting/payment/delete",
    "title": "删除付款条件",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 1318,
    "code": "sales/setting/payment/setting",
    "title": "付款条件属性设置",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 1319,
    "code": "sales/setting/contractType/add",
    "title": "添加合同类型",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 13110,
    "code": "sales/setting/contractType/edit",
    "title": "编辑合同类型",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 13111,
    "code": "sales/setting/contractType/delete",
    "title": "删除合同类型",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 13112,
    "code": "sales/setting/contractType/setting",
    "title": "合同类型属性设置",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 13113,
    "code": "sales/setting/rate/add",
    "title": "添加汇率",
    "type": "action",
    "icon": "",
    "parentId": 131
  },{
    "id": 13114,
    "code": "sales/setting/rate/edit",
    "title": "编辑汇率",
    "type": "action",
    "icon": "",
    "parentId": 131
  },{
    "id": 13115,
    "code": "sales/setting/rate/delete",
    "title": "删除汇率",
    "type": "action",
    "icon": "",
    "parentId": 131
  },
  {
    "id": 2,
    "code": "customer",
    "title": "客户管理",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 0
  },
  {
    "id": 21,
    "code": "customer/list",
    "title": "客户列表",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 2
  },{
    "id": 2101,
    "code": "customer/add",
    "title": "创建客户",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 2102,
    "code": "customer/import",
    "title": "导入",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 2103,
    "code": "customer/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 2104,
    "code": "customer/edit",
    "title": "编辑",
    "type": "action",
    "icon": "",
    "parentId": 21
  },
  {
    "id": 2105,
    "code": "customer/delete",
    "title": "删除",
    "type": "action",
    "icon": "",
    "parentId": 21
  },
  {
    "id": 2106,
    "code": "customer/follow/add",
    "title": "写跟进",
    "type": "action",
    "icon": "",
    "parentId": 21
  },
  {
    "id": 2107,
    "code": "customer/follow/edit",
    "title": "编辑跟进",
    "type": "action",
    "icon": "",
    "parentId": 21
  },
  {
    "id": 2108,
    "code": "customer/follow/delete",
    "title": "删除跟进",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 2109,
    "code": "customer/invoice/add",
    "title": "新建发票",
    "type": "action",
    "icon": "",
    "parentId": 21
  },
  {
    "id": 21010,
    "code": "customer/invoice/edit",
    "title": "编辑发票",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 21011,
    "code": "customer/invoice/delete",
    "title": "删除发票",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 21012,
    "code": "customer/payback/add",
    "title": "新建回款单",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 21013,
    "code": "customer/payback/edit",
    "title": "编辑回款单",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 21014,
    "code": "customer/payback/delete",
    "title": "删除回款单",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 21015,
    "code": "customer/receivables/add",
    "title": "新建应收款",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 21016,
    "code": "customer/receivables/edit",
    "title": "编辑应收款",
    "type": "action",
    "icon": "",
    "parentId": 21
  },{
    "id": 21017,
    "code": "customer/receivables/delete",
    "title": "删除应收款",
    "type": "action",
    "icon": "",
    "parentId": 21
  },
  {
    "id": 211,
    "code": "customer/all",
    "title": "全部客户",
    "type": "menu",
    "icon": "icon-icon-6",
    "parentId": 21
  },
  {
    "id": 212,
    "code": "customer/important",
    "title": "重点客户",
    "type": "menu",
    "icon": "icon-icon-7",
    "parentId": 21
  },
  {
    "id": 213,
    "code": "customer/successful",
    "title": "成交客户",
    "type": "menu",
    "icon": "icon-icon-8",
    "parentId": 21
  },
  {
    "id": 2131,
    "code": "customer/dormant",
    "title": "休眠客户",
    "type": "menu",
    "icon": "icon-icon-6",
    "parentId": 21
  },
  {
    "id": 2132,
    "code": "customer/stop",
    "title": "停用客户",
    "type": "menu",
    "icon": "icon-icon-6",
    "parentId": 21
  },
  {
    "id": 214,
    "code": "customer/enterprise-check",
    "title": "企业查重",
    "type": "menu",
    "icon": "icon-icon-15",
    "parentId": 21
  },
  {
    "id": 2141,
    "code": "customer/enterprise-check/customer",
    "title": "企业查询",
    "type": "action",
    "icon": "",
    "parentId": 214
  },
  {
    "id": 2142,
    "code": "customer/enterprise-check/contact",
    "title": "联系人查询",
    "type": "action",
    "icon": "",
    "parentId": 214
  },
  {
    "id": 22,
    "code": "customer/manage",
    "title": "客户管理",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 2
  },
  {
    "id": 221,
    "code": "customer/tag",
    "title": "标签管理",
    "type": "menu",
    "icon": "icon-icon-5",
    "parentId": 22
  },
  {
    "id": 2211,
    "code": "customer/tag/add",
    "title": "新建标签组",
    "type": "action",
    "icon": "",
    "parentId": 221
  },
  {
    "id": 2212,
    "code": "customer/tag/edit",
    "title": "编辑标签组",
    "type": "action",
    "icon": "",
    "parentId": 221
  },
  {
    "id": 2213,
    "code": "customer/tag/delete",
    "title": "删除标签组",
    "type": "action",
    "icon": "",
    "parentId": 221
  },
  {
    "id": 222,
    "code": "customer/contact",
    "title": "客户联系人",
    "type": "menu",
    "icon": "icon-icon-1",
    "parentId": 22
  },
  {
    "id": 2221,
    "code": "customer/contact/add",
    "title": "新建客户联系人",
    "type": "action",
    "icon": "",
    "parentId": 222
  },
  {
    "id": 2222,
    "code": "customer/contact/edit",
    "title": "编辑客户联系人",
    "type": "action",
    "icon": "",
    "parentId": 222
  },
  {
    "id": 2223,
    "code": "customer/contact/delete",
    "title": "删除客户联系人",
    "type": "action",
    "icon": "",
    "parentId": 222
  },
  {
    "id": 3,
    "code": "goods",
    "title": "商品管理",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 0
  },

  {
    "id": 31,
    "code": "goods/manage",
    "title": "商品管理",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 3
  },
  {
    "id": 311,
    "code": "goods/list",
    "title": "商品列表",
    "type": "menu",
    "icon": "icon-icon-9",
    "parentId": 31
  },
  {
    "id": 3111,
    "code": "goods/list/add",
    "title": "创建商品",
    "type": "action",
    "icon": "",
    "parentId": 311
  },
  {
    "id": 3112,
    "code": "goods/list/edit",
    "title": "编辑商品",
    "type": "action",
    "icon": "",
    "parentId": 311
  },
  {
    "id": 3113,
    "code": "goods/list/delete",
    "title": "删除商品",
    "type": "action",
    "icon": "",
    "parentId": 311
  },
  {
    "id": 3114,
    "code": "goods/list/quotationSheet",
    "title": "生成报价单",
    "type": "action",
    "icon": "",
    "parentId": 311
  },
  {
    "id": 3115,
    "code": "goods/list/import",
    "title": "导入",
    "type": "action",
    "icon": "",
    "parentId": 311
  },
  {
    "id": 3116,
    "code": "goods/list/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 311
  },
  {
    "id": 3117,
    "code": "goods/list/addQuotation",
    "title": "生成报价单",
    "type": "action",
    "icon": "",
    "parentId": 311
  },
  {
    "id": 3118,
    "code": "goods/list/shelves",
    "title": "批量上架",
    "type": "action",
    "icon": "",
    "parentId": 311
  },{
    "id": 3119,
    "code": "goods/list/down",
    "title": "批量下架",
    "type": "action",
    "icon": "",
    "parentId": 311
  },{
    "id": 31110,
    "code": "goods/list/updateTags",
    "title": "批量修改标签",
    "type": "action",
    "icon": "",
    "parentId": 311
  },
  {
    "id": 312,
    "code": "goods/tag",
    "title": "商品标签",
    "type": "menu",
    "icon": "icon-icon-5",
    "parentId": 31
  },
  {
    "id": 3121,
    "code": "goods/tag/add",
    "title": "新建标签组",
    "type": "action",
    "icon": "",
    "parentId": 312
  },
  {
    "id": 3122,
    "code": "goods/tag/edit",
    "title": "编辑标签组",
    "type": "action",
    "icon": "",
    "parentId": 312
  },
  {
    "id": 3123,
    "code": "goods/tag/delete",
    "title": "删除标签组",
    "type": "action",
    "icon": "",
    "parentId": 312
  },
  {
    "id": 32,
    "code": "goods/quote/menu",
    "title": "商品报价",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 3
  },
  {
    "id": 321,
    "code": "goods/quote",
    "title": "报价单",
    "type": "menu",
    "icon": "icon-icon-16",
    "parentId": 32
  },
  {
    "id": 3211,
    "code": "goods/quote/edit",
    "title": "编辑报价单",
    "type": "action",
    "icon": "",
    "parentId": 321
  },
  {
    "id": 3212,
    "code": "goods/quote/delete",
    "title": "删除报价单",
    "type": "action",
    "icon": "",
    "parentId": 321
  },{
    "id": 3213,
    "code": "goods/quote/export",
    "title": "导出报价单",
    "type": "action",
    "icon": "",
    "parentId": 321
  },
  {
    "id": 4,
    "code": "workbench",
    "title": "工作台",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 0
  },
  {
    "id": 41,
    "code": "workbench/data",
    "title": "数据",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 4
  },
  {
    "id": 411,
    "code": "workbench/report",
    "title": "数据报表",
    "type": "menu",
    "icon": "icon-icon-19",
    "parentId": 41
  },
  {
    "id": 42,
    "code": "workbench/contractApproval",
    "title": "合同审批",
    "type": "menu",
    "icon": "",
    "parentId": 4
  },
  {
    "id": 421,
    "code": "workbench/contract",
    "title": "合同管理",
    "type": "menu",
    "icon": "icon-icon-181",
    "parentId": 42
  },
  {
    "id": 4211,
    "code": "workbench/contract/add",
    "title": "新建销售合同模板",
    "type": "action",
    "icon": "",
    "parentId": 421
  },
  {
    "id": 4212,
    "code": "workbench/contract/edit",
    "title": "编辑合同模板",
    "type": "action",
    "icon": "",
    "parentId": 421
  },
  {
    "id": 4213,
    "code": "workbench/contract/delete",
    "title": "删除合同模板",
    "type": "action",
    "icon": "",
    "parentId": 421
  },
  {
    "id": 422,
    "code": "workbench/approval",
    "title": "相关审批",
    "type": "menu",
    "icon": "icon-icon-17",
    "parentId": 42
  },
  {
    "id": 4221,
    "code": "workbench/approval/approval",
    "title": "审批操作",
    "type": "action",
    "icon": "",
    "parentId": 422
  },
  {
    "id": 4222,
    "code": "workbench/approval/delete",
    "title": "删除",
    "type": "action",
    "icon": "",
    "parentId": 422
  },
  {
    "id": 5,
    "code": "setting",
    "title": "设置中心",
    "type": "menu",
    "icon": "icon-icon-2",
    "parentId": 0
  },
  {
    "id": 51,
    "code": "setting/user",
    "title": "员工管理",
    "type": "menu",
    "icon": "icon-icon-3",
    "parentId": 5
  },
  {
    "id": 511,
    "code": "setting/department",
    "title": "部门成员",
    "type": "menu",
    "icon": "icon-icon-14",
    "parentId": 51
  },
  {
    "id": 5111,
    "code": "setting/department/add",
    "title": "添加部门",
    "type": "action",
    "icon": "",
    "parentId": 511
  },
  {
    "id": 5112,
    "code": "setting/department/edit",
    "title": "编辑部门",
    "type": "action",
    "icon": "",
    "parentId": 511
  },
  {
    "id": 5113,
    "code": "setting/department/delete",
    "title": "删除部门",
    "type": "action",
    "icon": "",
    "parentId": 511
  },
  {
    "id": 5114,
    "code": "setting/department/addUser",
    "title": "新建成员",
    "type": "action",
    "icon": "",
    "parentId": 511
  },
  {
    "id": 5115,
    "code": "setting/department/editUser",
    "title": "编辑成员",
    "type": "action",
    "icon": "",
    "parentId": 511
  },
  {
    "id": 5116,
    "code": "setting/department/deleteUser",
    "title": "删除成员",
    "type": "action",
    "icon": "",
    "parentId": 511
  },
  {
    "id": 512,
    "code": "setting/analysis",
    "title": "使用分析",
    "type": "menu",
    "icon": "icon-icon-13",
    "parentId": 51
  },
  {
    "id": 52,
    "code": "setting/system",
    "title": "系统管理",
    "type": "menu",
    "icon": "icon-icon-3",
    "parentId": 5
  },
  {
    "id": 521,
    "code": "setting/role",
    "title": "角色权限",
    "type": "menu",
    "icon": "icon-icon3",
    "parentId": 52
  },
  {
    "id": 5211,
    "code": "setting/role/add",
    "title": "添加角色",
    "type": "action",
    "icon": "",
    "parentId": 521
  },
  {
    "id": 5212,
    "code": "setting/role/edit",
    "title": "编辑角色",
    "type": "action",
    "icon": "",
    "parentId": 521
  },
  {
    "id": 5213,
    "code": "setting/role/delete",
    "title": "删除角色",
    "type": "action",
    "icon": "",
    "parentId": 521
  },
  {
    "id": 5214,
    "code": "setting/role/editUser",
    "title": "添加/删除成员",
    "type": "action",
    "icon": "",
    "parentId": 521
  },
  {
    "id": 522,
    "code": "setting/field",
    "title": "字段应用",
    "type": "menu",
    "icon": "icon-icon-12",
    "parentId": 52
  },
  {
    "id": 5221,
    "code": "setting/field/setting",
    "title": "字段设置",
    "type": "action",
    "icon": "",
    "parentId": 522
  },
  {
    "id": 523,
    "code": "setting/log",
    "title": "操作日志",
    "type": "menu",
    "icon": "icon-icon-110",
    "parentId": 52
  },
  {
    "id": 5231,
    "code": "setting/log/export",
    "title": "导出",
    "type": "action",
    "icon": "",
    "parentId": 523
  }
]
export default menus
