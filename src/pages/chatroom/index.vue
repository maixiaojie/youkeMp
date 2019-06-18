<template>
  <div class="chatroom" >
    <van-notify id="custom-selector"/>
    <div class="online">
      <div class="icon-list" >
          <image v-for="item in iconList" :key="item" :src="item"></image>
      </div>
    </div>
    <div class="main" id="main">
      <scroll-view scroll-y :style="{height: scrollHeight + 'rpx'}" :scroll-top="scrollTop">
        <div class="row" v-for="item in msgList" :key="item.id" :class="item.userid === userid ? 'self': ''">       
          <div v-if="item.type === 'notice'" class="notice">
            <text >{{item.msg}} </text>
          </div>
          <div v-if="item.type === 'msg'" class="left">
            <image :src="item.avator"></image>
          </div>
          <div v-if="item.type === 'msg'" class="right">
            <div class="name" v-if="item.userid !== userid">{{item.name}}</div>
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
import IO from 'socket.io-mp-client';
import Notify from "../../../static/vant/notify/notify";
let socketIO = null;
let socket = null;
export default {
  data() {
    return {
      value: '',
      totalNumber: '',  
      scrollTop: 0,
      iconList: [],
      msgList: [{
        id: 1,
        type: 'msg',
        name: '麦晓杰',
        userid: '2',
        avator: 'https://wx.qlogo.cn/mmopen/vi_32/ibMCdSmwTBqiaY9fIIWsHibkDR7If4kZIh0oaia3tUTHdaPtIE6O2T9q8Jibwn2hzJDb8APBvDXiaBsjWpNCJlPoMLDA/132',
        msg: '哈哈哈，还可以吧？'
      },{
        id: 2,
        type: 'msg',
        name: 'tracy',
        userid: '3',
        avator: 'https://wx.qlogo.cn/mmopen/vi_32/0iaGqqJtNGrpssrNkuAmwfvZUSyC80EHhR1NKWK0g53iaQ6yMuUqic2ic81KJaw596DRuHjovqU38FLjBHcUzatdibA/132',
        msg: '可以可以 666'
      },{
        id: 3,
        type: 'msg',
        name: 'tracy',
        userid: '3',
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
    Notify
  },
  watch: {
    'msgList.length'() {
      this.scrollTop = this.msgList.length * 150; 
    }
  },
  computed: {
    userinfo() {
      return wx.getStorageSync("userInfo")
    },
    userid() {
      return wx.getStorageSync("userid")
    },
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
      var that = this;
      var data = {
        id: Math.random(),
        type: 'msg',
        name: that.userinfo.nickName,
        userid: that.userid,
        avatar: that.userinfo.avatarUrl,
        msg
      }
      socketIO.emit('msg', data);
      that.scrollTop = that.msgList.length * 150; 
    },
    confirm() {
      var msg = this.value;
      if(msg.length > 0) {
        this.sendMsg(msg);
        this.value = '';
      }
    },
    setTitle(total) {
      wx.setNavigationBarTitle({
        title: `聊天室(共${total}人)`
      })
    }
    
  },
  
  mounted() {
    console.log('mounted');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  onLoad() {
    console.log('show');
    var that = this;
    // var socketUrl = 'ws://localhost:7777';
    var socketUrl = 'wss://api.mcust.cn';
    socket = IO(socketUrl, {
      reconnectionDelayMax: 2000
    });
    socketIO = socket;
    
    
    socket.on('connect', () => {
      console.log(`socket 连接成功`)
      var data = {
        userid: that.userid,
        username: that.userinfo.nickName,
        avatar: that.userinfo.avatarUrl
      }
      socket.emit('login', data);
      Notify({
          text: "您已成功进入聊天室",
          duration: 1000,
          selector: "#custom-selector",
          backgroundColor: "#1989fa"
        });
    })
    socket.on('connect_error', d =>{
      console.log(`socket 连接失败`)
    })
    socket.on('connect_timeout', d =>{
      console.log(`socket 连接超时`)
    })
    socket.on('disconnect', d =>{
      console.log(`socket 连接断开`)
    })
    socket.on('error', d =>{
      console.log(`socket 连接错误`)
    })
    socket.on('msgs', data => {
      console.log(data);
      that.msgList.push({
        id: Math.random(),
        type: 'msg',
        msg: data.msg,
        userid: data.userid,
        avator: data.avatar
      })
    })
    socket.on('leaveroom', data => {
      that.totalNumber = data.total;
      that.setTitle(that.totalNumber);
      let hasCurrentUser = data.userList.some(item => item.userid === that.userid);
      if(hasCurrentUser) {
        that.iconList = data.userList.map( item => item.avatar);
      }else {
        that.iconList = data.userList.map( item => item.avatar);
        that.iconList.unshift(that.userinfo.avatarUrl)
      }
      if(data.leaveUser !== null) {
        that.msgList.push({
          id: Math.random(),
          type: 'notice',
          msg: `${data.leaveUser.username} 离开了房间`
        })
      }
    })
    socket.on('total', data => {
      that.totalNumber = data.total;
      that.setTitle(that.totalNumber);
      let hasCurrentUser = data.userList.some(item => item.userid === that.userid);
      if(hasCurrentUser) {
        that.iconList = data.userList.map( item => item.avatar);
      }else {
        that.iconList = data.userList.map( item => item.avatar);
        that.iconList.unshift(that.userinfo.avatarUrl)
      }
      if(data.newUser !== null) {
        that.msgList.push({
          id: Math.random(),
          type: 'notice',
          msg: `欢迎 ${data.newUser.username} 加入`
        })
      }
    })
  },
  onHide() {
  },
  onUnload() {
    console.log('onUnload');
    socketIO.close();
    Object.assign(this, this.$options.data())
  }
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
