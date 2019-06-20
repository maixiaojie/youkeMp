<template>
    <div>      
        <van-search class="search_wrap" :value="keyword" @search="onSearch" @clear="chearInput" @change="inputChange" :focus="inputFocus" placeholder="请输入搜索关键词" use-action-slot>
          <view slot="action" @tap="onSearch">搜索</view>
        </van-search>
        <div class="search-operate" v-show="!showResult">
          <van-panel class="pull-left w100">
            <view class="" slot="header">
              <p class="slotHeader">
                <span class="title">搜索历史</span>
                <span class="clear" @click="clearLocalHistory"><i-icon type="delete" size="18" color="#80848f" /></span>
              </p>            
            </view>
            <view class="h-container pull-left">
              <van-tag class="hotwordsSpan" @click="setKeyword(item)" size="large" v-for="item in searchHistoryWords" color="#7232dd" plain v-text="item" :key="item"></van-tag>
            </view>          
          </van-panel>
          <van-panel class="pull-left w100" title="热搜词">
            <view class="h-container pull-left">
              <van-tag class="hotwordsSpan" @click="setKeyword(item)" size="large" v-for="item in hotWords" color="#f2826a" plain v-text="item" :key="item"></van-tag>
            </view>
          </van-panel>
        </div>
        <div class="search-result" v-show="showResult">
            <van-tabs :active="activeTab" @change="tabChange" color="#1296db" animated swipeable>
              <van-tab title="文章">
                <scroll-view scroll-y="true" :enable-back-to-top="true" :style="{height: scrollViewHeight + 'px'}" @scrolltolower="articleScrollToLower">                  
                  <div class="list" v-show="!articleShowNoData">
                    <ul>
                        <li v-for="(item,index) in articleList" :key="item.id" @click="toDetail(item)">
                            <ArticleItem :txt="item.title" :time="item.time" :tag="item.s_type" />
                        </li>
                    </ul>
                  </div>
                  <div v-show="articleShowNoData">
                    <Nodata></Nodata>
                  </div>
                </scroll-view>
              </van-tab>
              <van-tab  title="视频">
                <scroll-view scroll-y="true" :enable-back-to-top="true" :style="{height: scrollViewHeight + 'px'}" @scrolltolower="courseScrollToLower">
                  <div class="list" v-show="!courseShowNoData">
                    <ul>
                        <li v-for="(item,index) in courseList" @click="toVideoDetail(item.id)" :key="item.id">
                            <CourseItem :txt="item.course_name" :path="item.img" :time="item.learning_time" />
                        </li>
                    </ul>
                  </div>
                  <div v-show="courseShowNoData">
                    <Nodata></Nodata>
                  </div>
                </scroll-view>
              </van-tab>
              
            </van-tabs>
        </div>
    </div>
