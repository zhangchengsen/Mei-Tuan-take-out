<template>
	<view class="wrap">
		<view class="user_mes">
			<view class="person" v-if="address.province" >
				<view class="logo">
					<image src="/static/coen/address.png" ></image>
				</view>
				<view class="address">
					<view class="addr_top">
						{{address.province}} {{address.county}}
					</view>
					<view class="addr_bottom">
						<view class="name">
							{{foodDetail.userMes.nickName}}
						</view>
						<view class="number">
							{{address.tel}}
						</view>
					</view>
				</view>
			</view>
			<view v-else class = "u">
				<view  @click="getAddress">获取地址 +</view>
			</view>
			<view class="instant" v-if ="address.province">
				<image src="/static/coen/shijian.png"></image>
				<view class="">
					立即送出
				</view>
			</view>
		</view>
		<view class="food_cart">
			<block v-for="(item,index) in foodDetail.buyList" :key = "index">
				<view class="aFood">
					<view class="img_wrap">
						<image :src="item.objdis.image" ></image>
					</view>
					<view class="detail">
						<view class = "detailFlex">
							<view>{{item.objdis.input}}</view>
							<view>单价:{{item.objdis.Discount}}</view>
						</view>
						<view class="nums">
							x{{item.nums}}
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="addtional">
			配送费:￥{{foodDetail.physical}}
		</view>
		<view class="fixed">
			<text>合计￥{{Math.round((foodDetail.all_cost+ foodDetail.physical) * 100) / 100 }}</text>
			<button type="primary" @click="toPay">去支付</button>
		</view>
		<view class="mask">
			
		</view>
	</view>
</template>

<script>
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	const {log : l } = console
	import {Post} from "../../api/request.js"
	export default{
		components: {
			 HMmessages
		},
		data() {
			return {
				foodDetail:{},
				address : {},
				allorder:[]
			}
		},
		
		methods:{
			getAddress(){
				wx.chooseAddress({
					success:(res)=>{
						l(res)
						let data = {
							userName :res.userName,
							province:res.provinceName,
							tel:res.telNumber,
							city:res.cityName,
							county:res.countyName,
							detail:res.detailInfo,
							code:res.postalCode
						}
						uni.setStorageSync("address",data)
					}
				})
			},
			// 接口看错了 导致得重新处理 = =
			getAllOrder() {
				let a = []
				this.foodDetail.buyList.forEach(item =>{
					let data = {
						Totalprice : item.nums * item.objdis.Price,
						amount:item.nums,
						image: item.objdis.image,
						indexs:item._id,
						input:item.objdis.input,
						price:item.objdis.Discount
					}
					a.push(data)
				})
				this.allorder = a
			},
			toPay() {
				l(this.foodDetail)
				if(!this.address.tel)
				{
					 	uni.showToast({
					 		title:"请先选择地址再支付哦!",
							icon:"none"
					 	})
				}
				else{
					const peopleobj = {
						address:this.address.detail,
						name:this.address.userName,
						phone:this.address.tel
					}
					let ide = this.foodDetail.buyList[0].openid.slice(0,7)
					const data = {
						peopleobj,
						arrinfo:this.allorder,
						merchantid:this.foodDetail.buyList[0].openid,
						ide,
						command:this.foodDetail.shop,
						logo:this.foodDetail.logo,
						useropenid:this.foodDetail.userMes.openid,
						payment:this.foodDetail.all_cost + this.foodDetail.physical
					}
					l(data)
					// 接口数据
					this.postPay(data)
					
				}
			},
			async postPay(data){
				let res = await Post('/wxpay/fictpay',data) 
				wx.showLoading({
				  title: '正在支付',
				})
				setTimeout(function () {
				  wx.hideLoading()
				}, 2500)
				// ====
				setTimeout(function () {
					wx.showLoading({
					  title: '查询支付结果中',
					})
					
					setTimeout(function () {
					  wx.hideLoading()
					  wx.showToast({
					  	title:"支付成功!"
					  })
					  setTimeout(function () {
						uni.switchTab({
							url:"/pages/order/order"
						})
					  }, 1000)
					  
					}, 2000)
				}, 3000)
				
			}
		},
		
		
		onShow(){
			this.foodDetail = uni.getStorageSync('allDetail')
			let addr = uni.getStorageSync("address")
			if(addr.province) {
				this.address = addr
			}
			this.getAllOrder()
		}
	}
</script>

<style scoped lang = "less">
	.u{
		height: 70upx;
		text-align: center;
		line-height: 70upx;
	}
	.wrap{
		.user_mes{
			background-color: #fff;
			margin: 0 20upx;
			margin-top: 30upx;
			border-top-left-radius: 20upx;
			border-top-right-radius: 20upx;
			.person{
				font-size: 36upx;
				border-bottom: 2upx solid rgba(0,0,0,0.08);
				display: flex;
				height: 140upx;
				.logo{
					margin-left: 20upx;
					margin: 20upx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 60upx;
					image{
						width: 40upx;
						height: 40upx;
					}
				}
				.address{
					display: flex;
					width: 100%;
					justify-content: center;
					flex-direction: column;
					.addr_bottom{
						display:flex;
						justify-content:space-between;
						view{
							padding-right:20upx
						}
					}
				}
			}
			.instant{
				background-color: #fff;
				display: flex;
				align-items: center;
				
				height: 80upx;
				image{
					margin-left: 20upx;
					margin-right: 20upx;
					width: 40upx !important;
					height: 40upx !important;
				}
				view{
					font-size: 36upx;
					margin-left: 20upx;
				}
				
			}
		}
		.food_cart{
			margin: 0 20upx;
			background-color: #fff;
			margin-top: 20upx;
			.aFood{
				display:flex;
				.img_wrap{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 240upx;
					margin: 10upx 20upx;
					image{
						width: 220upx;
						height: 190upx;
					}
				}
				
				.detail{
					font-size: 36upx;
					width: 100%;
					margin-top: 20upx;
					.detailFlex{
						font-weight: 540;
						width: 100%;
						display:flex;
						justify-content: space-between;
						view{
							padding-right: 10upx;
						}

					}
					.nums{
						font-size: 30upx;
						color: #c5c5c5;
					}
				}
			}
		}
		.addtional{
			background-color: #fff;
			text-align: right;
			height: 90upx;
			margin: 20upx;
			border-bottom-right-radius: 20upx;
			border-bottom-left-radius: 20upx;
			padding-right: 20upx;
			line-height: 90upx;
			margin-bottom: 160upx;
		}
		.fixed{
			background-color: #fff;
			height: 100upx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			padding: 20upx;
			justify-content: space-between;
			align-items: center;
			text{
				font-weight: 500;
			}
			button{
				
				width: 30%;
				height: 80upx;
				font-size: 34upx;
				margin: 0;
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
