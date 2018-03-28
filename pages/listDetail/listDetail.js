
//获取应用实例
var request = require('../../utils/request.js');
var app = getApp();
var that;
var sid=0;
Page({
  data: {
    limit: 5,
    showImage: false,
    loading: false,
    isdisabled: false,
    commentLoading: false,
    isdisabled1: false,
    recommentLoading: false,
    commentList: [],
    agree: 0
  },

  onLoad: function (options) {
    that = this;
    sid = options.id;
    request.readSay(
      { "id": sid, "session_id": app.globalData.session_id },
      (res) => {
        if(res.data.status == 'error') {

        } else if(res.data.status == 'success') {
          console.log(res.data);
          that.setData({
            list:res.data
          });
        }
      }
    )

  },
  onReady: function () {
    wx.hideToast()

  },
  onShow: function () {



  },


  changeLike: function (event) {//点赞

  },
  changeComment: function () {
    that.setData({
      autoFo: true
    })
  },
  changeFocus: function () {
    that.setData({
      autoFo: true
    })
  },
  inputContent: function (e) {
    console.log(e);
    that.setData({
      content: e.detail.value
    })
  },
  publishComment:function() {
    if(that.data.content == '') {
      wx.showModal({
        title: '提示',
        content: '回复内容不能为空',
        showCancel: false,
        success: function (res) {
        }
      });
    }
    request.postSay(
      { 'session_id': app.globalData.session_id,'sid':sid, 'content':that.data.content},
      (res)=>{
        if(res.data.status == 'error') {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
            }
          });
          return;
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
              url: '../listDetail/listDetail?id=' + sid
              })
            }

          });
          //刷新该页面
          
        }
      }  
    
    );
  },
 
  hiddenResponse: function () {
    this.setData({
      isToResponse: false
    })
  },
  onHide: function () {
    // Do something when hide.
  },
  onUnload: function (event) {

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  seeBig: function (e) {
    wx.previewImage({
      current: that.data.listPic, // 当前显示图片的http链接
      urls: [that.data.listPic] // 需要预览的图片http链接列表
    })
  }
})
