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
  //赞
  
  onClickImage: function (e) {
    var that = this;
    var _uid = e.currentTarget.dataset.uid
    var _id = e.currentTarget.id;
    var _index = e.currentTarget.dataset.index;
    if(that.data.list[_index].islike == 0) {
      request.userLike(
        { "sid": _id, "touid": _uid, "session_id": app.globalData.session_id },
        (res) => {
          console.log(res);
          //成功后的处理。
          var _listislike = 'list[' + _index + '].islike';
          var _listlikes = 'list[' + _index + '].likes';

          if (res.data.code == 200) {
            that.setData({
              [_listislike]: 1,
              [_listlikes]: parseInt(that.data.list[_index].likes) + 1
            });

          }

        }
      );
    } else {
      return;
    }
  },
  goPub: function () {
    wx.navigateTo({
      url: '../write/write',
    })
  },
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
  seeBig: function (e) {
    console.log(e.currentTarget);
    wx.previewImage({
      current: e.currentTarget.dataset.pic, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.pic]// 需要预览的图片http链接列表
    })
  }
});