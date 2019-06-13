<template>
    <div class="gotop_wrapper" :hidden="!floorStatus" @click="goTop">
        <image class="gotop" src="../../static/images/totop.png" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            floorStatus: false
        }
    },
    methods: {
        goTop() {
            if(wx.pageScrollTo) {
                wx.pageScrollTo({
                    scrollTop: 0
                })
            }
        }
    },
    onPageScroll(e) {
        if(e.scrollTop > 200) {
            this.floorStatus = true
        }else {
            this.floorStatus = false
        }
    }
};
</script>
<style>
.gotop_wrapper {
  height: 80rpx;
  width: 80rpx;
  position: fixed;
  bottom: 50rpx;
  /* background: rgba(0, 0, 0, 0.3); */
  right: 30rpx;
  border-radius: 50%;
}
.gotop {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
}
</style>
