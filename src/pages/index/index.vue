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
      <i-grid-item>
      <i-grid-icon>
              <image src="/static/images/匿名吐槽.png" />
          </i-grid-icon>
          <i-grid-label>匿名吐槽</i-grid-label>
      </i-grid-item>
      <i-grid-item>
      <i-grid-icon>
              <image src="/static/images/日报.png" />
          </i-grid-icon>
          <i-grid-label>悠客日报</i-grid-label>
      </i-grid-item>      
    </i-grid>
    <i-grid>
      <i-grid-item>
        <i-grid-icon>
              <image src="/static/images/专栏.png" />
          </i-grid-icon>
          <i-grid-label>大佬专栏</i-grid-label>
      </i-grid-item>
      <i-grid-item>
      <i-grid-icon>
              <image src="/static/images/我想聊聊.png" />
          </i-grid-icon>
          <i-grid-label>我想聊聊</i-grid-label>
      </i-grid-item>
      <i-grid-item>
      <i-grid-icon>
              <image src="/static/images/优惠券.png" />
          </i-grid-icon>
          <i-grid-label>优惠券</i-grid-label>
      </i-grid-item>      
    </i-grid>

    <!-- <van-panel title="悠客日报">
        <p class="daily-title">[2019-2-30] 20190230技术日报总结 </p>
    </van-panel>-->
    <!-- <van-panel title="热门视频">
        <p class="video-card" v-for="(item,index) in hotCourseList" @click="toVideoDetail(item.id)" :key="item.id">
            <CourseItem :txt="item.course_name" :path="item.img" :time="item.learning_time" />
        </p>
    </van-panel>-->
    <!-- <h1 class="pan-header">热门视频</h1>
    <scroll-view scroll-x="true" style="white-space:nowrap; width:100%">
      <p
        class="video-card"
        :style="{width: (windowWidth - 50) + 'px', height: '100px'}"
        v-for="(item,index) in hotCourseList"
        @click="toVideoDetail(item.id)"
        :key="item.id"
      >
        <CourseItem :txt="item.course_name" :path="item.img" :time="item.learning_time"/>
      </p>
    </scroll-view>
    <h1 class="pan-header">推荐视频</h1>
    <scroll-view scroll-x="true" style="white-space:nowrap; width:100%">
      <p
        class="video-card"
        :style="{width: (windowWidth - 50) + 'px', height: '100px'}"
        v-for="(item,index) in commendCourseList"
        @click="toVideoDetail(item.id)"
        :key="item.id"
      >
        <CourseItem :txt="item.course_name" :path="item.img" :time="item.learning_time"/>
      </p>
    </scroll-view>
    <van-panel title="热门文章">
      <p v-for="item in hotArticleList" class="daily-title" :key="item.id">
        <ArticleItem :txt="item.title"/>
      </p>
    </van-panel> -->
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
      <view v-for="(item, index) in taskList" :key="item.taskId" style="margin-top: 20rpx;">
        <view v-if="!item.isFinished"> 
          <uniSwipeAction :options="options" :datas="item" @click="finish(index)">
        </uniSwipeAction>
        </view>
        
        <view class="row" v-if="item.isFinished">
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
      options: [
        {
          text: "完成任务"
        }
      ],
      carded: false,
      cardNumber: 400,
      seriesCardNumber: 300,
      taskList: [
        {
          taskId: 1,
          title: "跑步30分钟",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_1.png"
        },
        {
          taskId: 2,
          title: "喝水8L",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_5.png"
        },
        {
          taskId: 3,
          title: "拒绝夜宵，拒绝加餐",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_6.png"
        },
        {
          taskId: 4,
          title: "散步半小时以上",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_7.png"
        },
        {
          taskId: 5,
          title: "学习英语半个小时",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_8.png"
        },
        {
          taskId: 6,
          title: "看书一个小时",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_4.png"
        }
      ]
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
        return item.isFinished == true;
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
    finish(index) {
      var row = this.taskList[index];
      setInterval(function() {
        row.isFinished = true;
      }, 350);
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
      let userid = wx.getStorageSync("userid");
      if(userid !== '') {
        let status = await this.$net.get(this.$api.cardStatus+'?uid='+userid, {});
        console.log(status)
        if(status && status.code == 1 && status.data == null) {
          // 未打卡
          globalStore.commit('setTodayNoCards');
        }else {
          // 今已打卡
          globalStore.commit('setTodayHasCards');
        }
      }
      // let list = await this.$net.get(this.$api.hotVideo, {});
      // let course = list.data;
      // this.hotCourseList = course;
      // this.commendCourseList = course.concat().reverse();

      // let article = await this.$net.get(
      //   `${this.$api.articleList}1/5?type=web`,
      //   {}
      // );
      // console.log(article);
      // this.hotArticleList = article.data;
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
  mounted() {
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
