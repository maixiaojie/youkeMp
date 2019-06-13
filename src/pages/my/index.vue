<template>
    <div class="person">
      <div class="header" v-show="isLogin">
        <img :src="userInfo.avatarUrl" alt="">
        <p v-text="userInfo.nickName"></p>
      </div>
      <div class="header" v-show="!isLogin">
        <img src="/static/images/user.png" alt="">
        <p>未登录</p>
      </div>
      <i-cell-group>
        <i-cell title="签到记录" is-link url="/pages/my_card/main">
          <i-icon slot="icon" type="message" size="20" color="#80848f" />
        </i-cell>
        <i-cell title="我的任务" is-link url="/pages/my_task/main">
          <i-icon slot="icon" type="message" size="20" color="#80848f" />
        </i-cell>
        <i-cell title="我收藏的" is-link url="/pages/my_collection/main">
          <i-icon slot="icon" type="collection_fill" size="20" color="#80848f" />
        </i-cell>
        <i-cell title="我点赞的" is-link url="/pages/my_praise/main">
          <i-icon slot="icon" type="praise_fill" size="20" color="#80848f" />
        </i-cell>
        <i-cell title="我看过的" is-link url="/pages/my_look/main">
          <i-icon slot="icon" type="activity" size="20" color="#80848f" />
        </i-cell>
        <i-cell title="客服">
          <i-icon slot="icon" type="activity" size="20" color="#80848f" />
          <i-button slot="footer" inline type="Ghost" size="small" open-type="contact">客服</i-button>
        </i-cell>
      </i-cell-group>

      

      <div v-show="!isLogin">
          <i-button type="info" size="small" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">微信授权一键登录</i-button>
      </div>
      <div v-show="isLogin">
        <i-button  type="info" size="small" @click="logout">退出登录</i-button>
      </div>
      
    </div>
</template>
<script>
import globalStore from '../../store/globalStore';
export default {
  data() {
    return {
      isLogin: false,
      userInfo: {}
    }
  },
  computed: {
  },
  methods: {
    logout() {
      wx.setStorageSync("isLogin", false);
      wx.setStorageSync("userInfo", {});
      wx.setStorageSync("userid", '');
      this.isLogin = false;
      wx.reLaunch({
        url: '/pages/my/main',
      })
    },
    onGotUserInfo(e) {
      var that = this;
      wx.login({
        success(res) {
          let code = res.code;
          if (e.target.userInfo) {
            let postData = {
              code,
              encryptedData: e.target.encryptedData,
              iv: e.target.iv,
              signature: e.target.signature,
              rawData: e.target.rawData
            };
            wx.showLoading({
              title: '加载中'
            })
            wx.request({
              url: that.$api.login,
              data: postData,
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                wx.hideLoading()
                let json = res.data;
                if(json.code) {
                  //登录成功
                  try {
                    that.userInfo = e.target.userInfo;
                    that.isLogin = true;
                    wx.setStorageSync("isLogin", true);          
                    wx.setStorageSync("userInfo", e.target.userInfo);          
                    wx.setStorageSync("userid", json.data.userid);          
                    wx.reLaunch({
                      url: '/pages/my/main',
                      success(e) {
                        console.log(e)
                      }
                    })
                  } catch (e) {
                    console.log(e)
                  }
                }else {
                  //登录失败
                   wx.showToast({
                        title: '登录失败，请重试',
                        icon: 'none'
                    });
                }
              },
              fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '登录失败，请重试',
                    icon: 'none'
                });

              },
              complete: function() {
                wx.hideLoading()
              }
            })
            

          } else {
            
          }
        }
      })
      
    }
  },
  mounted() {
    this.isLogin = !!wx.getStorageSync('isLogin')
    this.userInfo = wx.getStorageSync('userInfo')
    console.log(this.isLogin)
  },
  created() {
    
  }
};
</script>
<style>
.person {
  background: #f2f2f2;
}
.person .header {
  width: 100%;
  /* height: 150rpx; */
  background: url("https://pic3.zhimg.com/80/v2-9662bbda79c80775b6e6e1021eaf16c2_r.jpg");
  background-size: cover;
  text-align: center;
  margin-bottom: 20rpx;
}
.person .header img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 100%;
  margin: 15rpx 0;
}
.person .header p {
  padding-bottom: 15rpx;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}
</style>
