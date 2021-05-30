<template>
	<view class="">
		<view class="location">
			<image src="../../../static/coen/dingwei.svg"></image>
			<text>浙江杭州阿里巴巴滨江路2号</text>
		</view>
		<view class="search_input">
			<image src="../../../static/coen/sousuo.svg" mode=""></image>
			<input type="text" placeholder="麻辣香锅" disabled="true" />
		</view>
		<view class="swiper-view">
			<swiper :autoplay="false" :interval="2000" :duration="1000" @change="pageChange">
				<block v-for="(item,index) in swiperList" :key="index">
					
					<swiper-item>
						
						<view class="swiper-item">
							<block v-for="(item1,index1) in item" :key="index1">
								
								<view class="content-img">
									<image :src="item1.img" mode="widthFix" class="uploadImg"></image>
									<text>{{item1.title}}</text>
								</view>
							</block>
						</view>
					</swiper-item>
				</block>
			</swiper>
			<!-- 指示点 -->
			<view class="instruct-view">
				<block v-for="(item, index) in swiperLen" :key="index">
					<view class="instruct" :class="{active:index == num}">{{item}}</view>
				</block>
			</view>
		</view>
		<!-- <uni-notice-bar single="true" text="小提醒"></uni-notice-bar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播二维数组
				swiperLen:[""],
				swiperList: [
					[{
							'img': '/static/inster/meishi.png',
							'title': '美食'
						},
						{
							'img': '/static/inster/chaoshi.png',
							'title': '超市便利'
						},
						{
							'img': '/static/inster/shuiguo.png',
							'title': '蔬菜水果'
						},
						{
							'img': '/static/inster/meituan.png',
							'title': '美团专送'
						},
						{
							'img': '/static/inster/paotui.png',
							'title': '跑腿代购'
						},
						{
							'img': '/static/inster/yexiao.png',
							'title': '夜宵'
						},
						{
							'img': '/static/inster/jintie.png',
							'title': '津贴联盟'
						},
						{
							'img': '/static/inster/pinping.png',
							'title': '甜点饮品'
						},
						{
							'img': '/static/inster/shaokao.png',
							'title': '龙虾烧烤'
						},
						{
							'img': '/static/inster/dangao.png',
							'title': '甜蜜蛋糕'
						}
					],
					[{
							'img': '/static/inster/hanbao.png',
							'title': '汉堡披萨'
						},
						{
							'img': '/static/inster/liaoli.png',
							'title': '日韩料理'
						},
						{
							'img': '/static/inster/malatang.png',
							'title': '麻辣烫'
						},
						{
							'img': '/static/inster/kuaican.png',
							'title': '快食简餐'
						},
						{
							'img': '/static/inster/xianhua.png',
							'title': '浪漫鲜花'
						},
						{
							'img': '/static/inster/lazi.png',
							'title': '无辣不欢'
						},
						{
							'img': '/static/inster/jiaozi.png',
							'title': '饺子馆'
						},
						{
							'img': '/static/inster/xiaochi.png',
							'title': '小吃馆'
						},
						{
							'img': '/static/inster/baofan.png',
							'title': '煲仔饭'
						},
						{
							'img': '/static/inster/qita.png',
							'title': '其他'
						}
					]
				],
				num : 0
			}
		},
		created() {
			//  轮播图下方小点的个数处理
			while(this.swiperList.length > this.swiperLen.length)
			{
				this.swiperLen.push('')
			}
		},
		methods:{
			pageChange(e)
			{
				// 小点随之点亮
				this.num = e.detail.current;
			}
		}
	}
</script>

<style lang="less" scoped>
	view {
		font-size: 30upx;

		.location {
			margin-bottom: 20upx;

			image {
				height: 35upx;
				width: 35upx;
			}

			text {
				padding: 10upx 0;
			}
		}

		.search_input {
			display: flex;
			background-color: #eff3f4;
			margin: 0 20upx;
			border-radius: 10upx;
			align-items: center;

			image {
				height: 40upx;
				width: 40upx;
				padding: auto 0 auto 20upx;
				display: flex;
				align-items: center;
			}

			input {
				display: flex;
				height: 70upx;
				line-height: 70upx;
			}
		}
	}
	.swiper-view{
		position: relative;
		swiper-item{
			.swiper-item{
				margin: 10upx 0;
				display: flex;
				flex-wrap: wrap;
				.content-img{
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 20%;
					justify-content: center;
					font-size: 24upx;
					.uploadImg{
						width: 40%;
					}
					text{
						padding: 10upx 0;
					}
				}
			}
		}
	.instruct-view{
		position: absolute;
		display: flex;
		width:10%;
		bottom: 10%;
		left: 50%;
		height: 10upx;
		transform: translate(-50%);
		view{
			flex: 1;
			margin: 0 5upx;
			justify-content: center;
			background-color: #999;
			border-radius: 10upx;
		}
	}
	.active{
		background-color: #ffd833 !important;
	}
}
</style>
