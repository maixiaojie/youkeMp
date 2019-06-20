<template>
  <div class="card_record" >
    <div class="header">
      <div class="left"><span class="day">{{day}}</span><span class="divide">/</span><span class="month">{{month}}</span></div>
      <div class="center">共有 <span>{{total}}</span> 条数据</div>
      <div class="right">
        <div v-if="todayHasCarded">已签到</div>
        <div v-if="!todayHasCarded" @click="toCard">签到</div>
      </div>
    </div>
    <div class="list_container">
      <div class="list" v-for="item in list" :key="item.title">
        <view class="top">
          <view class="avatar"><image :src="item.avatar_url"></image></view>
          <view class="info">
            <view class="nickname">{{item.nick_name}}</view>
            <view class="time">{{ item.ctime }}</view>
          </view>
        </view>
        <p class="content">{{item.content}}</p>
        <!-- <p class="title">- {{item.title}} -</p> -->
      </div>
      <div class="list" v-if="list.length == 0">
        <p class="title">- 咦~ 出问题啦？下拉刷新试试！！ -</p>
      </div>
    </div>
    <Skeletons :completed="completed" />
  </div>
  
</template>
<script>
import globalStore from "../../store/globalStore";
import common from '../../utils/index';
import Skeletons from "@/components/skeletons"
export default {
  data() {
    return {
      day: '',
      month: '',
      total: 0,
      pageNum: 1,
      pageSize: 10,
      list: [],
      completed: false
    };
  },
  components: {
    Skeletons
  },
  watch: {
    
  },
  computed: {
    todayHasCarded() {
      return globalStore.state.todayHasCards;
    }
  },
  methods: {
    toCard() {
      let userid = wx.getStorageSync("userid");
      if(userid == '') {
        wx.showToast({
          title: "登录后在进行该操作",
          icon: "none"
        });
      }else {
        wx.navigateTo({
          url: "/pages/card/main"
        });
      }
    },
    async getData() {
      let userid = wx.getStorageSync("userid");
      let page = this.pageNum;
      let size = this.pageSize;
      let data = await this.$net.get(`${this.$api.cardList}/${page}/${size}`, {});
      this.completed = true;
      if(data && data.code == 1) {
        let list = data.data
        list = list.map(function(item) {
          item.ctime = new Date(item.ctime).toLocaleString();
          return item;
        })
        if(list.length == 0) {
          wx.showToast({
            title: "没有更多数据了",
            icon: "none"
          })
        }
        this.list = this.list.concat(list);
        this.total = data.total[0].total;
      }
    }
  },
  onShow() {
    var date = new Date();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.list = [];
    this.pageNum = 1;
    this.completed = false;
    this.getData();
  },
  onUnload() {
    console.log('onUnload');
    Object.assign(this, this.$options.data())
  },
  created() {},
  async onPullDownRefresh() {
    // to doing..
    // 停止下拉刷新
    this.pageNum = 1;
    this.list = [];
    await this.getData();
    wx.stopPullDownRefresh();
  },
  // 上拉加载，拉到底部触发
  onReachBottom() {
    // 到这底部在这里需要做什么事情
    this.pageNum++;
    this.getData();
  }
};
</script>
<style>
.card_record {
  /* margin: 30rpx 30rpx; */
  /* background: #EEECED;   */
}
.card_record .header {
  min-height: 150rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.card_record .header .left {
  flex: 1;
  padding: 0 30rpx;  
}
.card_record .header .center {
  flex: 1;
  font-size: 28rpx;
  text-align: center;
}
.card_record .header .center span {
  font-size: 40rpx;
}
.card_record .header .left span.day {
  font-size: 44rpx;
}
.card_record .header .left span.divide {
  font-size: 30rpx;
  padding: 0 10rpx;
}
.card_record .header .left span.month {
  font-size: 30rpx;
}
.card_record .header .right {
  flex: 1;
  text-align: right;
  padding: 0 30rpx;
  font-size: 28rpx;
}
.card_record .list_container {
  padding-bottom: 30rpx;
}
.card_record .list_container .list {
  font-size: 40rpx;
  width: 100%;
  box-sizing: border-box;
  margin: 30rpx 0 30rpx 0;
  padding: 30rpx;
  background: #FEFEFE;
  color: #3C3C3C;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
}
.card_record .list_container .list .title {
  text-align: center;
  font-size: 22rpx;
}
.card_record .list_container .list .top {
  display: flex;
}
.card_record .list_container .list .content {
  font-size: 32rpx;
  padding-top: 20rpx;
}
.card_record .list_container .list .top .avatar {
  width: 60rpx;
}
.card_record .list_container .list .top .avatar image {
  max-width: 100%;
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
}
.card_record .list_container .list .top .info {
  flex:1;
}
.card_record .list_container .list .top .info .nickname {
  font-size: 28rpx;
  font-weight: 500;
}
.card_record .list_container .list .top .info .time {
  font-size: 24rpx;
}
</style>
