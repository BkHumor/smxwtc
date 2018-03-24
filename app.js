var WxParse = require('wxParse/wxParse.js');
var util = require('utils/util.js');
var request = require('utils/request.js');
App({
  onLaunch: function () {
  },
  onShareAppMessage: function () {
    return {
      success: function (res) {
        // 分享成功
        console.log(res);
      },
      fail: function (res) {
        // 分享失败
        console.log(res);
      }
    }
  },
  getUserInfo: function () {
    var that = this;
    var session_id = wx.getStorageSync('sessionkey');
  
    if (session_id == undefined || session_id == '') {
      wx.login({
        success: function (res) {
        console.log(res);
          if (res.code) {
            //发起网络请求
            request.login(
              {
                "code": res.code
              }, (res) => {

                console.log(res);
                var session_id = res.data.session_id;
                that.globalData.session_id = res.data.session_id;
                wx.setStorageSync('sessionkey', session_id);
                if(that.session_idCallback) {
                  that.session_idCallback(session_id);
                }
              }
            )
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    } else {
      that.globalData.session_id = session_id;
      if (that.session_idCallback) {
        that.session_idCallback(session_id);
      }
    }
    request.getUser(
      { "session_id": that.globalData.session_id},
      (res) => {
        if(res.data.status == 200) {
          that.globalData.userInfo = res.data;
        } else if(res.data.status == 201) {
          wx.removeStorageSync('sessionkey');
        }

      },
    )
  },
  globalData: {
    session_id:''
  }
})

