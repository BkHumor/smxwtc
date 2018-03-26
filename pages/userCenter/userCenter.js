var app = getApp();
var request = require('../../utils/request.js');
var pic = 0;
Page({
  data: {
    userInfo: {
      nickname: '',
      sex: 0,
      pic: 'https://www.smxwtc.club/view/img/default_avatar.jpg'
    },
    genderArr:['男','女'],
    isFromBack: false,
   
  },
  onLoad: function(){
    var userInfo = app.globalData.userInfo;
    console.log(userInfo);
    this.setData({userInfo:userInfo});
    console.log(userInfo);
  },
  onShow: function(){

  },
  uploadPic: function () {//选择图标
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        pic = 1;
        that.setData({
          isSrc: true,
          'userInfo.pic': tempFilePaths[0]
        })
    
      }
    })
  },

  changeGender: function(e){
    this.setData({
      'userInfo.sex': e.detail.value == 0 ? '男':'女'
    })
  },
  inputNickname: function(e){
    this.setData({
      'userInfo.nickname': e.detail.value
    })
  },
  inputBrief: function (e) {
    this.setData({
      'userInfo.brief': e.detail.value
    })
  },
  saveUserInfo: function (e) {//保存心情
    //判断心情是否为空
    if(this.data.userInfo.nickname == '') {
      wx.showModal({
        title: '提示',
       content: '昵称不能为空',
        showCancel: false,
        success: function (res) {
        }
      });
    }

    this.upload();
  },
  upload:function () {

    var that = this;
    that.setData({
      btndisabled: true,
      btnloading: true
    })
    request.userUpdate(
      {
        "session_id": app.globalData.session_id,
        "nickname":that.data.userInfo.nickname,
        "sex":that.data.userInfo.sex,
        "brief":that.data.userInfo.brief,
      },
      (res) => {
        console.log(res);
        if (res.data.status == "error") {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
            }
          });
          return;
        }
        if (pic == 1) {
          console.log(222222);
          request.userUpdateAvatar(
            {
              "session_id": app.globalData.session_id,
              "id": res.data.uid,
            }, that.data.userInfo.pic,
            (r) => {
              console.log(r.data);
              if (r.data.status == "error") {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  showCancel: false,
                  success: function (res) {
                  }
                })
                return;
              }
              wx.showToast({
                title: '保存成功！',
                icon: 'success',
                duration: 800,
                complete: setTimeout(function () {
                  wx.navigateTo({
                    url: '../serlist/serlist'
                  })
                }, 800)
              })
              pic = 0;
            },
          )
        } else if (pic == 0) {
          wx.showToast({
            title: '保存成功！',
            icon: 'success',
            duration: 800,
            complete: setTimeout(function () {
              wx.navigateTo({
                url: '../serlist/serlist'
              })
            }, 800)
          })
          return;
        }
      },
    )
  },


})




