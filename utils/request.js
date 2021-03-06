var api = require('./api.js');
var app = getApp();
/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */

function requestData(url, data0, successCallback, errorCallback) {
    wx.request({
        url: url,
        method: 'POST',
        data: data0,
        success: function (res) {
            successCallback(res);
        },
        error: function (res) {
            errorCallback(res);
        },
    });
}
function requestDataPic(url, data0, imageList, successCallback, errorCallback) {
    wx.uploadFile({
        url: url,
        filePath: imageList,
        name: 'file',
        formData: data0,
        success: function (res) {
            successCallback(res);
        },
        error: function (res) {
            errorCallback(res);
        },
    })
}
// 授权登录
function login(data0, successCallback, errorCallback) {
    requestData(api.login(), data0, successCallback, errorCallback);
}
// 获取Banner
function getBanner(data0, successCallback, errorCallback) {
    requestData(api.getBanner(), data0, successCallback, errorCallback);
}
// 存储用户信息
function checkLogin(data, successCallback, errorCallback) {
    requestData(api.checkLogin(), data, successCallback, errorCallback);
}
// 个人中心
function getUser(data, successCallback, errorCallback) {
    requestData(api.getUser(), data, successCallback, errorCallback);
}
// 分类列表信息
function getType(data, successCallback, errorCallback) {
    requestData(api.getType(), data, successCallback, errorCallback);
}
// 获取区域列表
function getArea(data, successCallback, errorCallback) {
    requestData(api.getArea(), data, successCallback, errorCallback);
}
// 发布新需求
function addNotice(data, successCallback, errorCallback) {
    requestData(api.addNotice(), data, successCallback, errorCallback);
}
// 修改一条需求
function editNotice(data, successCallback, errorCallback) {
  requestData(api.editNotice(), data, successCallback, errorCallback);
}
// 发布新需求(有图)
function addNoticePic(data, imageList, successCallback, errorCallback) {
    requestDataPic(api.addNoticePic(), data, imageList, successCallback, errorCallback);
}
// 获取便民信息列表
function getUserTypeList(data, successCallback, errorCallback) {
    requestData(api.getUserTypeList(), data, successCallback, errorCallback);
}
// 获取个人发布列表
function getUserList(data, successCallback, errorCallback) {
    requestData(api.getUserList(), data, successCallback, errorCallback);
}
// 获取个人发布列表单条信息
function getUserListOne(data, successCallback, errorCallback) {
  requestData(api.getUserListOne(), data, successCallback, errorCallback);
}
// 删除个人已发布信息
function noticeDel(data, successCallback, errorCallback) {
    requestData(api.noticeDel(), data, successCallback, errorCallback);
}
// 获取每日趣图
function getQupic(data, successCallback, errorCallback) {
    requestData(api.getQupic(), data, successCallback, errorCallback);
}
// 获取Banner详情
function getBannerDetial(data, successCallback, errorCallback) {
    requestData(api.getBannerDetial(), data, successCallback, errorCallback);
}
// 获取公司配置信息
function getPeizhi(data, successCallback, errorCallback) {
  requestData(api.getPeizhi(), data, successCallback, errorCallback);
}
// 获取类目信息
function getTypes(data, successCallback, errorCallback) {
  requestData(api.getTypes(), data, successCallback, errorCallback);
}
// 获取类目名称
function getTname(data, successCallback, errorCallback) {
  requestData(api.getTname(), data, successCallback, errorCallback);
}
// 获取地区名称
function getAname(data, successCallback, errorCallback) {
  requestData(api.getAname(), data, successCallback, errorCallback);
}

// 获取默认地区
function getMapList(data, successCallback, errorCallback) {
  requestData(api.getMapList(), data, successCallback, errorCallback);
}

