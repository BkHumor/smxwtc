
var app = getApp()

Page({
  data: {
    userInfo: {
      nickname: '',
      sex: 0,
      cover_thumb: 'http://img.zhichiwangluo.com/zc_app_default_photo.png'
    },
    genderArr: ['男', '女'],
    isFromBack: false,
    phone: ''
  },
  onLoad: function(){
    var userInfo = app.getUserInfo(),
       data = {
              'userInfo.nickname': userInfo.data.nickName,
              'userInfo.sex': userInfo.data.gender,
              'userInfo.cover_thumb': userInfo.data.avatarUrl
            };
      console.log('sssss'+userInfo);
    this.setData(data);
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
  choosePhoto: function(){
    var that = this;
    app.chooseImage(function(imgUrl){
      that.setData({
        'userInfo.cover_thumb': imgUrl
      })
    });
  },
  changeGender: function(e){
    this.setData({
      'userInfo.sex': e.detail.value
    })
  },
  inputNickname: function(e){
    this.setData({
      'userInfo.nickname': e.detail.value
    })
  },
  saveUserInfo: function(){
    var data = this.data.userInfo;

    app.sendRequest({
      url: '/index.php?r=AppData/saveUserInfo',
      method: 'post',
      data: data,
      success: function(res){
        if(res.status === 0){
          app.setUserInfoStorage(data);
          app.turnBack();
        }
      }
    });
  },


})




