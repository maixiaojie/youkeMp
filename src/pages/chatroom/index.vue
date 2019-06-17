<template>
  <div class="chatroom" >
    <div class="online">
      <div class="icon-list" >
          <image v-for="item in iconList" :key="item" :src="item"></image>
      </div>
    </div>
    <div class="main" id="main">
      <scroll-view scroll-y :style="{height: scrollHeight + 'rpx'}" :scroll-top="scrollTop">
        <div class="row" v-for="item in msgList" :key="item.id" :class="item.uid === uid ? 'self': ''">       
          <div v-if="item.type === 'notice'" class="notice">
            <text >{{item.msg}} </text>
          </div>
          <div v-if="item.type === 'msg'" class="left">
            <image :src="item.avator"></image>
          </div>
          <div v-if="item.type === 'msg'" class="right">
            <div class="name" v-if="item.uid !== uid">{{item.name}}</div>
            <div class="msg"><text>{{item.msg}}</text></div>
          </div>
        </div>
      </scroll-view>
      
    </div>
    <div class="bottom">
      <div class="input_wrapper">
         <input  class="input" @input="input" @confirm="confirm" :value="value" :cursor-spacing="20" confirm-type="send" type="text" placeholder="说点什么吧" />
      </div>
      <!-- <div class="btn_wrapper">
        <button class="btn" @click="confirm">发送</button>
      </div> -->
      
    </div>
  </div>
  
