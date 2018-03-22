
var app = getApp()

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
  },
  onShow: function(){
    if(this.data.isFromBack){
      var phone = app.getUserInfo().phone;
      if(phone){
        this.setData({
          phone: phone
        })
      }
    } else {
      this.setData({
        isFromBack: true
      });
    }
  },
  uploadPic: function () {//选择图标
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          isSrc: true,
          src: tempFilePaths
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
  saveUserInfo: function(){
    var data = this.data.userInfo;
    //请求

  },


})




