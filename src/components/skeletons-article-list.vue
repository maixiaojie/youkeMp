<template>
    <div class="skeletons" v-show="!completed">
        <div class="skeletons-container">
            <div v-for="m in 5" :key="m">
                <div class="list-row">
                    <div class="rect"></div>
                </div>
                <div class="rect-row"></div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'skeletons-article-list',
    props: {
        completed: {
            default: false
        }
    },
}
</script>
<style scoped>
.skeletons {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    overflow: hidden auto;
    opacity: 1;
    background: white;
    transition: opacity .16s ease;
}
.skeletons .skeletons-container {
    width: 90%;
    margin: 160rpx 5%;
    /* background: #ddd; */
}
.skeletons .skeletons-container .list-row {
    margin-top: 35rpx;
    height: 60rpx;
    box-sizing: border-box;
    width: 90%;
    display: flex;
    align-items: center;
}
.skeletons .skeletons-container .list-row .rect {
    flex: 1;
    width: 90%;
    height: 20rpx;
    border-radius: 10rpx;
    margin: 0 20rpx;
    /* background: #ecebeb; */
    animation: shine linear 3.2s infinite;
    background: linear-gradient(to right, #ececf0 10%, #d3d3d9 20%, #ececf0 30%);
    background-size: 3000rpx 100%;
    will-change: background;
}
@keyframes shine {
    0% {
        background-position: -1000rpx 0
    }
    100% {
        background-position: 1000rpx 0
    }
}
.skeletons .skeletons-container .rect-row {
    width: 90%;
    height: 20rpx;
    border-radius: 10rpx;
    margin: 0 20rpx;
    animation: shine linear 6s infinite;
    background: linear-gradient(to right, #ececf0 10%, #d3d3d9 20%, #ececf0 30%);
    background-size: 2000rpx 100%;
    will-change: background;
}
</style>