</template>
<script>
import globalStore from "../../store/globalStore";
import common from '../../utils/index';
export default {
  data() {
    return {
      value: '',
      uid: '1',
      scrollTop: 0,
      iconList: [
        'https://wx.qlogo.cn/mmopen/vi_32/3RN2u2ibTcKuTfXV25iacOUAZUd5oicgEbgcrFEfPRvoAs0QCWpeHewiar2PhwPnib86skZEnJqFrNZOMRI9qI6gYQA/132',
        'https://wx.qlogo.cn/mmopen/vi_32/s2RzxMKd4Dpx9HXia06XOpG6BMBgaia4VsqlB81kJShdT5VSg6aTxiboOmZkVdJMq3vKkJYZiaqqmBMLBd2BHwljzQ/132',
        'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoR7KgIadPJLBPy3BHq4ibGGoojkloRSJsB56icLomh2oNd1meN60WsL6QW8gxt5yJ1Um503ibaSNQlA/132',
        'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ercpe2qSmAI4ERsHgfgFoWgcE7fIVVCTIeWHl9mvnknVua31JPogMS1vumQk8wTo3ltL4YpVicOo1A/132',
        'https://wx.qlogo.cn/mmopen/vi_32/ibMCdSmwTBqiaY9fIIWsHibkDR7If4kZIh0oaia3tUTHdaPtIE6O2T9q8Jibwn2hzJDb8APBvDXiaBsjWpNCJlPoMLDA/132',
        'https://wx.qlogo.cn/mmopen/vi_32/0iaGqqJtNGrpssrNkuAmwfvZUSyC80EHhR1NKWK0g53iaQ6yMuUqic2ic81KJaw596DRuHjovqU38FLjBHcUzatdibA/132'
      ],
      msgList: [{
        id: 1,
        type: 'msg',
        name: '麦晓杰',
        uid: '2',
        avator: 'https://wx.qlogo.cn/mmopen/vi_32/ibMCdSmwTBqiaY9fIIWsHibkDR7If4kZIh0oaia3tUTHdaPtIE6O2T9q8Jibwn2hzJDb8APBvDXiaBsjWpNCJlPoMLDA/132',
        msg: '哈哈哈，还可以吧？'
      },{
        id: 2,
        type: 'msg',
        name: 'tracy',
        uid: '3',
        avator: 'https://wx.qlogo.cn/mmopen/vi_32/0iaGqqJtNGrpssrNkuAmwfvZUSyC80EHhR1NKWK0g53iaQ6yMuUqic2ic81KJaw596DRuHjovqU38FLjBHcUzatdibA/132',
        msg: '可以可以 666'
      },{
        id: 3,
        type: 'msg',
        name: 'tracy',
        uid: '3',
        avator: 'https://wx.qlogo.cn/mmopen/vi_32/0iaGqqJtNGrpssrNkuAmwfvZUSyC80EHhR1NKWK0g53iaQ6yMuUqic2ic81KJaw596DRuHjovqU38FLjBHcUzatdibA/132',
        msg: '哈哈哈'
      },{
        id: 4,
        type: 'notice',
        msg: '欢迎 awalysu 加入...'
      }]
    };
  },
  components: {
  },
  watch: {
    'msgList.length'() {
      this.scrollTop = this.msgList.length * 150; 
    }
  },
  computed: {
    windowWidth() {
      return globalStore.state.windowWidth
    },
   scrollHeight() {
     return globalStore.state.windowHeight * (750 / this.windowWidth) - 120 - 100;
   }
  },
  methods: {
    input(e) {
      this.value = e.mp.detail.value;
    },
    sendMsg(msg) {
      var data = {
        id: Math.random(),
        type: 'msg',
        name: 'awalysu',
        uid: '1',
        avator: 'https://wx.qlogo.cn/mmopen/vi_32/3RN2u2ibTcKuTfXV25iacOUAZUd5oicgEbgcrFEfPRvoAs0QCWpeHewiar2PhwPnib86skZEnJqFrNZOMRI9qI6gYQA/132',
        msg
      }
      this.msgList.push(data);
      this.scrollTop = this.msgList.length * 150; 
    },
    confirm() {
      var msg = this.value;
      if(msg.length > 0) {
        this.sendMsg(msg);
        this.value = '';
      }
      
    }
    
  },
  onShow() {
    
  },
  created() {},
};
</script>
<style>
page {
  height: 100%;
}
.chatroom {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
}
.chatroom .online {
  height: 99rpx;
  z-index: 12;
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  background: #F5F5F5;
  box-sizing: border-box;
  border-bottom: 1rpx solid rgb(190, 186, 186);
}
.icon-list {
  padding:20rpx 50rpx;
  width:100%;
  height:100%;
  box-sizing: border-box;
}
.icon-list image {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  float: left;
  margin-left:-28rpx;
  border:1px solid white;
}
.chatroom .main {
  width: 100%;
  padding-top: 100rpx;
  padding-bottom: 120rpx;
  flex: 1;
  /* padding: 100rpx 0 120rpx 0; */
  background: #F5F5F5;
}
.chatroom .bottom {
  height: 119rpx;
  z-index: 12;
  left: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  border-top: 1rpx solid rgb(190, 186, 186);
  display: flex;
  align-items:center;
  background: #F5F5F5;
}
.input {
  height: 80rpx;
  background: #fff;
  border: 1rpx solid #F5F5F5;
  padding: 0 15rpx;
  font-size: 28rpx;
  border-radius: 5px;
}
.input_wrapper {
  flex: 1;
  box-sizing: border-box;
  padding: 20rpx 20rpx 20rpx 20rpx;
}
/* .btn_wrapper {
  width: 200rpx;
  padding: 20rpx 20rpx 20rpx 10rpx;
}
.btn {
  width: 200rpx;
  height: 80rpx;
  background: #fff;
  line-height: 80rpx;
  font-size: 30rpx;
  border:none;
} */
.chatroom .main .row {
  display: flex;
  padding: 20rpx;
  flex-direction: row;
  align-items: flex-start;
  /* align-content: flex-start; */
}
.chatroom .main .row.self {
  flex-direction: row-reverse;
}
.chatroom .main .row .notice {
  font-size: 24rpx;
  text-align: center;
  flex: 1;
  display: block;
}
.chatroom .main .row .notice text {
  background: #DADADA;
  color: #fff;
  padding: 8rpx 12rpx;
}
.chatroom .main .row.self .right {
  /* align-items: flex-start; */
  /* text-align: right; */
}
.chatroom .main .row.self .left {
   /* margin-top: -8rpx; */
}
.chatroom .main .row.self .right .msg text {
  float: right;
}
.chatroom .main .row .left {
  width: 80rpx;
  text-align: center; 
}
.chatroom .main .row .left image {
  width: 60rpx;
  height: 60rpx;
}
.chatroom .main .row .right {
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.chatroom .main .row .right .name {
  color: #DADADA;
  font-size: 24rpx;
  padding-bottom: 8rpx;
  box-sizing: border-box;
}
.chatroom .main .row .right .msg {
  color: #232323;
  font-size: 28rpx;
  box-sizing: border-box;
}
.chatroom .main .row .right .msg text {
  background: #fff;
  line-height: 40rpx;
  padding: 8rpx 12rpx;
  border-radius: 6rpx;
  max-width: 80%;
  display: inline-block;
}
</style>
