//获取应用实例
var app = getApp()
var common = require('../../utils/common.js')
var request = require('../../utils/request.js')
var that;
var pic = 0;
Page({
  onLoad: function(options) {
      that=this;
      that.setData({//初始化数据
        src:"",
        isSrc:false,
        ishide:"0",
        autoFocus:true,
        isLoading:false,
        loading:true,
        isdisabled:false
      })
  },
  onReady:function(){
     wx.hideToast() 
  },
  onShow:function(){
    var myInterval=setInterval(getReturn,500);
    function getReturn(){
      wx.getStorage({
        key: 'user_openid',
        success: function(ress) {
          if(ress.data){
            clearInterval(myInterval)
              that.setData({
                loading:false
            })
          }
        } 
      })
    }
  },

  uploadPic:function(){//选择图标
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) { 
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        pic = 1;
        that.setData({
          isSrc:true,
          src:tempFilePaths
        })
        console.log(that.data.src);
      }
    })
  },
  clearPic:function(){//删除图片
    pic = 0;
    that.setData({
      isSrc:false,
      src:""
    })
  },

  sendNewMood: function(e) {//保存心情
    //判断心情是否为空

    var content = e.detail.value.content;
    if(content==""){
      common.dataLoading("你说该 Ser?","loading");
    }
    else {
        that.setData({
          isLoading:false,
          isdisabled:false,
          content:content
        })
        that.upload(); 
    }
    
  },
  upload: function () {

    var that = this;
    that.setData({
      btndisabled: true,
      btnloading: true
    })
    request.addSay(
      {
      "session_id": app.globalData.session_id,
      'descript': that.data.content,
      'address': that.data.location,
      'lat': that.data.lat,
      'lng': that.data.lng
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
            request.addSayPic(
              {
                "id": res.data.lastid,
              }, that.data.src[0],
              (r) => {

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
                  title: '嗯~说嘞个美！',
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
            title: '嗯~说嘞个美！',
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
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh()
  },
  goMap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          location: res.name,
          lat: res.latitude,
          lng: res.longitude
        })
      },
      fail: function (res) {
        console.log(res);
        console.log(that.data.lat);
      }
    });
  },
})
