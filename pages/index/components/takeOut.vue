<template>
	<view class="warp">
		<block v-for="(item,index) in foodList" :key="index">
			<view class="a" @click = "navToFood(item.openid)">
				<view class="l_img">
					<image :src="item.logo" mode="aspectFill"></image>
				</view>
				<view class="r_desc">
					<view class="title">
						{{item.shop}}
					</view>
					<view class="costAndtime">
						<text>月售</text>
						<text>约{{item.duration}}分钟</text>
					</view>
					<view class="deli_deliPay_average">
						<text>起送￥{{item.delivering}}</text>
						<text>配送￥{{item.physical}}</text>
						<text>人均￥{{item.capita}}</text>
					</view>
					<view class="label">
						<image src="/static/coen/liwu.svg"></image>
						<text>{{item.types}}</text>
					</view>
				</view>
			</view>
		</block>
	</view>

</template>

<script>
	import {Post} from '../../../api/request.js'
	export default {
		props: {
			foodList: Array

		},
		data() {
			return {

			}

		},
		methods:{
			navToFood(id) {
				this.$store.commit('initClickTab')
				uni.navigateTo({
					url:'/pages/takeout/takeout?id=' + id
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.warp {
		.a {
			padding: 10upx 0;
			border-bottom: 2upx solid #dedede;
			height: 250upx;
			display: flex;

			.l_img {
				margin-left: 8upx;
				width: 42%;
				overflow: hidden;
				image {
					width: 300upx;
					height: 250upx;
					border-radius: 10upx;
				}
			}

			.r_desc {
				width: 58%;
				font-size: 30upx;
				display: flex;
				flex-direction: column;

				.title {
					font-size: 36upx;
					font-weight: 600;
					flex: 1;
				}

				.deli_deliPay_average {
					display: flex;
					flex-direction: row;
					width: 100%;
					text {
						flex: 1;
					}
				}

				.costAndtime {
					flex: 1;
				}

				.label {
					flex: 1;
					display: flex;
					align-items: center;
					image{
						
						height: 30upx;
						width: 30upx;
					}
					text{
						font-size:30upx;
					}
				}
			}
		}
	}
</style>
