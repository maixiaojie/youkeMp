<template>
    <div>
        <view @click="search" >
            <van-search :value="value" :disabled="true" placeholder="请输入搜索关键词" />
        </view>
        <div class="header_container">
            <div class="item" v-for="(item , index) in items" :key="item.name" span="4" @click="toCourseList(item)">
                <Item :txt="item.name" :path="item.iconPath" />
            </div>
        </div>
        <div class="divide"></div>
        <div class="list">
            <ul>
                <li v-for="(item,index) in courseList" @click="toVideoDetail(item.id)" :key="item.id">
                    <CourseItem :txt="item.course_name" :path="item.img" :time="item.learning_time" />
                </li>
            </ul>
        </div>
        
    </div>
</template>
<script>
import Item from '@/components/item'
import CourseItem from '@/components/course_item'
import globalStore from '../../store/globalStore';
export default {
    data() {
        return {
            value: '',
            items: [
                {
                    name: '前端',
                    type: 'web',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                },{
                    name: 'python',
                    type: 'python',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                },{
                    name: 'PHP',
                    type: 'php',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                },{
                    name: 'iOS',
                    type: 'ios',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                },{
                    name: '安卓',
                    type: 'andriod',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                },{
                    name: '产品经理',
                    type: 'pm',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                },{
                    name: '网络运营',
                    type: 'op',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                },{
                    name: '物联网',
                    type: 'iot',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                },{
                    name: 'UI设计',
                    type: 'ui',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                },{
                    name: '全部',
                    type: 'all',
                    iconPath: 'https://img2.sycdn.imooc.com/545861f00001be3402200220-100-100.jpg'
                }
            ],
            courseList: [{"id":229,"course_name":"Javascript基础入门","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2017/04/JavaScript_jichurumen.png","learning_time":"预计学习时长：4天","ctime":"2018-03-09T10:03:42.000Z"},{"id":230,"course_name":"Web前端开发之Ajax初步","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2015/07/1.4Web前端开发之Ajax初步_dzETH8z.jpg","learning_time":"预计学习时长：7天","ctime":"2018-03-09T10:03:42.000Z"},{"id":233,"course_name":"前端开发项目：一起来做秒杀活动","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2015/07/2.1前端开发项目--一起来做秒杀活动.jpg","learning_time":"预计学习时长：7天","ctime":"2018-03-09T10:03:42.000Z"},{"id":304,"course_name":"bootstrap入门","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2017/04/Bootstrap.png","learning_time":"预计学习时长：7天","ctime":"2018-03-09T10:03:42.000Z"},{"id":421,"course_name":"HTML+CSS基础入门","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2017/04/HTMLCSS.png","learning_time":"预计学习时长：7天","ctime":"2018-03-09T10:03:42.000Z"},{"id":489,"course_name":"高级工程师手把手带你做企业门户前端","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2015/07/2.2手把手带你_做企业门户前端.jpg","learning_time":"预计学习时长：7天","ctime":"2018-03-09T10:03:42.000Z"},{"id":497,"course_name":"less从入门到精通 ","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2017/04/Less.png","learning_time":"预计学习时长：7天","ctime":"2018-03-09T10:03:42.000Z"},{"id":507,"course_name":"Backbone入门基础","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2015/07/2.4Backbone入门基础-.jpg","learning_time":"预计学习时长：7天","ctime":"2018-03-09T10:03:42.000Z"},{"id":513,"course_name":"移动前端开发项目","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2015/08/移动前段实训课程.jpg","learning_time":"预计学习时长：7天","ctime":"2018-03-09T10:03:42.000Z"},{"id":519,"course_name":"麦子商城项目制作","course_type_name":"web","img":"http://m.maiziedu.com/uploads/course/2015/08/麦子商城.jpg","learning_time":"预计学习时长：7天","ctime":"2018-03-09T10:03:42.000Z"}]
        }
    },
    components: {
        Item,
        CourseItem
    },
    computed: {
        statusBarHeight() {
            return globalStore.state.statusBarHeight;
        },
        titleBarHeight() {
            return globalStore.state.titleBarHeight;
        }
    },
    methods: {
        toVideoDetail(id) {
            wx.navigateTo({
                url: '/pages/video_detail/main?videoid='+id
            })
        },
        toCourseList(item) {
            wx.navigateTo({
                url: '/pages/video_list/main?type='+item.type
            })
        },
        search() {
            wx.redirectTo({
                url: '/pages/search/main?from=/pages/video/main'
            })
        },
        getVal() {

        }
    },
    onUnload() {
        console.log('onUnload');
        Object.assign(this, this.$options.data())
    },
    // 上拉加载
    onReachBottom: function () {
    //执行上拉执行的功能
        console.log(1)
    },
    // 停止下拉刷新
    async onPullDownRefresh() {
        // to doing..
        // 停止下拉刷新
        console.log(this.statusBarHeight)
        wx.showLoading({
            title: '玩命加载中',
        })
        wx.hideLoading();
        wx.stopPullDownRefresh();
    },
    created() {
        
    }
}
</script>
<style>
page {
  height: 100%;
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
}
.list ul {
    padding: 10px;
}
.list ul li {
    padding: 8px 4px;
}
</style>