</template>
<script>
import util from "@/utils/index.js";
import CourseItem from '@/components/course_item';
import ArticleItem from "@/components/article_item";
import globalStore from '../../store/globalStore';
import Nodata from '@/components/no_data'
export default {
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0,
      scrollViewHeight: 0,
      keyword: "",
      pageFrom: "",
      activeTab: 1,
      showResult: false,
      inputFocus: true,
      hotWords: [
        "面试",
        "前端",
        "python",
        "设计",
        "linux",
        "spring",
        "javascript",
        "react",
        "vue",
        "数据结构",
        "算法",        
        "安卓",
        "IOS",
        "大数据"
      ],
      historyWords: [],
      courseList: [],
      courseShowNoData: false,
      articleShowNoData: false,
      articleList: [],
      articlePage: {
        page: 1,
        size: 10
      },
      coursePage: {
        page: 1,
        size: 10
      }
    };
  },
  watch: {
    keyword(newVal) {
      if(newVal == '') {
        this.showResult = false
        this.articleList = []
        this.courseList = []
        this.articleShowNoData = false
        this.courseShowNoData = false
      }
    }
  },
  computed: {
    searchHistoryWords() {
      let len = 12
      if(this.historyWords.length >= len) {
        return this.historyWords.reverse().slice(0, len)
      }else {
        return this.historyWords.reverse()
      }
      
    }
  },
  components: {
    CourseItem,
    ArticleItem,
    Nodata
  },
  methods: {
    chearInput() {
      // this.inputFocus = false
    },
    onCancel() {
      wx.navigateBack({
        delta: 1
      });
    },
    toVideoDetail(id) {
      wx.navigateTo({
          url: '/pages/video_detail/main?videoid='+id
      })
    },
    toDetail(item) {
      wx.navigateTo({
        url: "/pages/article_detail/main?articleid=" + item.id
      });
    },
    tabChange() {

    },
    clearLocalHistory() {
      this.historyWords = [];
      wx.setStorageSync("historyWords", "");
    },
    inputChange(e) {
      this.keyword = e.mp.detail;
    },
    setKeyword(item) {
      var that = this
      this.inputFocus = false;
      setTimeout(function() {
        that.keyword = item;
        that.onSearch();
      }, 200)
      
    },
    async onSearch() {
      var keyword = this.keyword;
      console.log(this.keyword)
      let historyWords = wx.getStorageSync("historyWords");
      if (historyWords == "") {
        wx.setStorageSync("historyWords", [keyword]);
        this.historyWords = [keyword];
      } else {
        historyWords.push(keyword);
        let newArr = Array.from(new Set(historyWords));
        wx.setStorageSync("historyWords", newArr);
        this.historyWords = newArr;
      }
      this.showResult = true
      this.activeTab = 0
      this.articlePage.page = 1
      this.coursePage.page = 1
      this.searchArticle('search')
      this.searchCourse('search')
      this.postSearch()
    },
    async postSearch() {
      var data = {
        keyword: this.keyword,
        userid: wx.getStorageSync("userid") || "null"
      }
      let rs = await this.$net.get(`${this.$api.userSearchRecord}?keyword=${data.keyword}&userid=${data.userid}`, {});
    },
    articleScrollToLower() {
      this.articlePage.page++
      this.searchArticle('loadmore')
    },
    courseScrollToLower() {
      this.coursePage.page++
      this.searchCourse('loadmore')
    },
    async searchArticle(type) {
      let rs = await this.$net.get(`${this.$api.searchArticle}${this.articlePage.page}/${this.articlePage.size}?keyword=${this.keyword}`, {});
      this.articleList = this.articleList.concat(rs.data);
      if(type == 'search' && rs.data.length == 0) {
        this.articleShowNoData = true;
      }else if(type="loadmore" && rs.data.length == 0) {
        this.articleShowNoData = false;
        wx.showToast({
            title: '暂无更多数据',
            icon: 'none'
        })
      }else {
        this.articleShowNoData = false;
      }
    },
    async searchCourse(type) {
      let rs = await this.$net.get(`${this.$api.searchCourse}${this.coursePage.page}/${this.coursePage.size}?keyword=${this.keyword}`, {});
      this.courseList = this.courseList.concat(rs.data);
      if(type == 'search' && rs.data.length == 0) {
        this.courseShowNoData = true;
      }else if(type="loadmore" && rs.data.length == 0) {
        this.courseShowNoData = false;
        wx.showToast({
            title: '暂无更多数据',
            icon: 'none'
        })
      }else {
        this.courseShowNoData = false;
      }
    }
  },
  mounted() {
    let option = util.getQuery();
    this.pageFrom = option.from;
    console.log(option);
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.historyWords =
      wx.getStorageSync("historyWords") == ""
        ? []
        : wx.getStorageSync("historyWords");

    this.windowHeight = globalStore.state.windowHeight;
    this.windowWidth = globalStore.state.windowWidth;
    this.scrollViewHeight = this.windowHeight - this.windowWidth / 750 * (88 * 2) + 50
  },
  onUnload() {
    console.log('onUnload');
    Object.assign(this, this.$options.data())
  },
  created() {}
};
</script>
<style>
.pull-left {
  float: left;
}
.w100 {
  width: 100%;
}
.h-container {
  width: calc(100% - 30px);
  padding: 10px 15px;
}
.slotHeader {
  padding: 10px 15px;
  font-size: 14px;
  line-height: 24px;
  color: #333;
  background-color: #fff;
  box-sizing: border-box;
}
.slotHeader .clear {
  float: right;
}
.hotwordsSpan {
  float: left;
  margin: 13px 5px;
}
.list {
    width: 100%;
    float: left;
}
.search_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
}
.search-result , .search-operate{
  width: 100%;
  margin-top: 44px;
}
.list ul {
    padding: 10px;
}
.list ul li {
    padding: 8px 4px;
}
</style>
