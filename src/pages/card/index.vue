<template>
  <div class="card">
    <van-notify id="custom-selector"/>
    <van-notify id="van-notify"/>
        <van-cell-group>
          <view class="fieldClass cardInfo">
            今天已有 <span class="cardNumber">{{cardTotal}}</span> 人签到，去 <span class="cardSquare">签到广场</span> 看看。
          </view>
          <van-field
            class="fieldClass"
            :value="card.title"
            clearable
            required
            label="签到主题"
            placeholder="请输入签到主题"
            border="false"
            @change="onChangeTitle"
          />
          <van-field
            class="fieldClass"
            :value="card.content"
            clearable
            required
            label="签到内容"
            placeholder="请输入签到内容"
            border="false"
            @change="onChangeContent"
          />
          <van-field
            class="fieldClass"
            value=" "
            disabled
            required
            use-button-slot
            label="开放到广场"
            border="false">
            <view slot="button">
              <van-switch  :checked="card.open" @change="toggleStatus" />
            </view>
          
          </van-field>
          <van-button class="fieldClass" plain hairline type="primary" @click="saveData">保存</van-button>
        </van-cell-group>
  </div>
</template>
<script>
import globalStore from "../../store/globalStore";
import Notify from "../../../static/vant/notify/notify";
export default {
  data() {
    return {
      nodata: false,
      cardTotal: 0,
      card: {
        title: '',
        content: '',
        open: true
      },
      
    };
  },
  components: {
    Notify
  },
  watch: {
    
  },
  computed: {},
  methods: {
    toggleStatus(e) {
      this.card.open = e.mp.detail;
    },
    onChangeTitle(e) {
      this.card.title = e.mp.detail;
    },
    onChangeContent(e) {
      this.card.content = e.mp.detail;
    },
    async     saveData() {
      if(this.card.title == '') {
        Notify('签到主题不能为空哦')
        return false;
      }else if(this.card.content == '') {
        Notify('签到内容不能为空哦')
        return false;
      }
      let card = JSON.parse(JSON.stringify(this.card));
      card.open = card.open ? '1' : '0';
      card.uid = wx.getStorageSync("userid");
      let data = await this.$net.post(this.$api.card, card);
      if(data && data.code == 1) {
        globalStore.commit('setTodayHasCards');
        wx.showToast({
          title: "签到成功",
          icon: "success"
        });
        setTimeout(function() {
          wx.navigateBack()
        }, 1500);
        
      }
      
    },
    async getTotalCardNumber() {
      let status = await this.$net.get(this.$api.cardTodayTotal, {});
      this.cardTotal = status.data[0].cardTotal || 0;
    }
  },
  mounted() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    this.card.title = year + '年' + month + '月' + day + '日 签到'
    this.getTotalCardNumber();
  },
  created() {}
};
</script>
<style>
.card ._i-card {
  margin-top: 20px;
  float: left;
  width: 100%;
}
.card .nodata {
  font-size: 28rpx;
  padding: 28rpx 0;
  text-align: center;
}
.fieldClass {
  margin-top:20px;
  float:left;
  width:100%;
}
.card .fieldClass .van-button--normal {
  width:96%;
  margin:0 2%;
}
.card .icon_container image{
  max-width: 100%;
  min-width: 100%;
  text-align: center;
  width: 40px;
  height: 40px;
}
.card .icon_container image.selected{
  border:1px solid #f44;
  box-sizing:border-box;
  border-radius: 5px;
}
.card .cardInfo {
  padding: 30rpx 20rpx;
  font-size: 30rpx;
  /* text-align: center; */
}
.card .cardSquare {
  color: #1989fa;
  text-decoration: underline;
}
.card .cardNumber {
  color: #07c160;
}
</style>
