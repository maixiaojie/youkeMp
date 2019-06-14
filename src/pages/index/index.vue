<template>
  <div class="index">
    <i-notice-bar icon="systemprompt" loop>悠客社区今日正式与大家见面了，希望你们在这能有所收获，成为你想成为的人！</i-notice-bar>
    <swiper
      class="swiper"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <view v-for="item in imgUrls" :key="item" @click="bannerClick(item)">
        <swiper-item>
          <image :src="item" class="slide-image" width="355" height="150"></image>
        </swiper-item>
      </view>
    </swiper>
    <i-grid>
      <i-grid-item @click="toCardSquare">
        <i-grid-icon>
              <image src="/static/images/card.png" />
          </i-grid-icon>
          <i-grid-label>签到广场</i-grid-label>
      </i-grid-item>
      <!-- <i-grid-item>
        <i-grid-icon>
              <image src="/static/images/tucao.png" />
          </i-grid-icon>
          <i-grid-label>匿名吐槽</i-grid-label>
      </i-grid-item> -->
      <i-grid-item @click="toZL">
        <i-grid-icon>
              <image src="/static/images/zl.png" />
          </i-grid-icon>
          <i-grid-label>大佬专栏</i-grid-label>
      </i-grid-item>
      <i-grid-item @click="toZL">
        <i-grid-icon>
            <image src="/static/images/ribao.png" />
          </i-grid-icon>
          <i-grid-label>悠客日报</i-grid-label>
      </i-grid-item>      
    </i-grid>
    <!-- <i-grid>
      
      <i-grid-item>
        <i-grid-icon>
              <image src="/static/images/chat.png" />
          </i-grid-icon>
          <i-grid-label>我想聊聊</i-grid-label>
      </i-grid-item>
      <i-grid-item>
        <i-grid-icon>
          </i-grid-icon>
          <i-grid-label> &nbsp;</i-grid-label>
      </i-grid-item> 
      <i-grid-item>
        <i-grid-icon>
          </i-grid-icon>
          <i-grid-label> &nbsp;</i-grid-label>
      </i-grid-item>   
      <i-grid-item>
        <i-grid-icon>
              <image src="/static/images/youhui.png" />
          </i-grid-icon>
          <i-grid-label>优惠券</i-grid-label>
      </i-grid-item>      
    </i-grid> -->

    <view class="task">
      <view class="left">
        <image src="/static/task/task_title.png"></image>
      </view>
      <view class="right">已完成 {{finishedTaskNumber}} / {{taskNumber}}</view>
      <view class="bg">
        <view class="completed" :style="{width: processWidth+'rpx'}"></view>
      </view>
      <view class="dailyCard">
        <view v-if="todayHasCarded">已签到</view>
        <view v-if="!todayHasCarded" @click="toCardPage">签到</view>
      </view>
    </view>
    
    <view class="task-list">
      <view v-show="noData" class="no-data">您还没有任务数据哦，去“我的”-“我的任务”中添加。</view>
      <view v-show="noLogin" class="no-login">您还没有登录哦，登录后可以管理您的每日任务。</view>
      <view v-for="(item, index) in taskList" :key="item.id" style="margin-top: 20rpx;">
        <view v-if="!item.completed"> 
          <uniSwipeAction :options="options" :datas="item" @click="finish(index, item)">
        </uniSwipeAction>
        </view>
        
        <view class="row" v-if="item.completed">
          <view class="left">
            <image :src="item.icon"></image>
          </view>
          <view class="center">
            <view class="title">{{item.title}}</view>
            <view class="info">{{item.content}}</view>
          </view>
          <view class="right">
            <image src="/static/task/task_completed.png"></image>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import CourseItem from "@/components/course_item";
