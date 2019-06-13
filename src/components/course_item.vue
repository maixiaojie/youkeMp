<template>
	<div class="course box">
		<div class="item-left">
			<img :src="path" alt="">
		</div>
		<div class="item-right">
			<h4 class="name" v-text="txt"></h4>
			<div class="more-data">
				<p class="time" v-text="time"></p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name: 'Item',
		props:{
			txt:{
				type:String
			},
			path: {
				type:String
			},
			time: {
				type:String
			}
		},
		computed:{
		},
		methods:{
			
		}
	}
</script>
<style type="text/css" scope>
	.course.box {
		/* padding: 15px; */
  		position: relative;
		display: flex;
		width: 100%;
	}
	.course .item-left {
		width: 100px!important;
		height: 75px!important;
		margin-right: 10px;
	}
	.course .item-left img {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.course .item-right {
		flex: 1;
		position: relative;
	}
	.course .item-right .name {
		font-weight: 400;
		font-size: 28rpx;
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-right: 10px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.course .more-data {
		position: absolute;
		bottom: 8px;
		left: 0;
		font-size: 12px;
		color: #71777d;
	}
</style>