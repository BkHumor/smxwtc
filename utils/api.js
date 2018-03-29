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
//添加说说
const v21 = 'say-add.htm';
function addSay() {
  return api + v21;
}

//删除说说
const v22 = 'say-del.htm';
function delSay() {
  return api + v22;
}
//说说图片
const v23 = 'say-upload_pic.htm';
function addSayPic() {
  return api + v23;
};
//前五条
const v24 = 'say-index_new.htm';
function sayIndexNew() {
  return api + v24;
}
//点赞
const v25 = 'user-like.htm';
function userLike() {
  return api + v25;
}
//说说列表
const v26= 'say-list.htm';
function sayList() {
  return api + v26;
}
//改资料
const v27 = 'user-update.htm';
function userUpdate() {
  return api + v27;
}
//改头像
const v28 = 'user-update_avatar.htm';
function userUpdateAvatar() {
  return api + v28;
}
//读取一条
const v29 = 'say-read.htm';
function readSay() {
  return api + v29;
}
//回复
const v30 = 'post-add.htm';
function postSay() {
  return api + v30;
}
//我的说说
const v31 = 'say-read_by_user.htm';
function getUserSay() {
  return api + v31;
}
//读取别人
const v32 = 'user-read_by_uid.htm';
function getUserByUid() {
  return api + v32;
}
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
  getMapList: getMapList,
  addSay: addSay,
  addSayPic:addSayPic,
  delSay: delSay,
  sayIndexNew: sayIndexNew,
  userLike: userLike,
  sayList: sayList,
  userUpdate:userUpdate,
  userUpdateAvatar: userUpdateAvatar,
  readSay:readSay,
  postSay:postSay,
  getUserSay:getUserSay,
  getUserByUid:getUserByUid,
};