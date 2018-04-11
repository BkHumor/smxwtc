var request = require('../../utils/request.js');
var app = getApp();
var pic=0;
var contact_name = ""//企业联系人

  , mobile = ""//联系方式

  , name//企业名称

  , brief//企业简介
  
  ,classid//行业
Page({
  data: {
    
    lxr_inputVal: "",
    mc_inputVal: "",
    dh_inputVal: "",
    js_inputVal: "",
    pic: '',
    classdata: [
      { classid: '0', value: '装修建材' },
      { classid: '1', value: '娱乐饮食'},
      { classid: '2', value: '宠物之家' },
      { classid: '3', value: '名品服饰' },
      { classid: '4', value: '家电维修' },
      { classid: '5', value: '其他服务', checked: 'true' },
    ]

  },
  chooseImage: function () {//选择图标
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
          pic: tempFilePaths[0]
        })
        console.log(that.data.src);
      }
    })
  },





  previewImage: function (e) {
    console.log("当前显示图片的http链接:", e.currentTarget.id);
    console.log("需要预览的图片http链接列表:", this.data.files);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  lxr_bt: function (e) {
    contact_name = e.detail.value;
  },
  dh_bt: function (e) {
    mobile = e.detail.value;
  },
  mc_bt: function (e) {
    name = e.detail.value;
  },
  js_bt: function (e) {
    brief = e.detail.value;
  },
  radioChange: function (e) {
    console.log(e.detail);
    classid = e.detail.value;
  },

  saveClick: function () {

    if (contact_name == "" || mobile == "") {
      wx.showModal({
        title: '提示',
        content: '商铺联系人、联系电话为必填项',
        showCancel: false
      });
      return
    } else {

      var myreg = /^[1][1,3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(mobile)) {
        wx.showModal({
          title: '提示',
          content: '手机号格式错误',
          showCancel: false
        });
        return;
      }
    }
    this.upload();
   
  




    // wx.navigateTo({
    //   url: '../index/index'
    // })
  },
  upload: function () {

    var that = this;
    that.setData({
      btndisabled: true,
      btnloading: true
    })
    request.companyApply(
      {
        "session_id": app.globalData.session_id,
        "contact_name": contact_name,
        "mobile": mobile,
        "name":name,
        "brief":brief,
        "classid":classid
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
         
          request.companyPic(
            {
              "session_id": app.globalData.session_id,
              "id": res.data.companyid,
            }, that.data.pic,
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
                title: '提交成功！',
                icon: 'success',
                duration: 800,
                complete: setTimeout(function () {
                  wx.navigateTo({
                    url: '../companylist/companylist'
                  })
                }, 800)
              })
              pic = 0;
            },
          )
        } else if (pic == 0) {
          wx.showToast({
            title: '提交成功！',
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
