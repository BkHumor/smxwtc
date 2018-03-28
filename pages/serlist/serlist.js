var request = require('../../utils/request.js');
var app = getApp();
Page({
  data:{},

  onLoad: function (e, options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onShow: function () {
    //号友动态
    
      request.sayList(
        { "session_id": app.globalData.session_id },
        (res) => {
          console.log(res);
          var datalist = res.data.data;
          datalist.forEach((item) => {
            item.address = item.address.length > 12 ? item.address.substring(0, 12) + '…' : item.address; //要截取字段的字符串
          })
         this.setData({
            list: datalist
          })
        },
      );
    },
  goPub: function () {
    wx.navigateTo({
      url: '../write/write',
    })
  },
  golistDetail: function (e) {

    wx.navigateTo({
      url: '../listDetail/listDetail?id=' + e.currentTarget.dataset.id
    })
  },
  seeBig: function (e) {
    console.log(e.currentTarget);
    wx.previewImage({
      current: e.currentTarget.dataset.pic, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.pic]// 需要预览的图片http链接列表
    })
  }
});