// pages/index/index.js
var request = require('../../utils/request.js');
var app = getApp();
wx.showToast({
  title: '拿劲加载中...',
  icon: 'loading',
  duration: 10000
}),

setTimeout(function () {
  wx.hideToast()
}, 2000)
var timer = null;  // 循环定时器
Page({
  data: {
    style_img: '',
    imgUrls:[],
      firstpage:[
        { id: 1, tname: "全部信息", pic: "../../images/serPic1.png" },
        { id: 2, tname: "房屋租售", pic: "../../images/serPic2.png" },
        { id: 3, tname: "招聘求职", pic: "../../images/serPic3.png" },
        { id: 4, tname: "宠物之家", pic: "../../images/serPic4.png" }],
      secondpage: [
        { id: 5, tname: "拼车出行", pic: "../../images/serPic5.png" },
        { id: 6, tname: "二手交易", pic: "../../images/serPic6.png" },
        { id: 7, tname: "教育辅导", pic: "../../images/serPic7.png" },
        { id: 8, tname: "娱乐饮食", pic: "../../images/serPic8.png" }
   
    ]
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
  onLoad: function (e, options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log('session 未过期');
        app.getUserInfo();
      },
      fail: function () {
        //登录态过期
        app.getUserInfo();
      }
    });
    //号友动态
      if (app.globalData.session_id && app.globalData.session_id != '') {
        request.sayIndexNew(
          { "session_id": app.globalData.session_id },
          (res) => {
            console.log(res);
            var datalist = res.data;
            datalist.forEach((item) => {
              item.address = item.address.length > 12 ? item.address.substring(0, 12) + '…' : item.address; //要截取字段的字符串
              
            })
            console.log(datalist);
            this.setData({
              list: datalist
            })
          },
        );
      } else {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.session_idCallback = session_id => {
          if (session_id != '') {
            request.sayIndexNew(
              { "session_id": app.globalData.session_id },
              (res) => {
                console.log(res);
                var datalist = res.data;
                datalist.forEach((item) => {
                  item.address = item.address.length > 12 ? item.address.substring(0, 12) + '…' : item.address; //要截取字段的字符串
                })
                this.setData({
                  list: res.data
                })
              },
            );
          }
        }
      }
    
   
    this.setData({
      msgList: [
        { url: "url", title: "这里人个个长相保证，绝无五官乱七八糟者！" },
        { url: "url", title: "禁发色情图片！一经发现，当场枪决！" },
        { url: "url", title: "粉丝数和赞数直接影响你的段位和排行哦！" }
      ]
    });


  },
  onUnload: function () {
   
  },
  onShow: function () {
    // 页面显示
    var that = this;
    that.onLoad();
  },
  

  onClickImage: function (e) {
    var that = this;
    that.setData({
      style_img: 'transform:scale(1.1);'
    })
    console.log(e);
    var _uid =e.currentTarget.dataset.uid
    var _id = e.currentTarget.id;
    var _index = e.currentTarget.dataset.index;
    if(that.data.list[_index].islike == 0) {
      request.userLike(
        {"sid": _id, "touid": _uid, "session_id": app.globalData.session_id},
        (res) => {
          console.log(res);
          //成功后的处理。
          var _listislike = 'list['+_index+'].islike';
          var _listlikes = 'list[' + _index + '].likes';
          
          if(res.data.code == 200){
            that.setData({
              [_listislike]: 1,
              [_listlikes]: parseInt(that.data.list[_index].likes)+1
            });
          
          }
          
        }
      );
    } else {
      return;
    }

  },

  startTimer: function () {
    var that = this
    that.setData({
      style_img: 'transform:scale(1.1);'
    })

  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    request.getBanner(
      { "session_id": app.globalData.session_id },
      (res) => {
        console.log(res);
        that.setData({
          imgUrls: res.data
        })
      },
    );
   

  },
  onHide: function () {
    // 页面隐藏
  },
  //便民详情
  goDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  //ser详情

  golistDetail: function (e) {
  
    wx.navigateTo({
      url: '../listDetail/listDetail?id=' + e.currentTarget.dataset.id
    })
  },

  goBanner: function (e) {
    console.log(e.target.dataset.id);
    wx.navigateTo({
      url: '../adDetail/adDetail?id=' + e.currentTarget.dataset.id
    })
  },
  gotouser: function (e) {
   
    wx.navigateTo({
      url: '../other/other?touid=' + e.currentTarget.dataset.uid
    })
  },
  seeBig: function (e) {
    console.log(e.currentTarget);
    wx.previewImage({
      current: e.currentTarget.dataset.pic, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.pic]// 需要预览的图片http链接列表
    })
  }
})
  