import ArticleItem from "@/components/article_item";
import uniSwipeAction from "@/components/swipe-action.vue";
import globalStore from "../../store/globalStore";
export default {
  data() {
    return {
      imgUrls: [
        "https://zz.mcust.cn/public/banner/banner01.png",
        "https://zz.mcust.cn/public/banner/banner02.png"
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      hotCourseList: [],
      commendCourseList: [],
      hotArticleList: [],
      windowWidth: 0,
      noData: false,
      noLogin: true,
      options: [
        {
          text: "完成任务"
        }
      ],
      carded: false,
      cardNumber: 400,
      seriesCardNumber: 300,
      taskList: []
    };
  },
  components: {
    CourseItem,
    ArticleItem,
    uniSwipeAction
  },
  computed: {
    todayHasCarded() {
      return globalStore.state.todayHasCards;
    },
    scrollViewWidth() {
      return this.windowWidth * 5;
    },
    taskNumber() {
      return this.taskList.length;
    },
    finishedTaskNumber() {
      return this.taskList.filter(item => {
        return item.completed == 1;
      }).length;
    },
    processWidth() {
      return 150 * (this.finishedTaskNumber / this.taskNumber);
    }
  },
  methods: {
    toCardSquare() {
        wx.navigateTo({
          url: "/pages/card_square/main"
        });
    },
    toZL() {
        wx.showToast({
          title: "该功能需要联系管理员进行授权",
          icon: "none"
        });
    },
    async finish(index, item) {
      let userid = wx.getStorageSync("userid");
      let taskid = item.id;
      var row = this.taskList[index];
      setInterval(function() {
        row.completed = 1;
      }, 350);
      let res = await this.$net.get(this.$api.taskComplete+'?uid='+userid+'&tid='+taskid, {});
      if(res && res.code == 1) {
        console.log('任务完成')
      }
      
    },
    bannerClick(item) {
      let userid = wx.getStorageSync("userid");
      if (userid == "") {
        wx.showToast({
          title: "登录后在进行该操作",
          icon: "none"
        });
      } else {
        wx.showToast({
          title: "请联系管理员进行授权",
          icon: "none"
        });
      }
    },
    async getData() {
      this.taskList = [];
      let userid = wx.getStorageSync("userid");
      if(userid !== '') {
        this.noLogin = false;
        let status = await this.$net.get(this.$api.cardStatus+'?uid='+userid, {});
        if(status && status.code == 1 && status.data == null) {
          // 未打卡
          globalStore.commit('setTodayNoCards');
        }else {
          // 今已打卡
          globalStore.commit('setTodayHasCards');
        }
        let todoData = await this.$net.get(this.$api.taskTodo+'?uid='+userid, {});
        if(todoData && todoData.code == 1) {
          let tasklist = todoData.data;
          if(tasklist.length !== 0) {
            this.taskList = tasklist;
            this.noData = false;
          }
        }else {
          this.noData = true;
        }
        
      }else {
        // 未登录
        this.noData = false;
        this.noLogin = true;
        globalStore.commit('setTodayNoCards');
      }
    },
    toVideoDetail(id) {
      wx.navigateTo({
        url: "/pages/video_detail/main?videoid=" + id
      });
    },
    toCardPage() {
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
      
    }
  },
  onShow() {
    this.getData();
    this.windowWidth = globalStore.state.windowWidth;
  },
  created() {
    // let app = getApp()
  },
  onPullDownRefresh() {
    this.getData();
    wx.stopPullDownRefresh();
  }
};
</script>

<style>
.index .swiper {
  width: 100%;
}
.index .swiper image {
  width: 100%;
  height: 100%;
}
.index .daily-title {
  font-weight: 400;
  font-size: 34rpx;
  padding: 10px 15px;
}
.index .pan-header {
  font-size: 14px;
  color: #333;
  padding: 10px 15px;
  border-bottom: 1rpx solid #f2f2f2;
}
.index .video-card {
  padding: 10px 0px 10px 15px;
  box-sizing: border-box;
  display: inline-block;
}
.task {
  padding: 25rpx 20rpx;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.task .left {
  text-align: left;
  flex: 1;
  font-size: 16rpx;
  font-weight: bold;
  color: #fe765c;
}

.task .left image {
  width: 140rpx;
  height: 40rpx;
}

.task .right {
  color: #9a9a9a;
  font-size: 24rpx;
  padding-right: 10rpx;
}

.bg {
  width: 150rpx;
  height: 10px;
  background: #eaeaea;
  border-radius: 8px;
  position: relative;
}
.index .dailyCard {
  font-size: 28rpx;
  padding: 0 30rpx;
}
.completed {
  position: absolute;
  top: 0;
  left: 0;
  width: 0px;
  transition: all 1s;
  height: 10px;
  background: linear-gradient(to right, #74e934, #b2fd6f);
  border-radius: 8px;
}

.task-list {
  background: #f4f3f8;
  padding: 20rpx 20rpx 20rpx 20rpx;
}
.task-list .no-data, .task-list .no-login {
  font-size: 24rpx;
  padding: 30rpx 0;
  text-align: center;
  color: #333;
}
.task-list .row {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  padding: 30rpx;
  /* margin-top: 20upx; */
  border-radius: 8px;
  transition: all 500ms;
  box-shadow: 0 0 8px 0px #e1e1e3;
}

.task-list .row .left {
  width: 60rpx;
  height: 60rpx;
  background: #74e934;
  border-radius: 60rpx;
}

.task-list .row .left image {
  max-width: 60rpx;
  max-height: 60rpx;
}

.task-list .row .right image {
  max-width: 60rpx;
  max-height: 60rpx;
  background:white;
}

.task-list .row .center {
  flex: 1;
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.task-list .row .center .title {
  font-size: 28rpx;
  font-weight: bold;
}

.task-list .row .center .info {
  font-size: 24rpx;
  color: #9a9a9a;
}

.task-list .row .right {
  width: 60rpx;
  height: 60rpx;
  background: #74e934;
  border-radius: 60rpx;
}
</style>
