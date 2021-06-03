<template>
	<view class="wrap">
		<view class="logo-wrap">
			<image :src= "intro.logo"></image>	
		</view>
		
		<view class="r_desc">
			<view class="title">
				{{intro.shop}}
			</view>
			<view class="time">
				<image src="../../../static/coen/shijian.png" mode=""></image>
				<text>配送约{{intro.duration}}分钟</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			
			return {
			
			}
		},props:{
				intro:Object
			},
	}
</script>

<style scoped lang = "less">
	.wrap{
		height: 130upx;
		background:linear-gradient(to top,#ffff97 15%,#fff829 100%);
		border-bottom-left-radius: 25upx;
		border-bottom-right-radius:  25upx;
		padding-bottom: 10upx;
		display: flex;
		.logo-wrap{
			width:25%;
			image{
				width: 70%;
				height: 120upx;
				margin-left: 20upx;
			}
		}
		.r_desc{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-bottom: 10upx;
			width: 70%;
			font-size: 30upx;
			.title{
				font-size: 36upx;
				font-weight: 700;
			}
			.time{
				display: flex;
				align-items: center;
				image{
					height: 30upx;
					width: 30upx;
				}
				
			}
		}
		
	}
	
</style>
