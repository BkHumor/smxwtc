var app = getApp();

Page({
    data: {
        dataList: []
    },
    onLoad: function () {
    },
    onShow: function () {
        if (!app.data.rankLoaded) {//未加载数据则加载
            this.get_rank_list();
        }
    },
    onPullDownRefresh: function () { //下拉刷新
        wx.stopPullDownRefresh();
        this.get_rank_list();
    },
    get_rank_list: function(){
        var that = this;
        // app.checkSession();
        // var openid = wx.getStorageSync('openid');
        wx.showNavigationBarLoading();
        wx.request({
            url: 'https://www.smxwtc.club/user-rank.htm',
            data:{
                type : 'rank',
                session_id: app.globalData.session_id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            complete: function () {
                wx.hideNavigationBarLoading();
            },
            success: function (res) {
                that.setData({
                    dataList: res.data.list
                });
                app.data.rankLoaded = true;//加载完成
            },
            fail: function (res) {
                app.showInfo(res.errMsg);
            }
        });
    },
    onShareAppMessage: function () {
        return {
            title: 'Ser友排行榜',
            desc: '三门峡名人榜',
            path: '/pages/rank/rank'
        }
    }
})
