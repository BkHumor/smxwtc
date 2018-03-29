var app = getApp();
var request = require('../../utils/request.js');
Page({
    data: {
        dataList: []
    },
    onLoad: function () {
    },
    onShow: function () {
       this.get_rank_list();
    },
    onPullDownRefresh: function () { //下拉刷新
        wx.stopPullDownRefresh();
        this.get_rank_list();
    },
    get_rank_list: function(){
        var that = this;
        //请求
        request.getUserRank(
        {},
        (res)=>{

        }
        );
    },
    onShareAppMessage: function () {
        return {
            title: 'M友排行',
            desc: '三门峡名人榜',
            path: '/pages/rank/rank'
        }
    }
})
