<template>
	<view class="wrap">
		<view class="aWarp">
			<view class="locate">
				<image src="/static/coen/dizhi.png" mode=""></image>
				<text class="">
					{{intro.address}}
				</text>
			</view>
			<view class="document">
				<image src="/static/coen/dangan.png" mode=""></image>
				<text class="">
					查看食品安全档案文件
				</text>
			</view>
			<view class="time">
				<image src="/static/coen/shijian.png" mode=""></image>
				<text class="">
					配送时间:{{intro.times}}
				</text>
			</view>
			<view class="server">
				<image src="/static/coen/fuwu.png" mode=""></image>
				<text class="">
					商家服务:到店自取(享优惠)
				</text>
			</view>
		</view>
		
			
		
	</view>
</template>

<script>
	export default{
		props:{
			intro:Object
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style scoped lang="less">
	.wrap{
		
		.aWarp{
			view{
				z-index: 3;
				display: flex;
				height: 100upx;
				font-size: 36upx;
				align-items: center;
				border-bottom: 4px solid #d9d9d9;
				&:first-child{
					border-top: 4px solid #d9d9d9;
				}
				image{
					margin-left: 20upx;
					width: 40upx;
					height: 40upx;
				}
				text{
					margin-left: 20upx;
				}
			}
		}
		
	}
</style>
