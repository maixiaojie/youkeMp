<template>
    <div class="nodata">
        <img src="/static/images/sadly.png" alt="">
        <p class="msg" v-text="msg"></p>
    </div>
</template>
<script>
export default {
    name: 'nodata',
    props: {
        msg: {
            default: '暂无数据'
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.nodata {
    width: 100%;
    height: 300px;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;


}
.nodata img {
    width:280rpx;
    height:240rpx;

}
.nodata p.msg {
    color:#777;
    font-size:12px;

}
</style>


