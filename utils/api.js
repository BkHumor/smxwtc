// 主地址
const api = 'https://www.smxwtc.club/?';
// 登录
const v1 = 'user-login.htm';
function login() {
  return api + v1;
};
// 获取Banner
const v2 = 'banner-index_banner.htm';
function getBanner() {
  return api + v2;
};
// 保存用户信息
const v3 = 'user-check_login.htm';
function checkLogin() {
  return api + v3;
};
// 个人中心
const v4 = 'user-read.htm';
function getUser() {
  return api + v4;
};
// 分类列表信息
const v5 = 'type-all.htm';
function getType() {
  return api + v5;
};
// 获取区域列表
const v6 = 'type-area.htm';
function getArea() {
  return api + v6;
};
// 发布新需求
const v7 = 'notice-add.htm';
function addNotice() {
  return api + v7;
};
// 获取便民信息列表
const v8 = 'notice-typelist.htm';
function getUserTypeList() {
  return api + v8;
};
// 获取个人发布列表
const v9 = 'notice-read_by_user.htm';
function getUserList() {
  return api + v9;
};
// 删除个人已发布信息
const v10 = 'notice-del.htm';
function noticeDel() {
  return api + v10;
};
// 获取商家活动详情图
const v11 = 'getQupic.htm';
function getQupic() {
  return api + v11;
};
// 获取Banner详情
const v12 = 'banner-read.htm';
function getBannerDetial() {
  return api + v12;
};
const v13 = 'notice-upload_pic.htm';
function addNoticePic() {
  return api + v13;
};
//获取个人发布单条信息
const v14 = 'notice-read.htm';
function getUserListOne() {
  return api + v14;
};
//获取公司配置信息
const v15 = 'getPeizhi.htm';
function getPeizhi() {
  return api + v15;
};

//获取类目信息
const v16 = 'notice-read_by_type.htm';
function getTypes() {
  return api + v16;
};


//修改发布信息
const v17 = 'notice-update.htm';
function editNotice() {
  return api + v17;
};

//获取类目
const v18 = 'type-tname.htm';
function getTname() {
  return api + v18;
};
//获取区域
const v19 = 'type-aname.htm';
function getAname() {
  return api + v19;
};
//获取默认地区
const v20 = 'user-get_map.htm';
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