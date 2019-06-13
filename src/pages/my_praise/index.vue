<template>
    <div class="my_collection">
      
      <van-tabs type="card" sticky swipeable animated color="#2db7f5">
      <van-tab title="视频">
        <!-- <div class="list">
          <ul>
            <li v-for="(item,index) in course" @click="toVideoDetail(item.id)" :key="item.id">
              <CourseItem :txt="item.course_name" :path="item.img" :time="item.learning_time" />
            </li>
          </ul>
        </div> -->
        <Nodata></Nodata>
      </van-tab>
      <van-tab title="文章">
        <Nodata></Nodata>
      </van-tab>
    </van-tabs>
      
    </div>
</template>
<script>
import CourseItem from '@/components/course_item'
import Nodata from '@/components/no_data'
export default {
  data() {
    return {
      isLogin: false,
      userInfo: wx.getStorageSync('userInfo'),
      course: []
    };
  },
  components: {
    CourseItem,
    Nodata
  },
  computed: {
  },
  methods: {
    async getData() {
      let list = await this.$net.get(this.$api.hotVideo, {});
      console.log(list);
      this.course = list.data;
    },
    toVideoDetail(id) {
        wx.navigateTo({
            url: '/pages/video_detail/main?videoid='+id
        })
    },
  },
  created() {
  }
};
</script>
<style>
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
