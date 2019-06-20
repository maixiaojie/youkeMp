<template>
    <div>
        <!-- <van-search :value="value" placeholder="请输入搜索关键词" />
        <van-row>
            <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button>
        </van-row> -->
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: ""
    }
  },
  methods: {
    onGotUserInfo(e) {
        console.log(e.target.errMsg)
        console.log(e.target.userInfo)
        console.log(e.target.rawData)
    }
  },
  onUnload() {
    console.log('onUnload');
    Object.assign(this, this.$options.data())
  },
  created() {
  }
};
</script>
<style>
</style>
