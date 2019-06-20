<template>
    <div class="article_detail">
      <div class="header">
        <div class="title" v-text="title"></div>
        <div class="info">
          <span v-text="tag"></span><span class="divide">·</span>
          <span v-text="time"></span>
        </div>
      </div>
      <div class="content">
        <wxParse :content="content" @preview="preview" @navigate="navigate" />
      </div>
      <div class="toback" @click="toback">返回</div>
      <GoTop />      
    </div>
    
</template>
<script>
import util from "@/utils/index.js";
import wxParse from "mpvue-wxparse";
import GoTop from "@/components/go_top"
export default {
  data() {
    return {
      content: "加载中...",
      title: "",
      time: "",
      tag: "",
      id: ""
    };
  },
  components: {
    wxParse,
    GoTop
  },
  methods: {
    toback() {
      wx.switchTab({
        url: "/pages/article/main"
      })
    },
    async getData(id) {
      let data = await this.$net.get(`${this.$api.articleDetail}${id}`, {});
      this.content = data.data.content;
      this.title = data.data.title;
      this.id = data.data.id;
      this.tag = data.data.f_type;
      this.time = data.data.time;
      wx.setStorageSync("article_title", this.title);
      // wx.setNavigationBarTitle({
      //   title: this.title
      // });
    },
    preview(src, e) {
      console.log(src);
    },
    navigate(href, e) {
      console.log(href);
    }
  },
  mounted() {
    let option = util.getQuery();
    this.getData(option.articleid);
  },
  created() {},
  onUnload() {
    console.log('onUnload');
    Object.assign(this, this.$options.data())
  },
  onShareAppMessage: (res) => {
        let title = wx.getStorageSync("article_title");
        if (res.from === 'button') {
        console.log("来自页面内转发按钮");
        console.log(res.target);
        }
        else {
        console.log("来自右上角转发菜单")
        }
        return {
            title: '我正在悠客社区查看《'+title+'》',
            path: '',
            // imageUrl: "/images/1.jpg",
            success: (res) => {
                console.log("转发成功", res);
            },
            fail: (res) => {
                console.log("转发失败", res);
            }
        }
    }
};
</script>
<style>
@import url("~mpvue-wxparse/src/wxParse.css");
.article_detail .header {
  float: left;
  width: 100%;
}
.article_detail .content {
  float: left;
  width: 100%;
  overflow: hidden;
}
.article_detail {
  padding: 20rpx;
  box-sizing: border-box;
}
.article_detail .title {
  width: 100%;
  float: left;
  margin-top: 20rpx;
  font-size: 34rpx;
}
.article_detail .info {
  font-size: 24rpx;
  float: left;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0 15px 0;
  color: #333;
  border-bottom: 1rpx solid #f2f2f2;
}
.article_detail .info .divide {
  vertical-align: middle;
  margin-left: 5rpx;
  margin-right: 5rpx;
}
.article_detail .article-ad-text {
  display: none;
}
.article_detail .toback {
  position: absolute;
  bottom:60rpx;
  right:60rpx;
  padding: 10rpx;
  font-size: 30rpx;
  background: #ff1;

}
</style>
