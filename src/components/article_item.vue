<template>
	<div class="article box">
		<div class="title">
			<h4 class="name" v-text="txt"></h4>			
		</div>
		<div class="more-data">
			<div>
				<span>
					<font v-text="tag"></font><span>·</span>
					<font>382</font>人赞<span>·</span>
					<font>0</font>人评论<span>·</span>
					<font v-text="time"></font>
				</span>
			</div>
			<!-- <div class="item starCount"><i-icon type="praise" size="15" color="#333"  /><span>12</span></div>
			<div class="item collectionCount"><i-icon type="collection"  size="15" color="#333" /><span>21</span></div>
			<div class="item time"><i-icon type="time" size="15" color="#333" /><span>两天前</span></div> -->
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
			time: {
				type:String
			},
			tag: {
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
	.article.box {
		width: 100%;
	}
	.article.box .title {
		width: 100%;
		float: left;
		/* color: #7d7e80; */
		margin-top: 10px;
		font-size:28rpx;
	}
	.article.box .more-data {
		width: 100%;
		padding:8px 0 15px 0;
		font-size:12px;
		color:#333;
		border-bottom:1rpx solid #f2f2f2;
	}
	.article.box .more-data span {
		vertical-align: middle;
		margin-left: 5rpx;
		margin-right: 5rpx;
	}
	
</style>