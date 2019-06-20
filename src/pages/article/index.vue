<template>
  <div>
    <!-- <view class="section">            
            <view class="picker">
                <picker
                    @change="bindPickerChange"
                    :value="typeIndex"
                    :range="typeArray"
                >
                    <view class="picker">
                    <i-icon type="other" size="30" color="#80848f" />{{typeArray[typeIndex]}}
                    </view>
                </picker>
            </view>
            <view class="blank"></view>
            <view class="search" @click="toSearch">
                <i-icon type="search" size="30" color="#80848f" />
            </view>
    </view>-->
    <!-- <van-search :value="value" placeholder="请输入搜索关键词" />
        <div class="header_container">
            <div class="item" v-for="(item , index) in items" :key="item.name" span="4">
                <Item :txt="item.name" :path="item.iconPath" />
            </div>
    </div>-->
    <!-- <div class="divide"></div>
        <div class="list">
            <ul>
                <li v-for="(item,index) in articleList" :key="item.id" @click="toDetail(item)">
                    <ArticleItem :txt="item.title" :time="item.time" :tag="item.s_type" />
                </li>
            </ul>
    </div>-->
    <view class="custom flex_center" :style="{'padding-top': statusBarHeight + 'px'}">
      <view class="search">
        <input placeholder="搜索视频、文章" disabled @click="toSearch">
      </view>
    </view>
    <view class="empty_custom" :style="{'padding-top': statusBarHeight + 'px'}"></view>
    <van-tabs type="line" sticky swipeable animated color="#2db7f5" style="position:fixed;z-index:2;width:100%;" @change="typeChange">
      <van-tab :title="item" :key="i" v-for="(item, i) in typeArray">
        <!-- <div class="list">
          <ul>
            <li v-for="(item,index) in articleList" :key="item.id" @click="toDetail(item)">
              <ArticleItem :txt="item.title" :time="item.time" :tag="item.s_type"/>
            </li>
          </ul>
        </div>-->
        <!-- <Nodata></Nodata> -->
      </van-tab>
    </van-tabs>
    <div class="tab-content">
      <div class="list">
        <ul>
          <li v-for="(item,index) in articleList" @click="toDetail(item)" :key="item.id">
            <ArticleItem :txt="item.title" :time="item.time" :tag="item.s_type"/>
          </li>
        </ul>
      </div>
    </div>
    <GoTop/>
    <Skeletons :completed="completed" />
  </div>
</template>
<script>
import Item from "@/components/item";
import globalStore from '../../store/globalStore';
import ArticleItem from "@/components/article_item";
import GoTop from "@/components/go_top";
import Nodata from "@/components/no_data";
import Skeletons from "@/components/skeletons-article-list"
export default {
  data() {
    return {
      value: "",
      statusBarHeight: 20,
      items: [
        {
          name: "前端",
          iconPath:
            "https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg"
        }
      ],
      articleList: [],
      typeIndex: 0,
      typeArray: ["前端", "Java", "Python", "php", "服务器", "c/c++", "c#"],
      types: ["web", "java", "python", "php", "server", "cplusplus", "csharp"],
      pageNum: 1,
      pageSize: 10,
      completed: false
    };
  },
  computed: {
    statusBarHeight() {
      return globalStore.state.statusBarHeight;
    }
  },
  components: {
    ArticleItem,
    Item,
    GoTop,
    Nodata,
    Skeletons
  },
  mounted() {
    
  },
  onLoad() {
    this.completed = false;
    this.getData();
  },
  onUnload() {
    console.log('onUnload');
    Object.assign(this, this.$options.data())
  },
  methods: {
    async getData() {
      let pageNum = this.pageNum;
      let pageSize = this.pageSize;
      let type = this.types[this.typeIndex];
      let list = await this.$net.get(
        `${this.$api.articleList}${pageNum}/${pageSize}?type=${type}`,
        {}
      );
      let arr = list.data;
      this.completed = true;
      this.articleList = this.articleList.concat(arr);
      // console.log(this.articleList[0])
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main?from=/pages/video_list/main"
      });
    },
    toDetail(item) {
      console.log(item);
      wx.redirectTo({
        url: "/pages/article_detail/main?articleid=" + item.id
      });
    },
    typeChange(e) {
      var currentIndex = e.mp.detail.index;
      this.typeIndex = currentIndex;
      this.pageNum = 1;
      this.articleList = [];
      this.getData();
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        });
      }
    },
    bindPickerChange(e) {
      this.typeIndex = e.target.value;
      this.pageNum = 1;
      this.articleList = [];
      this.getData();
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        });
      }
    }
  },
  async onPullDownRefresh() {
    // to doing..
    // 停止下拉刷新
    this.pageNum = 1;
    this.articleList = [];
    this.getData();
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
page {
  height: 100%;
}
.custom{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 45px;
  background: white;
  z-index: 999;
  display:flex;
}
.custom .search {
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0 30rpx;
    width: 450rpx;

}
.custom .search input {
    width: 100%;
    border:1px solid #ddd;
    border-radius:20px;
    height: 30px;
    line-height: 30px;
    text-align:center;
    font-size:28rpx;
}
.empty_custom{
  height: 45px;
  width: 100%;
}
.tab-content {
    width: 100%;
    float: left;
    margin-top: 44px;
}
.header_container {
  margin: 20rpx;
  width: calc(100% - 40rpx);
}
.section {
  box-sizing: border-box;
  padding: 0rpx 20rpx;
  position: fixed;
  width: 100%;
  background: #fff;
  border-bottom: 1rpx solid #f2f2f2;
  font-size: 34rpx;
  color: black;
  height: 90rpx;
  line-height: 90rpx;
  display: flex;
}
.section .picker picker {
  padding: 0 30rpx 0 10rpx;
}
.section .blank {
  flex: 1;
}
.section .search {
  padding: 0 10rpx 0 30rpx;
}
.item {
  width: 20%;
  float: left;
}
.divide {
  height: 10px;
  margin-top: 90rpx;
  width: 100%;
  float: left;
  background: #f2f2f2;
}
.list {
  width: 100%;
  float: left;
}
.list ul {
  padding: 10px;
}
.list ul li {
  padding: 8px 4px;
}
</style>
