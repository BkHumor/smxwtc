// pages/publish/publish.js
var request = require('../../utils/request.js');
var app = getApp();
var tid, aid, area, dd, money, descript, phone, pic = 0;
Page({
  data: {
    firsrCart: "发布类目",
    firsrArea: "发布区域",
    showCart: true,
    showArea: false,
    selectCart: true,
    cartChoice: false,
    selectArea: false,
    showDetail: false,
    showMoneyBox: true,
    showAreaBox: false,
    // 选择地址
    address: '',
    lat: '',
    lng: '',
    //发布详情页的数据
    imageList: [],
    cartid: 1,
    areaid: 1,
    showInfo: {},
    uploadPicBtn: true,
    ylys: {
      "area": "营业店：",
      "areaPlaceholder": "（如：某某KTV）",
      "descript": '具体描述：',
      "descriptPlaceholder": "（如：某某KTV,包下午场13点~18点,100元）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },

    fwcs: {
      "area": "房屋名称：",
      "areaPlaceholder": "（如：某某 三居室 98平米）",
      "money": '房屋售价：',
      "moneyPlaceholder": "（如：200万）",
      "descript": '房屋描述：',
      "descriptPlaceholder": "（如：120平米，3室2厅1卫，简单装修，5楼电梯）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    zp: {
      "area": "招聘职位：",
      "areaPlaceholder": "（如：保姆）",
      "money": '职位工资：',
      "moneyPlaceholder": "（如：50000元/月）",
      "areabox": "招聘地点：",
      "areaboxPlaceholder": "(如：某某)",
      "descript": '职位描述：',
      "descriptPlaceholder": "（如：需有高等教育背景，为人细心，有相关经验，薪资可议）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    cwzj: {
      "area": "宠物名称：",
      "areaPlaceholder": "（如：出售金毛及加菲猫等）",
      "money": '宠物价格：',
      "moneyPlaceholder": "（如：2000元）",
      "areabox": "所在地点：",
      "areaboxPlaceholder": "(如：陕县大营镇)",
      "descript": '服务描述：',
      "descriptPlaceholder": "（如：家有满一个月的泰迪5只，香槟色，红棕色等。疫苗齐全，预购从速，手慢无。微信：xxx）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    pccx: {
      "area": "拼车标题：",
      "areaPlaceholder": "（如：上下班拼车，开发区到市内）",
      "money": '拼车价格：',
      "moneyPlaceholder": "（如：20元，单程）",
      "areabox": "拼车地点：",
      "areaboxPlaceholder": "(如：陕县大营镇)",
      "descript": '服务描述：',
      "descriptPlaceholder": "（如：早晨八点上班，晚上五点下班，希望找一个顺路的，长期拼车，单程20，往返30.女士优先，车上禁止吃东西，禁止吸烟。）",
    },
    eswp: {
      "area": "物品名称：",
      "areaPlaceholder": "（如：9成新iPhone7）",
      "money": '物品售价：',
      "moneyPlaceholder": "（如：6000元）",
      "descript": '物品描述：',
      "descriptPlaceholder": "（如：亮黑色，128G，去年十月份入手，无刮痕，国行，保修期到今年十二月份。配件齐全。有发票。当面交易，可小刀)",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    jyfd: {
      "area": "辅导科目",
      "areaPlaceholder": "（如：数学1对1专业辅导）",
      "money": '收费标准：',
      "moneyPlaceholder": "（如：60元/课时）",
      "descript": '详细描述',
      "descriptPlaceholder": "（如：专业的数学培训，多年教学辅导经验。学生参加奥数竞赛获得优异成绩。只接受晚上一对一辅导，每次两个课时，20课时起报。）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    zhxx: {
      "area": "信息标题：",
      "areaPlaceholder": "（如：专业疏通下水道）",
      "descript": '信息描述：',
      "descriptPlaceholder": "（如：常年从事疏通下水道工作，非常专业，上门服务，疏通不成功不收取任何费用。）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
  },
  //分享功能的实现
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

  //点击类目
  clickCart: function () {
    var showCart = this.data.showCart;
    if (showCart == true) {
      this.setData({
        cartChoice: true,
        selectCart: false,
        showCart: false,
        showDetail: false,
      })
    } else {
      this.setData({
        cartChoice: true,
        selectCart: true,
        showCart: true,
        showArea: false,
        showDetail: false,
      })
    }
  },
  //点击切换类目
  cartSelect: function (e) {

    this.setData({
      firsrCart: e.target.dataset.cart,
      showCart: true,
      selectCart: false,
      showArea: false,
      cartid: e.currentTarget.dataset.id,
      num1: e.currentTarget.dataset.id
    })

  },
  //点击选择区域
  clickArea: function () {
    var showArea = this.data.showArea;
    if (showArea == true) {
      this.setData({
        areaChoice: true,
        selectArea: false,
        showArea: false,
        showDetail: false,
      })
    } else {
      this.setData({
        areaChoice: false,
        selectArea: true,
        showCart: false,
        showArea: true,
        showDetail: false,
      })
    }
  },
  //点击切换区域
  areaSelect: function (e) {
    this.setData({
      firsrArea: e.target.dataset.area,
      showArea: false,
      selectArea: false,
      areaid: e.currentTarget.dataset.id,
      //----------显示面板
      showDetail: true,
      num2: e.currentTarget.dataset.id
    })

    //选择数据
    var that = this;
    switch (that.data.cartid) {
      case 1:
        that.setData({
          showMoneyBox: false,
          showAreaBox: false,
          showInfo: that.data.ylys
        })
        break;
      case 2:
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.fwcs
        })
        break;
      case 3:
        that.setData({
          showMoneyBox: true,
          showAreaBox: true,
          showInfo: that.data.zp
        })
        break;
      case 4:
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.cwzj
        })
        break;
      case 5:
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.pccx
        })
        break;
      case 6:
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.eswp
        })
        break;
      case 7:
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.jyfd
        })
        break;
      case 8:
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.zhxx
        })
        break;
    }

  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log(options.editId);
    this.setData({
      pid: options.editId
    })

    // 获取类目列表
    var that = this;
    request.getType(
      { "session_id": app.globalData.session_id },
      (res) => {
        console.log(res.data);
        that.setData({
          list: res.data
        })

      },
    ),
      //获取区域列表
      request.getArea(
        {//"tid": this.data.cartid
        },
        (res) => {
          console.log(res.data);
          that.setData({
            areaList: res.data
          })

        },
    //获取当前的订单的发布信息
    request.getUserListOne(
      { "session_id": app.globalData.session_id,
        "id": options.editId
       },
      (res) => {
        that.setData({
          listInfo: res.data,
          cartid: res.data.tid,
          areaid: res.data.aid,
          firsrCart: res.data.tname,
          firsrArea: res.data.aname,
          address: res.data.address,
          dd:res.data.dd,
          showCart: false,
          showArea: false,
          selectCart: false,
          cartChoice: false,
          selectArea: false,
          showDetail: true,
          optionsId: options.editId,
          piclist: res.data.pic_list,
         
        })

        switch (res.data.tid) {
          case '1':
            that.setData({
              showMoneyBox: false,
              showAreaBox: false,
              showInfo: that.data.ylys
            })
            break;
          case '2':
            that.setData({
              showMoneyBox: true,
              showAreaBox: false,
              showInfo: that.data.fwcs
            })
            break;
          case '3':
            that.setData({
              showMoneyBox: true,
              showAreaBox: true,
              showInfo: that.data.zp
            })
            break;
          case '4':
            that.setData({
              showMoneyBox: true,
              showAreaBox: false,
              showInfo: that.data.cwzj
            })
            break;
          case '5':
            that.setData({
              showMoneyBox: true,
              showAreaBox: false,
              showInfo: that.data.pccx
            })
            break;
          case '6':
            that.setData({
              showMoneyBox: true,
              showAreaBox: false,
              showInfo: that.data.eswp
            })
            break;
          case '7':
            that.setData({
              showMoneyBox: true,
              showAreaBox: false,
              showInfo: that.data.jyfd
            })
            break;
          case '8':
            that.setData({
              showMoneyBox: true,
              showAreaBox: false,
              showInfo: that.data.zhxx
            })
            break;
        }
        if (res.data.piclist != null && res.data.piclist !=""){
          console.log(res.data.piclist);
          if (res.data.piclist.length >= 9) {
            that.setData({
              uploadPicBtn: false
            })
          }
        }
      },
    ),

    
    )     
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  
  // 选择照片
  chooseImage: function () {
    var that = this;
    var tempCount = 8 - (that.data.imageList.length + that.data.piclist.length);
    if (tempCount < 1) {
      that.setData({
        uploadPicBtn: false
      })
    }
    wx.chooseImage({
      count: tempCount,
      sizeType: 'compressed',
      success: function (res) {
        console.log(res);
        console.log(tempCount);
        var tempImageList = that.data.imageList.concat(res.tempFilePaths);
        pic = 1;
        that.setData({
          imageList: tempImageList
        })
      }
    })
  },
  //预览照片
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  // 删除未上传图片
  delPic: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.data.imageList.splice(index, 1);
    that.setData({
      imageList: that.data.imageList,
      uploadPicBtn: true
    });

  },
  // 删除已上传照片
  del: function (e) {
    console.log(e.currentTarget.dataset.id);
    var that = this;
    wx.showModal({
      title: '删除图片',
      content: '确定删除该图片？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.smxwtc.club/?notice-delpic.htm',
            data: {
              "session_id": app.globalData.session_id,
              'id': e.currentTarget.dataset.id
            },
            method: 'POST',
            success: function (res) {
              var index = e.currentTarget.dataset.index;
              that.data.piclist.splice(index, 1);
              that.setData({
                piclist: that.data.piclist
              });
              if (that.data.piclist.length < 9) {
                that.setData({
                  uploadPicBtn: true
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //获取位置
  goMap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          address: res.address,
          lat: res.latitude,
          lng: res.longitude
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  //表单提交
  formSubmit: function (e) {
    console.log(e.detail.value);//---------测试用
    var that = this;
    tid = that.data.cartid;
    aid = that.data.areaid;
    dd = e.detail.value.dd;
    area = e.detail.value.area;
    money = e.detail.value.money;
    descript = e.detail.value.descript;
    phone = e.detail.value.phone;
    that.cartS();


  },
  //类目判断
  cartS: function () {
    var that = this;
    if (tid != '') {
      that.a();
    } else {
      wx.showToast({
        title: '请选择分类',
        icon: 'loading',
        duration: 1000
      })
    }

  },
  // 地区判断
  a: function () {
    var that = this;
    if (aid != '') {
      that.b();
    } else {
      wx.showToast({
        title: '请选择地区',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // area判断
  b: function () {
    var that = this;
    if (area != '') {
      that.c();
    } else {
      wx.showToast({
        title: '请填写' + that.data.showInfo.area,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // money判断
  c: function () {
    var that = this;
    if (money != '') {
      that.d();
    } else {
      wx.showToast({
        title: '请填写' + that.data.showInfo.money,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // descript判断
  d: function () {
    var that = this;
    if (descript != '') {
      that.e();
    } else {
      wx.showToast({
        title: '请填写' + that.data.showInfo.descript,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // 地址判断
  e: function () {
    var that = this;
    if (location != '') {
      that.f();
    } else {
      wx.showToast({
        title: '请选择地址',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // phone判断
  f: function () {
    var that = this;
    if (phone != '') {
      that.upload();
    } else {                                                                                        
      wx.showToast({
        title: '请填写' + that.data.showInfo.phone,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  upload: function () {
    var that = this;
    console.log(that.data);
    
    request.editNotice(
      {
        "session_id": app.globalData.session_id,
        'area': area,
        'money': money,
        'descript': descript,
        'phone': phone,
        'dd':dd,
        'tid': that.data.cartid,
        'aid': that.data.areaid,
        'address': that.data.address,
        'lat': that.data.lat,
        'lng': that.data.lng,
        'id': that.data.optionsId
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
          })
        } else if (pic == 1) {
          var i = 0;
          for (i; i < this.data.imageList.length; i++) {
            request.addNoticePic(
              {
                "id": res.data.lastid,
              }, that.data.imageList[i],
              (res) => {
                console.log(res);
                if (res.data.status == "error") {
                  wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                    success: function (res) {
                    }
                  })
                }
              },
            )
          }
          if (i = this.data.imageList.length) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 800,
              complete: setTimeout(function () {
                console.log(that.data);
           
                wx.navigateTo({
                  url: '../detail/detail?id=' + tid + "&aid=" + aid
                })
              }, 800)
            })
          }
        } else if (pic == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 800,
            complete: setTimeout(function () {
              wx.navigateTo({
                url: '../detail/detail?id=' + tid + "&aid=" + aid
              })
            }, 800)
          })
        }
      },
    )
  },

})