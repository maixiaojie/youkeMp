<template>
  <div class="tasks">
    <van-notify id="custom-selector"/>
    <van-notify id="van-notify"/>
    <van-tabs type="card" sticky swipeable animated color="#2db7f5">
      <van-tab title="我的任务">
        <i-card
          v-for="item in taskList"
          extra="额外内容"
          :key="item.taskId"
          :title="item.title"
          :full="true"
        >
          <view slot="content">{{item.content}}</view>
          <view slot="footer">
            <van-button plain hairline type="danger" size="mini" @click="deleteOne(item)">删除</van-button>
          </view>
        </i-card>
        <view class="nodata" v-show="nodata">没有任务了，请去添加任务</view>
      </van-tab>
      <van-tab title="添加任务">
        <van-cell-group>
          <van-field
            class="fieldClass"
            :value="task.title"
            clearable
            required
            label="任务主题"
            placeholder="请输入任务主题"
            border="false"
            @change="onChangeTitle"
          />
          <van-field
            class="fieldClass"
            :value="task.content"
            clearable
            required
            label="任务描述"
            placeholder="请输入任务描述"
            border="false"
            @change="onChangeContent"
          />
          <van-field
            class="fieldClass"
            value="从下图中选择你喜欢的图标"
            disabled
            label="任务图标"
            border="false"
          />
          <view class="icon_container">
            <van-row>
              <van-col span="3" v-for="item in icons.row1" :key="item.src">
                <image :src="item.src" :class="item.selected ? 'selected': ''" @click="toggleIcon(item)"></image>
              </van-col>
            </van-row>
          </view>
          <van-button class="fieldClass" plain hairline type="primary" @click="saveData">保存</van-button>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import globalStore from "../../store/globalStore";
import Notify from "../../../static/vant/notify/notify";
export default {
  data() {
    return {
      nodata: false,
      task: {
        title: '',
        content: '',
        icon: '/static/task/task_8.png'
      },
      icons: {
        row1: [{
          src:  '/static/task/task_1.png',
          selected: false,
        },{
          src:  '/static/task/task_2.png',
          selected: false,
        },{
          src:  '/static/task/task_3.png',
          selected: false,
        },{
          src:  '/static/task/task_4.png',
          selected: false,
        },{
          src:  '/static/task/task_5.png',
          selected: false,
        },{
          src:  '/static/task/task_6.png',
          selected: false,
        },{
          src:  '/static/task/task_7.png',
          selected: false,
        },{
          src:  '/static/task/task_8.png',
          selected: true,
        }]
      },
      taskList: [
        {
          taskId: 1,
          title: "跑步30分钟",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_4.png"
        },
        {
          taskId: 2,
          title: "喝水8L",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_4.png"
        },
        {
          taskId: 3,
          title: "拒绝夜宵，拒绝加餐",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_4.png"
        },
        {
          taskId: 4,
          title: "散步半小时以上",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_4.png"
        },
        {
          taskId: 5,
          title: "学习英语半个小时",
          content: "每天要坚持..",
          isFinished: false,
          icon: "/static/task/task_4.png"
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
    Notify
  },
  watch: {
    "taskList.length"(val) {
      console.log(val);
      if (val == 0) {
        this.nodata = true;
      } else {
        this.nodata = false;
      }
    }
  },
  computed: {},
  methods: {
    deleteOne(item) {
      this.taskList = this.taskList.filter(e => e.taskId != item.taskId);
      Notify({
        text: "任务 " + item.taskId + " 删除成功",
        duration: 1000,
        selector: "#custom-selector",
        backgroundColor: "#1989fa"
      });
    },
    onChangeTitle(e) {
      this.task.title = e.mp.detail;
    },
    onChangeContent(e) {
      this.task.content = e.mp.detail;
    },
    saveData() {
      if(this.task.title == '') {
        Notify('任务主题不能为空哦')
        return false;
      }else if(this.task.content == '') {
        Notify('任务描述不能为空哦')
        return false;
      }
      console.log(this.task)
    },
    toggleIcon(item) {
      this.task.icon = item.src;
      if(item.selected) {
        this.icons.row1 = this.icons.row1.map(e => {
          // e.selected = false;
          return e;
        })
      }else {
        this.icons.row1 = this.icons.row1.map(e => {
          if(e.src == item.src) {
            e.selected = true;   
          }else {
            e.selected = false;
          }
          return e;
        })
      }
    }
  },
  mounted() {},
  created() {}
};
</script>
<style>
.tasks ._i-card {
  margin-top: 20px;
  float: left;
  width: 100%;
}
.tasks .nodata {
  font-size: 28rpx;
  padding: 28rpx 0;
  text-align: center;
}
.fieldClass {
  margin-top:20px;
  float:left;
  width:100%;
}
.tasks .fieldClass .van-button--normal {
  width: 100%;
}
.tasks .icon_container image{
  max-width: 100%;
  min-width: 100%;
  text-align: center;
  width: 40px;
  height: 40px;
}
.tasks .icon_container image.selected{
  border:1px solid #f44;
  box-sizing:border-box;
  border-radius: 5px;
}
</style>
