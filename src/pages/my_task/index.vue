<template>
  <div class="tasks">
    <van-notify id="custom-selector"/>
    <van-notify id="van-notify"/>
    <van-tabs type="card" sticky swipeable animated color="#2db7f5" @change="taskTabChange">
      <van-tab title="我的任务">
        <view class="task-row van-hairline--bottom"  v-for="item in taskList" :key="item.id">
          <view class="task-icon">
            <image :src="item.icon" />
          </view>
          <view class="task-info">
            <view class="task-title">{{item.title}}</view>
            <view class="task-content">{{item.content}}</view>
          </view>
          <view class="task-btn">
            <van-button plain hairline type="danger" size="mini" @click="deleteOne(item)">删除</van-button>
          </view>
        </view>
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
      taskList: []
    };
  },
  components: {
    Notify
  },
  watch: {
    "taskList.length"(val) {
      if (val == 0) {
        this.nodata = true;
      } else {
        this.nodata = false;
      }
    }
  },
  computed: {},
  methods: {
    async deleteOne(item) {
      let uid = wx.getStorageSync("userid");
      let tid = item.id;
      let data = await this.$net.get(`${this.$api.taskDelete}?uid=${uid}&tid=${tid}`, {});
      if(data && data.code == 1) {
        this.taskList = this.taskList.filter(e => e.id != item.id);
        Notify({
          text: "任务 " + item.title + " 删除成功",
          duration: 1000,
          selector: "#custom-selector",
          backgroundColor: "#1989fa"
        });
      }else {
        Notify('删除失败')
      }
      
    },
    onChangeTitle(e) {
      this.task.title = e.mp.detail;
    },
    onChangeContent(e) {
      this.task.content = e.mp.detail;
    },
    taskTabChange(e) {
      var index = e.mp.detail.index;
      if(index == 0) {
        this.getData();
      }
    },
    async getData() {
      let uid = wx.getStorageSync("userid");
      let data = await this.$net.get(`${this.$api.taskList}?uid=${uid}`, {});
      if(data && data.code == 1) {
        this.taskList = data.data;
        if(this.taskList.length == 0) {
          this.nodata = true;
        }else {
          this.nodata = false;
        }
      }
    },
    async saveData() {
      let uid = wx.getStorageSync("userid");
      if(this.task.title == '') {
        Notify('任务主题不能为空哦')
        return false;
      }else if(this.task.content == '') {
        Notify('任务描述不能为空哦')
        return false;
      }
      this.task.uid = uid;
      let data = await this.$net.post(this.$api.taskAdd, this.task);
      if(data && data.code == 1) {
        Notify({
          text: "任务创建成功",
          duration: 1000,
          selector: "#custom-selector",
          backgroundColor: "#1989fa"
        });
        this.task.title = '';
        this.task.content = '';
      }else {
        Notify('创建失败，请重试')
      }
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
  mounted() {
    this.getData();
  },
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
.tasks .task-row {
  display: flex;
  padding:30rpx 0;
  justify-items: center;
}
.tasks .task-row .task-icon {
  width: 80rpx;
}
.tasks .task-row .task-icon image {
  width: 70rpx;
  height: 70rpx;
  max-width: 100%;
}
.tasks .task-row .task-btn {

}
.tasks .task-row .task-info {
  flex: 1;
  padding: 0 20rpx;
}
.tasks .task-row .task-info .task-title {
  font-size: 32rpx;
  color:#333;
  font-weight: 600;
}
.tasks .task-row .task-info .task-content {
  font-size: 26rpx;
  padding-top: 10rpx;
  color:#333;
}
</style>
