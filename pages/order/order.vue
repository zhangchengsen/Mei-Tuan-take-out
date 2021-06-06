<template>
	<view class="wrap">
		
		<view class="order_wrap" v-if ="login">
			
			<!-- 主题 -->
			<view class="nothing" v-if="!boughtList.length">
				<image src="/static/coen/meoyopu.png"></image>
				<view class="">
					暂时没有订单呢!
				</view>
			</view>
			<block v-else  v-for="(item,index) in boughtList" :key = "index">
			<view class="shop" >
				
				<view class="t_desc">
					<view class="img_wrap">
						<image :src="item.wxorder.logo"></image>
					</view>
					<view class="title_pay">
						<text class="title">{{item.wxorder.body}}</text>
						<text>付款成功</text>
					</view>
				</view>
				<block v-for = "(item1,index1) in item.wxorder.Paymentinfor.arrinfo" :key = "index1">
					<view class="delicacy">
						<text>{{item1.input}}</text>
						<text>x{{item1.amount}}</text>
					</view>
					
				</block>
				<view class="review_all">
					<text class = "review" @click="toReview(item._merchantid,item._openid)">去评价</text>
					<text>共{{item.wxorder.Paymentinfor.arrinfo.length}}种商品 合计:{{item.wxorder.total_fee}}元</text>
				</view>
			</view>
			<!-- 主题 -->
			
			</block>
		</view>
		<view class="unlogin" v-else>

			<uni-notice-bar  text="登录后才能查看订单信息哦！"></uni-notice-bar>
			<button type="default" @click = "getUserProfile">去登录</button>
		</view>
		<view class="mask">
			
		</view>
	</view>
</template>

<script>
	const {log : l } = console
	import {Post} from "../../api/request.js"
	
	export default{
		data() {
			return {
				login:false,
				userMes:{},
				boughtList:[]
			}
		},
		onShow() {
			let a  = uni.getStorageSync("userMes")
			if(a.nickName)
			{
				this.userMes = a
				this.login = true
			}
			this.getBoughtList()
		},
		methods:{
			toReview(mid,uid){
				uni.navigateTo({
					url:"/pages/review/review?mid=" + mid + "&uid=" + uid
				})
			},
			async getBoughtList() {
				let data = {
					type:"myorder",
					openid: this.userMes.openid
				}
				let res = await Post("/wxpay/wxpaying",data)
				this.boughtList = res[1].data.datas.reverse()
				l(this.boughtList)
			},
			getUserProfile(e){
				wx.getUserProfile({
					desc:"获取个人信息",
					success:(res)=>{
						let {userInfo} = res
						wx.login({
							success:(res)=>{
								if(res.code)
								{
									let data = {
										appid :"wxd6ab9ce806919ea4",
										secret:"48bdb1ce8f0d890cf65f17b3a071ef5e",
										avatarUrl:userInfo.avatarUrl,
										nickName:userInfo.nickName,
										code:res.code
									}
									
									this.loginFunc(data)
								}
							}
						})
					},
					fail:(res)=>{
						l(res)
					}
				})
			},
			async loginFunc(data){
				let res = await Post('/wxuser/wxlogin',data)
				this.userMes = res[1].data.datas
				uni.setStorageSync("userMes",this.userMes)
				this.login = true
				this.getBoughtList()
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		.order_wrap{
			margin: 20upx;
			border-radius: 20upx;
			.nothing{
				background-color: #fff;
				text-align: center;
				border-radius: 20upx;
				image{
					width: 300upx;
					height: 300upx;
					
				}
				view{
					padding: 20upx;
					color: #383838;
				}
			}
			.shop{
				background-color: #fff;
				color:#5e5e5e;
				font-size: 32upx;
				margin-top: 20upx;
				border-radius: 10upx;
				.t_desc{
					color:#bcbcbc;
					display: flex;
					height: 120upx;
					.img_wrap{
						margin-left: 20upx;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							border-radius: 10upx;
							margin-top: 10upx;
							width: 100upx;
							height: 100upx;
						}
					}
					.title_pay{
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 20upx;
						.title{
							font-size: 38upx;
							font-weight: 600;
							color: black;
						}
					}
				}
				.delicacy{
					height: 80upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 20upx;
				}
				.review_all{
					height: 80upx;
					display: flex;
					padding: 0 20upx;
					justify-content: space-between;
					align-items: center;
					.review
					{
						padding: 10upx;
						background-color: #dedede;
					}
				}
			}
		}
		.unlogin{
			height:260upx;
			padding-top: 10upx;
			background-color: #fff;
			button{
				margin-top: 30upx;
				font-size: 38upx;
				border-radius: 50upx;
				width: 60%;
				color: #fff;
				background-color: #409EFF;
			}
		}
		.mask{
			z-index: -1;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0,0,0,0.08);
		}
	}
</style>
