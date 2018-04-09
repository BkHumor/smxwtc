var request = require('../../utils/request.js');
var app = getApp();
var page =1;
var totalList = [];
Page({
  data: {},

  onLoad: function (e, options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onShow: function () {
    //号友动态

    request.userPostPm(
      { "session_id": app.globalData.session_id },
      (res) => {
        if(res.data.code == '200') {
          var datalist = res.data.data;
          this.setData({
            list: datalist
          })
        } else if(res.data.code == '203') {
          this.setData({
            list: []
          })
        }
      },
    );
  },
  onReachBottom: function () {
    console.log('ssssssss');
    var that = this;
    page += 1;
    //（5）判断是不是第一次进来
    if (page > 1) {//不是第一次
      //非第一次进入 

      request.userPostPm(
        {
          "session_id": app.globalData.session_id,
          "p": page
        },
        (res) => {

          if (res.data.code == '200') {
            totalList = that.data.list.concat(res.data.data);
          } else  {
            totalList = that.data.list;
          }

          that.setData({
            list: totalList
          })
          //没有更多
          if (res.data.code == "202") {


          } else if(res.data.code =='203') {
            that.setData({
              list: []
            })
          }

        },
      )
    }
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