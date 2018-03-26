
//获取应用实例
var request = require('../../utils/request.js');
var app = getApp();
var that;
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
    optionId = options.moodId;

  },
  onReady: function () {
    wx.hideToast()

  },
  onShow: function () {



  },


  changeLike: function (event) {//点赞
    var isLike = that.data.agree
    var likeNum = parseInt(this.data.agreeNum)
    if (isLike == "0") {
      likeNum = likeNum + 1;
      that.setData({
        agree: 1,
        agreeNum: likeNum
      })

    }
    else if (isLike == "1") {

      likeNum = likeNum - 1;
      that.setData({
        agree: 0,
        agreeNum: likeNum
      })
    }
    wx.getStorage({
      key: 'user_id',
      success: function (ress) {
        var Diary = Bmob.Object.extend("Diary");
        var queryLike = new Bmob.Query(Diary);
        queryLike.equalTo("objectId", optionId);
        queryLike.find({
          success: function (result) {
            var likerArray = result[0].get("liker");
            var isLiked = false;
            if (likerArray.length > 0) {
              for (var i = 0; i < likerArray.length; i++) {
                if (likerArray[i] == ress.data) {
                  likerArray.splice(i, 1);
                  isLiked = true;
                  result[0].set('likeNum', result[0].get("likeNum") - 1);
                  break;
                }
              }
              if (isLiked == false) {

                likerArray.push(ress.data);
                result[0].set('likeNum', result[0].get("likeNum") + 1);
              }
            }
            else {
              likerArray.push(ress.data);
              result[0].set('likeNum', result[0].get("likeNum") + 1);
            }
            result[0].save();
          },
          error: function (error) {

          }
        });
      }
    })



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
  toResponse: function (event) {//去回复
    var commentId = event.target.dataset.id;
    var userId = event.target.dataset.uid;
    var name = event.target.dataset.name;
    if (!name) {
      name = "";
    }
    if (userId == wx.getStorageSync('user_id')) {
      common.dataLoading("不能对自己的评论进行回复", "loading");
    }
    else {
      var toggleResponse;
      if (that.data.isToResponse == "true") {
        toggleResponse = false;
      }
      else {
        toggleResponse = true;
      }
      that.setData({
        pid: commentId,
        isToResponse: toggleResponse,
        plaContent: "回复" + name + ":",
        resopneName: name
      })
    }

  },
  hiddenResponse: function () {
    this.setData({
      isToResponse: false
    })
  },
  deleteThis: function () {//删除心情
    wx.showModal({
      title: '是否删除该心情？',
      content: '删除后将不能恢复',
      showCancel: true,
      confirmColor: "#a07c52",
      cancelColor: "#646464",
      success: function (res) {
        if (res.confirm) {
          // 删除此心情后返回上一页
          var Diary = Bmob.Object.extend("Diary");
          var queryDiary = new Bmob.Query(Diary);
          queryDiary.get(optionId, {
            success: function (result) {
              result.destroy({
                success: function (myObject) {
                  // 删除成功
                  common.dataLoading("删除成功", "success", function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  });
                },
                error: function (myObject, error) {
                  // 删除失败
                  console.log(error)
                  // common.dataLoading(error,"loading");
                }
              });
            },
            error: function (object, error) {

            }
          });

        }
        else {
        }
      }
    })
  },
  publicThis: function () {//修改心情公开
    var isp = this.data.isPublic;
    var title, content, modifyMood;
    var hide;
    if (isp == true) {
      title = "退回心情";
      content = "确定要将该心情退回吗？（退回的心情将在信箱模块消失，不再显示）";
      hide = "0";

    }
    else {
      title = "邮寄心情";
      content = "确定要将该心情邮寄出去吗？（邮寄出去的心情将在信箱模块显示，任何人都可看到）";
      hide = "1";
    }
    modifyMood = function () {
      var Diary = Bmob.Object.extend("Diary");
      var query = new Bmob.Query(Diary);
      // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
      query.get(optionId, {
        success: function (mood) {
          // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
          mood.set('is_hide', hide);
          mood.save();

        },
        error: function (object, error) {

        }
      });
    }
    wx.showModal({//模态窗口显示隐藏切换
      title: title,
      content: content,
      showCancel: true,
      confirmColor: "#a07c52",
      cancelColor: "#646464",
      success: function (res) {
        if (res.confirm) {
          modifyMood();
          that.setData({
            isPublic: !isp
          })
        }

      }
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
