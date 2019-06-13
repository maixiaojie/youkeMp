<template>
    <div class="vedio_detail">
        <view class="videoWrapper section tc">
            <video 
                :src="src" 
                :danmu-list="danmu" 
                :danmu-btn="true" 
                :enable-danmu="true"  
                :autoplay="true"
                :title="videoTitle"
                controls></video>
        </view>
        <van-tabs class="" :sticky="true" :swipeable="true">
            <van-tab title="介绍">
                <div class="panel">
                    <h3 class="item" v-text="info.course_name"></h3>
                    <p class="item info"><span>播放次数：66</span></p>
                    <p class="item intro" v-text="info.course_introduce"></p>
                </div>
            </van-tab>
            <van-tab title="章节" >
                <i-cell-group>
                    <i-cell v-for="item in videoList"
                    @click="changeCurrentLesson(item)" 
                    :class="[activeLessonId == item.id ? 'active': '']"
                    :key="item.id" 
                    i-class="lessonList"
                    :title="item.lesson_name" 
                    :value="item.video_time"></i-cell>
                </i-cell-group>
            </van-tab>
            <van-tab title="评价">
                <i-cell-group>
                    <i-cell title="你觉得该课程如何？">
                        <i-rate 
                            size="32"
                            @change="rateChange" 
                            :value="rate">
                        </i-rate>
                    </i-cell>                   
                </i-cell-group>
            </van-tab>
        </van-tabs>
        <div class="bottom"></div>
        <div class="more">
            <div class="item1">
                <input type="text" class="commentInput" placeholder-class="input-placeholder" placeholder="输入评论..." confirm-type="send" :value="commentContent" name="" id="">
            </div>
            <div class="item2">
                <div class="collect" @tap="collection">
                    <span class="iconc">
                        <view :animation="collectionAnimationData"><i-icon :type="collectionIconType" size="14" :color="collectionFillColor" /></view>
                        <span class="count">12</span>
                    </span>
                </div>
                <div class="star" @tap="star">
                    <span class="iconc">
                        <view :animation="starAnimationData"><i-icon  :type="starIconType" size="14" :color="starFillColor" /></view>
                        <span class="count">12</span>
                    </span>
                </div>
                <div class="coment"><span><i-icon type="message" size="14" color="#80848f" /><span class="count">12</span></span></div>
            </div>

        </div>
    </div>
</template>
<script>
import util from '@/utils/index.js'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            active: 0,
            src: '',
            activeLessonId: '',
            rate: 0,
            info: {},
            videoList: [],
            commentContent: '',
            videoTitle: 'title',
            starAnimation: null,
            collectionAnimation: null,
            starAnimationData: null,
            collectionAnimationData: null,
            isStar: false,
            isCollection: false,
            // fillColor: '#80848f',
            // starType: 'praise',
            danmu:[
                {
                    text: '这个老师讲的真心不错',
                    color: '#ff0000',
                    time: 1
                },
                {
                    text: '关闭弹幕，认真学习了',
                    color: '#ff00ff',
                    time: 3
            }]
        }
        
    },
    computed: {
        starFillColor() {
            return this.isStar ? '#4675F9' : '#80848f'
        },
        collectionFillColor() {
            return this.isCollection ? '#4675F9' : '#80848f'
        },
        starIconType() {
            return this.isStar ? 'praise_fill' : 'praise'
        },
        collectionIconType() {
            return this.isCollection ? 'collection_fill' : 'collection'
        }
    },
    created() {
    },
    mounted() {
        let option = util.getQuery();
        this.getData(option);
    },
    methods: {
        async getData(option) {
            let rs = await this.$net.get(this.$api.corseDetail + option.videoid, {});
            var data = rs.data;
            this.info = data.courseIntroduceData[0];
            this.videoList = data.lessonData;
            this.src = util.videoUrlConvert(data.lessonData[0].video_url);
            this.activeLessonId = data.lessonData[0].id;
            this.videoTitle = data.lessonData[0].lesson_name
            wx.setStorageSync("video_title", info.course_name);
            // wx.setNavigationBarTitle({
            //     title: data.courseIntroduceData[0].course_name
            // });
        },
        rateChange(index) {
            this.rate = index.target.index;
        },
        changeCurrentLesson(item) {
           this.activeLessonId = item.id
           this.src = util.videoUrlConvert(item.video_url)
           this.videoTitle = item.lesson_name
        },
        setAnimation() {
            const animation = wx.createAnimation({
                timingFunction: 'ease-in-out'
            })
            this.starAnimation = animation
            this.collectionAnimation = animation
        },
        star() {
            var that = this;
            that.isStar = !that.isStar;
            that.starAnimation.scale(1.5).step()
            that.starAnimationData = that.starAnimation.export()

            setTimeout(()=> {
                that.starAnimation.scale(1).step()
                that.starAnimationData = that.starAnimation.export()
            }, 300)            
        },
        collection() {
            var that = this;
            that.isCollection = !that.isCollection;
            that.collectionAnimation.scale(1.5).step()
            that.collectionAnimationData = that.collectionAnimation.export()

            setTimeout(()=> {
                that.collectionAnimation.scale(1).step()
                that.collectionAnimationData = that.collectionAnimation.export()
            }, 300)   
        }
    },
    onLoad(options) {
        console.log(options)
        Object.assign(this.$data, this.$options.data())
        this.setAnimation()
    },
    onShareAppMessage: (res) => {
        console.log(res)
        let title = wx.getStorageSync("video_title");
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
}
</script>
<style>
.videoWrapper {
    width: 100%;
}
video {
    width: 100%;
}

.bottom {
    width: 100%;
    float: left;
    height: 45px;
}
.more {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background:white;
    border-top: 1px solid #f2f2f2;
    display: flex;
}
.more .item1 {
    flex: 4;
    display:flex;
    align-items:center;
    justify-content:center;
}
.commentInput {
    border:0;
    margin:0 10px;
    padding:0 0 0 10px;
    border-radius: 12px;
    height: 30px;
    resize: none;
    text-align: left;
    background: #f2f2f2;

}
.input-placeholder {
    font-size: 12px;
    text-align: center;
}
.more .item2 {
    flex: 3;
    font-size: 14px;
    color: #80848f;
    display: flex;
    justify-content:space-around;
    align-items:center;
}
.more .item2 .count {
    vertical-align:bottom;
}
.more .item2 .collect, .more .item2 .star, .more .item2 .coment {
    flex:1;
    align-items:center;
    justify-content:center;
    display: flex;
}
.more .item2 .star .iconc, .more .item2 .collect .iconc {
    display: flex;
    justify-content: center;
}
.panel .item {
    padding: 10px 15px;
}
.panel h3 {
    font-size: 16px;
    line-height: 20px;
    color: #333;
}
.panel .info {
    font-size: 13px;
    line-height: 14px;
    color: #666;
}
.panel p.intro  {
  font-size: 13px;
  color: #666;
  margin: 10px 8px !important;
  line-height: 20px;
  display: table;
  height: 1px;
}
.vedio_detail .active {
    color: #f44;
}
</style>

