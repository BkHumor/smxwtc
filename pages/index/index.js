// pages/index/index.js
var request = require('../../utils/request.js');
var app = getApp();
var ctx = null;
var factor = {
  speed: .008,  // 运动速度，值越小越慢
  t: 0    //  贝塞尔函数系数
};

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
        { url: "url", title: "公告：不能因为长得帅就Ser都不说哦！" },
        { url: "url", title: "公告：不能因为长得漂亮就不年喘哦！" },
        { url: "url", title: "公告：说Ser名人排行榜，点击浏览！" }]
    });


  },
  onUnload: function () {
    if (timer != null) {
      cancelAnimationFrame(timer);
    }

  },

  drawImage: function (data) {
    var that = this
    var p10 = data[0][0];   // 三阶贝塞尔曲线起点坐标值
    var p11 = data[0][1];   // 三阶贝塞尔曲线第一个控制点坐标值
    var p12 = data[0][2];   // 三阶贝塞尔曲线第二个控制点坐标值
    var p13 = data[0][3];   // 三阶贝塞尔曲线终点坐标值

    var p20 = data[1][0];
    var p21 = data[1][1];
    var p22 = data[1][2];
    var p23 = data[1][3];

    var p30 = data[2][0];
    var p31 = data[2][1];
    var p32 = data[2][2];
    var p33 = data[2][3];

    var t = factor.t;

    /*计算多项式系数 （下同）*/
    var cx1 = 3 * (p11.x - p10.x);
    var bx1 = 3 * (p12.x - p11.x) - cx1;
    var ax1 = p13.x - p10.x - cx1 - bx1;

    var cy1 = 3 * (p11.y - p10.y);
    var by1 = 3 * (p12.y - p11.y) - cy1;
    var ay1 = p13.y - p10.y - cy1 - by1;

    var xt1 = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p10.x;
    var yt1 = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p10.y;

    /** ---------------------------------------- */
    var cx2 = 3 * (p21.x - p20.x);
    var bx2 = 3 * (p22.x - p21.x) - cx2;
    var ax2 = p23.x - p20.x - cx2 - bx2;

    var cy2 = 3 * (p21.y - p20.y);
    var by2 = 3 * (p22.y - p21.y) - cy2;
    var ay2 = p23.y - p20.y - cy2 - by2;

    var xt2 = ax2 * (t * t * t) + bx2 * (t * t) + cx2 * t + p20.x;
    var yt2 = ay2 * (t * t * t) + by2 * (t * t) + cy2 * t + p20.y;


    /** ---------------------------------------- */
    var cx3 = 3 * (p31.x - p30.x);
    var bx3 = 3 * (p32.x - p31.x) - cx3;
    var ax3 = p33.x - p30.x - cx3 - bx3;

    var cy3 = 3 * (p31.y - p30.y);
    var by3 = 3 * (p32.y - p31.y) - cy3;
    var ay3 = p33.y - p30.y - cy3 - by3;

    /*计算xt yt的值 */
    var xt3 = ax3 * (t * t * t) + bx3 * (t * t) + cx3 * t + p30.x;
    var yt3 = ay3 * (t * t * t) + by3 * (t * t) + cy3 * t + p30.y;
    factor.t += factor.speed;
    ctx.drawImage("https://www.smxwtc.club/view/img/heart1.png", xt1, yt1, 20, 20);
    ctx.drawImage("https://www.smxwtc.club/view/img/heart2.png", xt2, yt2, 20, 20);
    ctx.drawImage("https://www.smxwtc.club/view/img/heart3.png", xt3, yt3, 20, 20);
    ctx.draw();
    if (factor.t > 1) {
      factor.t = 0;
      cancelAnimationFrame(timer);
      ctx.draw();
     } else {
     
      timer = requestAnimationFrame(function () {
        that.drawImage([[{ x: 30, y: 400 }, { x: 70, y: 300 }, { x: -50, y: 150 }, { x: 30, y: 0 }], [{ x: 30, y: 400 }, { x: 30, y: 300 }, { x: 80, y: 150 }, { x: 30, y: 0 }], [{ x: 30, y: 400 }, { x: 0, y: 90 }, { x: 80, y: 100 }, { x: 30, y: 0 }]])
      })
    }


  },


  onClickImage: function (e) {
    ctx = wx.createCanvasContext('canvas_wi')
    this.startTimer();
    var that = this;
    that.setData({
      style_img: 'transform:scale(1.3);'
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
      style_img: 'transform:scale(1.3);'
    })
    // setTimeout(function () {
    //   that.setData({
    //     style_img: 'transform:scale(1);'
    //   })
    // }, 500)
    that.drawImage([[{ x: 30, y: 400 }, { x: 70, y: 300 }, { x: -50, y: 150 }, { x: 30, y: 0 }], [{ x: 30, y: 400 }, { x: 30, y: 300 }, { x: 80, y: 150 }, { x: 30, y: 0 }], [{ x: 30, y: 400 }, { x: 0, y: 90 }, { x: 80, y: 100 }, { x: 30, y: 0 }]])

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
  seeBig: function (e) {
    console.log(e.currentTarget);
    wx.previewImage({
      current: e.currentTarget.dataset.pic, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.pic]// 需要预览的图片http链接列表
    })
  }
})