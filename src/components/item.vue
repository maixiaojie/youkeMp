<template>
	<div class="itemWarp flex_mid">
		<span>
			<img :src="path" alt="">
		</span>
		<span v-text='txt'></span>
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
			}
		},
		computed:{
		},
		methods:{
			
		}
	}
</script>
<style type="text/css">
	.itemWarp{
		width:calc(100% - 20rpx);
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 10rpx;
	}
	.itemWarp span{
		font-size: 12px;
	}
	.itemWarp img {
		max-width: 100%;
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}
</style>