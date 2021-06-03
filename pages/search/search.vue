<template>
	<view class="search">
		<view class="searchInput">
			<input type="text" v-model = "searchData" placeholder="烧烤" @confirm = "submitSearch" confirm-type="search" />
			<button type="default" @click = "search">搜索</button>
		</view>
		<view class="history" >
			<view class="history-title">
				<view>历史</view>
				<image class="img" src="/static/trash.png"  @click="removeHis"></image>
			</view>
			<view class="history-label">
				<!-- 历史记录 -->
				<block v-for = "(item,index) in historyList" :key = "index">
					<view @click = "searchData = item">
						{{item}}
					</view>
					
				</block>
			</view>
		</view>
		<!-- 商品数据 -->
		<view class="warp" v-if ="!noMes">
			<block v-for="(item,index) in foodList" :key="index">
				<view class="a" @click="navToFood">
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
		<view class="noMes" v-else>
			<image src="/static/coen/meoyopu.png" mode="widthFix"></image>
			<view class="">
				没有该分类哦
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog  message="确定要删除吗"  @close="closeHis" @confirm="toRemove">
				<view>确定要删除吗</view>
			</uni-popup-dialog>
		</uni-popup>
		
	</view>
</template>

<script>
	import {Post} from '../../api/request.js'
	let {log : l} = console;
	export default {
		data() {
			return {
				searchData:"",
				foodList:[],
				historyList:[],
				noMes:false
			}
		},
		created(){
			 this.historyList = uni.getStorageSync("history") || []
			
		}
		,
		methods:{
			// uni 弹出框 ======
			toRemove(){
				uni.setStorageSync('history','')
				this.historyList = []
				this.$refs.popup.close()
			},
			closeHis(){
				this.$refs.popup.close()
			},
			removeHis(){
				this.$refs.popup.open()
			},
			// uni 弹出框
			// 搜索
			async search(){
				if(this.searchData.trim().length == 0) return
				let data  = {
					searchdata:this.searchData
				}
				// 请求
				this.postSearch(data)
				// 历史
				this.addHistory()
			},
			// 键盘搜索
			
			submitSearch(e){
				if(e.detail.value.trim().length == 0) return
				let data = {
					searchdata:e.detail.value
				}
				// 请求
				this.postSearch(data)
				// 历史
				this.addHistory()
			},
			// 发送搜索请求
			async postSearch(data) {
				let res = await Post("/forshop/search",data)
				l(res)
				if(res[1].data== "没有商品数据")
				{
					this.noMes = true
				}
				else {
					this.noMes = false
					this.foodList = res[1].data
				}
			},
			// 添加历史
			addHistory(){
				let his = uni.getStorageSync("history") || []
				his.push(this.searchData)
				let newHis = Array.from(new Set(his))
				l(his)
				l(newHis)
				this.historyList = newHis
				uni.setStorageSync('history',newHis)
				l(uni.getStorageSync("history"))
			},
			// 到详情页面
			navToFood() {
				uni.navigateTo({
					url:"/pages/takeout/takeout"
				})
			}
		}
	}
</script>

<style scoped lang = "less">
	.noMes{
		font-size: 30upx;
		text-align: center;
		image{
			width: 50%;
		}
	}
	.search {
		margin-top: 20upx;
		.searchInput{
			display: flex;
			justify-content: center;
			align-items: center;
			height:70upx;
			margin-left:20upx;
			margin-right:10upx;
			input{
				width: 70%;
				padding: 10upx;
				padding-left: 20upx;
				font-size: 30upx;
				background-color: #eee;
				border-radius: 10upx;
			}
			button{
				width: 20%;
				font-size: 30upx;
				font-weight: 700;
			}
		}
		.history {
			margin-top: 40upx;
			margin-left: 20upx;
			margin-right: 20upx;
			font-weight: 700;
			font-size: 30upx;
			
			.history-title{
				height: 70upx;
				view{
					display: inline-block;
				}
				.img{
					float:right;
					margin-top: 10upx;
					width: 30upx;
					height: 30upx;
				}
				
			}
			.history-label{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				view{
					height: 60upx;
					display: inline-block;
					line-height: 60upx;
					margin: 10upx;
					background-color: #eee;
				}
			}
		}
	}
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
