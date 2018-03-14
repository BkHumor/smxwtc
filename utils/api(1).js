// 主地址
const api = 'http://www.smxwtc.club/?';
// 登录
const v1 = 'login';
function login() {
  return api + v1;
};
// 获取Banner
const v2 = 'banner';
function getBanner() {
  return api + v2;
};
// 保存用户信息
const v3 = 'check_login';
function checkLogin() {
  return api + v3;
};
// 个人中心
const v4 = 'get_user';
function getUser() {
  return api + v4;
};
// 分类列表信息
const v5 = 'get_type';
function getType() {
  return api + v5;
};
// 获取区域列表
const v6 = 'get_area';
function getArea() {
  return api + v6;
};
// 发布新需求
const v7 = 'notice_add';
function addNotice() {
  return api + v7;
};
// 获取便民信息列表
const v8 = 'usertype_list';
function getUserTypeList() {
  return api + v8;
};
// 获取个人发布列表
const v9 = 'userlist';
function getUserList() {
  return api + v9;
};
// 删除个人已发布信息
const v10 = 'notice_del';
function noticeDel() {
  return api + v10;
};
// 获取商家活动详情图
const v11 = 'get_company_pic';
function getQupic() {
  return api + v11;
};
// 获取Banner详情
const v12 = 'banner_read';
function getBannerDetial() {
  return api + v12;
};
const v13 = 'deal_many_pic';
function addNoticePic() {
  return api + v13;
};
//获取个人发布单条信息
const v14 = 'notice_list';
function getUserListOne() {
  return api + v14;
};
//获取公司配置信息
const v15 = 'get_company';
function getPeizhi() {
  return api + v15;
};

//获取类目信息
const v16 = 'get_types';
function getTypes() {
  return api + v16;
};


//修改发布信息
const v17 = 'notice_update';
function editNotice() {
  return api + v17;
};

//获取类目
const v18 = 'get_tagname';
function getTname() {
  return api + v18;
};
//获取区域
const v19 = 'get_aname';
function getAname() {
  return api + v19;
};
//获取默认地区
const v20 = 'get_maplist';
function getMapList() {
  return api + v20;
};


module.exports = {
  login: login,
  getBanner: getBanner,
  checkLogin: checkLogin,
  getUser: getUser,
  getType: getType,
  getArea: getArea,
  addNotice: addNotice,
  getUserTypeList: getUserTypeList,
  getUserList: getUserList,
  noticeDel: noticeDel,
  getQupic: getQupic,
  getBannerDetial:getBannerDetial,
  addNoticePic:addNoticePic,
  getUserListOne: getUserListOne,
  getPeizhi: getPeizhi,
  getTypes: getTypes,
  editNotice: editNotice,
  getTname: getTname,
  getAname: getAname,
  getMapList: getMapList
};