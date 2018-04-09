var request = require('../../utils/request.js');
var app = getApp();
var page =1;
var totalList = [];
var touid = 0;
Page({
  data: {},

  onLoad: function (e, options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(e.id);
    touid = e.id;
  },
  onShow: function () {
    //号友动态

    request.userFansList
    (
      { "session_id": app.globalData.session_id,touid: touid},
      (res) => {
        console.log(res);
        var datalist = res.data;
        this.setData({
          list: datalist
        })
      },
    );
  },

  //赞
  gotouser: function (e) {

    wx.navigateTo({
      url: '../other/other?touid=' + e.currentTarget.dataset.uid
    })
  },
  golistDetail: function (e) {

    wx.navigateTo({
      url: '../listDetail/listDetail?id=' + e.currentTarget.dataset.id
    })
  },

});


