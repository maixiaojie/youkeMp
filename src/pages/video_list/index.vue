<template>
    <div class="course_list" style="height:100%;">
        <view class="custom flex_center"  :style="{'padding-top': statusBarHeight + 'px'}">
            <view class="search">
                <input placeholder="搜索视频、文章" disabled @click="toSearch" />
            </view>
        </view>
        <view class="empty_custom" :style="{'padding-top': statusBarHeight + 'px'}"></view>
        <van-tabs :active="currentTab" @change="onChange" style="position:fixed;z-index:2;width:100%;" color="#1296db" sticky animated swipeable>
            <van-tab v-for="(item, i) in items" :key="i" :title="item.name">
            </van-tab>
        </van-tabs>
        <div class="tab-content">
            <div class="list">
                <ul>
                    <li v-for="(item,index) in course" @click="toVideoDetail(item.id)" :key="item.id">
                        <CourseItem :txt="item.course_name" :path="item.img" :time="item.learning_time" />
                    </li>
                </ul>
            </div>
        </div>
        <!-- <scroll-view scroll-x="true" class="tab-h" :scroll-left="scrollLeft">
            <view class="tab-item"  v-for="(item, index) in items" :class="[currentTab == index ? 'active': '']" :data-current="index" :key="index" @tap="swichNav">{{item.name}}</view>
        </scroll-view> -->
        <!-- <swiper class="tab-content"  :current="currentTab" duration="300" @change="switchTab" :style="{height: winHeight + 'px'}"> -->
        <!-- <swiper class="tab-content"  :current="currentTab" duration="300" @change="switchTab" style="height:100%;">
            <swiper-item v-for="(item, i) in items"  :key="i">
                <scroll-view scroll-y="true" :scroll-top="scrollTop" class="scroll-h" style="display:inline-block;">
                    <div class="list">
                        <ul>
                            <li v-for="(item,index) in course[i]" @click="toVideoDetail(item.id)" :key="item.id">
                                <CourseItem :txt="item.course_name" :path="item.img" :time="item.learning_time" />
                            </li>
                        </ul>
                    </div>
                </scroll-view>
            </swiper-item>
        </swiper>         -->
    <Skeletons :completed="completed" />
    </div>
</template>
<script>
import util from '@/utils/index.js'
import CourseItem from '@/components/course_item'
import globalStore from '../../store/globalStore';
import Skeletons from "@/components/skeletons-video-list"
export default {
    data() {
        return {
            statusBarHeight: 20,
            currentTab: 0,
            pagenum: 1,
            pagesize: 10,
            completed: false,
            items: [
                {
                    name: '全部',
                    type: 'all',
                    index: 0
                },{
                    name: '前端',
                    type: 'web',
                    index: 1
                },{
                    name: 'python',
                    type: 'python',
                    index: 2
                },{
                    name: 'PHP',
                    type: 'php',
                    index: 3
                },{
                    name: 'iOS',
                    type: 'ios',
                    index: 4
                },{
                    name: '安卓',
                    type: 'android',
                    index: 5
                },{
                    name: '产品经理',
                    type: 'pm',
                    index: 6
                },{
                    name: '运维',
                    type: 'oam',
                    index: 7
                },{
                    name: '网络运营',
                    type: 'op',
                    index: 8
                },{
                    name: '物联网',
                    type: 'iot',
                    index: 9
                },{
                    name: '嵌入式',
                    type: 'qrsqd',
                    index: 10
                },{
                    name: 'UI设计',
                    type: 'ui',
                    index: 11
                },{
                    name: '平面设计',
                    type: 'gd',
                    index: 12
                }
            ],
            course: [
            ]
        }
    },
    components: {
        CourseItem,
        Skeletons
    },
    computed: {
    },
    methods: {
        toVideoDetail(id) {
            wx.navigateTo({
                url: '/pages/video_detail/main?videoid='+id
            })
        },
        toSearch() {
            wx.navigateTo({
                url: '/pages/search/main?from=/pages/video_list/main'
            })
        },
        onChange(e) {
            var index = e.target.index
            this.currentTab = index
            this.pagenum = 1
            this.course = [];
            this.loadData(this.items[index])
        },
        swichNav(e) {
            var cur = e.target.dataset.current
            this.pagenum = 1
            if(this.currentTab == cur) {
                return false
            }else {
                this.currentTab = cur
            }
        },
        switchTab(e) {
            var index = e.target.current
            this.currentTab = index
            this.pagenum = 1
            this.scrollLeft = 33 * index
            this.scrollTop = 0
            this.loadData(this.items[index])
        },
        async loadData(data) {
            var pagesize = this.pagesize, pagenum = this.pagenum;
            let rs = await this.$net.get(this.$api.courseList+`${pagenum}/${pagesize}?type=${data.type}`, {});
            this.course = this.course.concat(rs.data);
            this.completed = true;
            if(rs.data.length == 0) {
                wx.showToast({
                    title: '暂无更多数据',
                    icon: 'none'
                })
            }
            // if(type == 'loadmore') {
            //     this.$set(this.course, data.index, this.course[data.index].concat(rs.data))
            //     if(rs.data.length == 0) {
            //         wx.showToast({
            //             title: '暂无更多数据',
            //             icon: 'none'
            //         })
            //     }
            // }else {
            //     this.course
            //     this.$set(this.course, data.index, rs.data)
            //     if(rs.data.length == 0) {
            //         wx.showToast({
            //             title: '暂无数据',
            //             icon: 'none'
            //         })
            //     }
            // }
        }
    },
    onLoad() {
        this.statusBarHeight = globalStore.state.statusBarHeight;
        this.completed = false;
    },
    onUnload() {
        console.log('onUnload');
        Object.assign(this, this.$options.data())
    },
    mounted() {
        let type = 'all'
        let currentData = this.items.filter((item) => {
            return item.type == type;
        });
        this.currentTab = currentData[0].index;
        this.loadData(currentData[0])
    },
    // 上拉加载
    onReachBottom: function () {
    //执行上拉执行的功能
        this.pagenum++;
        this.loadData(this.items[this.currentTab]);
    },
    created() {
        
    }
}
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
.header_container {
    margin: 20rpx;
    width: calc(100% - 40rpx);
}
.item {
    width: 20%;
    float: left;
}
.divide {
    height: 10px;
    width: 100%;
    float: left;
    background: #f2f2f2;
}
.list {
    width: 100%;
    float: left;
    position:relative;
}
.list ul {
    padding: 10px;
}
.list ul li {
    padding: 8px 4px;
}
/**
.tab-h{height: 80rpx;width: 100%; box-sizing: border-box;overflow: hidden;line-height: 80rpx;background: #F7F7F7; font-size: 16px; white-space: nowrap;position: fixed;top: 0; left: 0; z-index: 99;}
.tab-item{margin:0 36rpx;display: inline-block;}
.tab-item.active{color: #4675F9;position: relative;}
.tab-item.active:after{ content: "";display: block;height: 8rpx;width: 52rpx;background: #4675F9;position: absolute; bottom: 0;left: 5rpx;border-radius: 16rpx;}
.tab-content{margin-top: 80rpx;}
.scroll-h{height: 100%;position: relative;top: 0;}
swiper-item {
    height: calc(100% - 80rpx);
}
**/
.tab-content {
    width: 100%;
    float: left;
    margin-top: 44px;
}
.van-tab {
    font-size: 28rpx !important;
    /* color:black !important; */
}
.van-tab--active {
    font-size: 32rpx !important;
}
</style>