//说说
function addSay(data, successCallback, errorCallback) {
  requestData(api.addSay(), data, successCallback, errorCallback);
}
//删除说说
function delSay(data, successCallback, errorCallback) {
  requestData(api.delSay(), data, successCallback, errorCallback);
}
//说说图片
function addSayPic(data, imageList, successCallback, errorCallback) {
  requestDataPic(api.addSayPic(), data, imageList, successCallback, errorCallback);
}
//首页五个
function sayIndexNew(data,successCallback, errorCallback) {
  requestData(api.sayIndexNew(), data, successCallback, errorCallback);
}
//点赞
function userLike(data, successCallback, errorCallback) {
  requestData(api.userLike(), data, successCallback, errorCallback);
}
//说说列表
function sayList(data, successCallback, errorCallback) {
  requestData(api.sayList(), data, successCallback, errorCallback);
}
//修改个人资料
function userUpdate(data, successCallback, errorCallback) {
  requestData(api.userUpdate(), data, successCallback, errorCallback);
}
//改头像

function userUpdateAvatar(data, imageList, successCallback, errorCallback) {
  requestDataPic(api.userUpdateAvatar(), data, imageList, successCallback, errorCallback);
}
//读取一条
function readSay(data, successCallback, errorCallback) {
  requestData(api.readSay(), data, successCallback, errorCallback);
}
//回复
function postSay(data, successCallback, errorCallback) {
  requestData(api.postSay(), data, successCallback, errorCallback);
}
//我的说说
function getUserSay(data, successCallback, errorCallback) {
  requestData(api.getUserSay(), data, successCallback, errorCallback);
}
//别人
function getUserByUid(data, successCallback, errorCallback) {
  requestData(api.getUserByUid(), data, successCallback, errorCallback);
}
//获取排行
function getUserRank(data, successCallback, errorCallback) {
  requestData(api.getUserRank(), data, successCallback, errorCallback);
}
//关注
function userFollow(data, successCallback, errorCallback) {
  requestData(api.userFollow(), data, successCallback, errorCallback);
}
//取关
function userUnFollow(data, successCallback, errorCallback) {
  requestData(api.userUnFollow(), data, successCallback, errorCallback);
}
//关注列表
function userFollowList(data, successCallback, errorCallback) {
  requestData(api.userFollowList(), data, successCallback, errorCallback);
}
//粉丝列表
function userFansList(data, successCallback, errorCallback) {
  requestData(api.userFansList(), data, successCallback, errorCallback);
}
//赞动态
function userLikePm(data, successCallback, errorCallback) {
  requestData(api.userLikePm(), data, successCallback, errorCallback);
}
//评论动态
function userPostPm(data, successCallback, errorCallback) {
  requestData(api.userPostPm(), data, successCallback, errorCallback);
}
//商家入驻
function companyApply(data, successCallback, errorCallback) {
  requestData(api.companyApply(), data, successCallback, errorCallback);
}
//入驻图片
function companyPic(data, imageList, successCallback, errorCallback) {
  requestDataPic(api.companyPic(), data, imageList, successCallback, errorCallback);
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
    getUserListOne: getUserListOne,
    noticeDel: noticeDel,
    getQupic: getQupic,
    getBannerDetial: getBannerDetial,
    addNoticePic: addNoticePic,
    getPeizhi: getPeizhi,
    getTypes: getTypes,
    editNotice: editNotice,
    getTname: getTname,
    getAname: getAname,
    getMapList: getMapList,
    addSay: addSay,
    readSay:readSay,
    delSay: delSay,
    addSayPic: addSayPic,
    sayIndexNew:sayIndexNew,
    userLike: userLike,
    sayList: sayList,
    userUpdate:userUpdate,
    userUpdateAvatar: userUpdateAvatar,
    postSay:postSay,
    getUserSay:getUserSay,
    getUserByUid: getUserByUid,
    getUserRank:getUserRank,
    userFollow: userFollow,
    userUnFollow: userUnFollow,
    userFollowList: userFollowList,
    userFansList: userFansList,
    userLikePm: userLikePm,
    userPostPm:userPostPm,
    companyApply:companyApply,
    companyPic:companyPic
};