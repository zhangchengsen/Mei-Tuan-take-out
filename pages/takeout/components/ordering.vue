<template>
	<view class="wrap">
		<view class="left">
			<block v-for= "(item,index) in menuList" :key = "index">
				<view :class = "{'active' : activeIndex == index}" @click="changeTab(index)">{{item}}</view>
			</block>
		</view>
		
		<view class="right">
			<view class="title">
				{{menuList[activeIndex]}}
			</view>
			<!-- 描述-->
			
		<block v-for = "(item1,index1) in newDishList" :key = "index1">
			
			<view class="inner_desc">
				<!-- 图片 -->
				<view class="img_wrap">
					<image :src="item1.objdis.image" ></image>
				</view>
				<!-- 文字按钮 -->
				<view class="r_desc">
					<view class="desc_title">
						{{item1.objdis.input}}
					</view>
					<view class="desc_label">
						<block v-for ="(item2,index2) in item1.objdis.tags" :key = "index">
							<text>{{item2}}</text>
						</block>
					</view>
					<view class="sale">
						月销100
					</view>
					<!-- // 价格 折扣 数量 -->
					<view class="cost_disc_num">
						<view class="now_cost">
							￥{{item1.objdis.Discount}}
						</view>
						<view class="init_cost">
							￥{{item1.objdis.Price}}
						</view>
						<view class="nums">
							<text class="" @click.stop="minus(item1)">
								-
							</text>
							<text>{{item1.nums}}</text>
							<text @click.prevent="add(item1)">+</text>
						</view>
					</view>
				</view>
			</view>
		</block>
		</view>
		<view class="fix">
			<view class="imgWrap">
				<view class="numbers" v-if="all_nums">
					{{all_nums}}
				</view>
				<image src="/static/coen/weigou.png" mode="widthFix" v-if = "!all_nums"></image>
				<image src="/static/coen/yigou.png" mode="widthFix" v-else></image>
			</view>
			<view class="money">
				<view class="m_top">
					￥{{all_cost }}
				</view>
				<view class="m_bottom">
					另需配送费{{intro.physical}}元
				</view>
			</view>
			<view class="total_cost" v-if="all_cost - 0 < intro.delivering">
				还差{{Math.round((intro.delivering - (all_cost - 0))*100)/100 }}元
			</view>
			<view class="total_cost" v-else @click="buyThis">
				去结算
			</view>
		</view>
		<!-- 模态框 -->
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog    @close="close" @confirm="buy">
				<view>请先登录后再操作</view>
			</uni-popup-dialog>
		</uni-popup>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	const {log : l} = console
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	import {Post} from '../../../api/request.js'
	export default {
		 components: {
			 HMmessages
		 },
		props:{
			dishList:Array,
			menuList:Array,
			intro:Object
		},
		data() {
			return {
				activeIndex:0,
				newDishList:[],
				buyList:[],
				all_cost:0,
				all_nums:0,
				userMes:[]
			}
		},
		methods:{ 
			//  携带商品参数 价格 logo 商家的openid openid 配送费  商家名称 点的数量 路由跳转
			// uni 弹出框 ======
			saveFoodList() {
				let data = {
					buyList:this.buyList,
					all_cost:this.all_cost,
					all_nums: this.all_nums,
					userMes:this.userMes,
					physical:this.intro.physical,
					delivering:this.intro.delivering,
					shop:this.intro.shop,
					logo:this.intro.logo
				}
				uni.setStorageSync("allDetail",data)
			},
			// 无存 买
			 buy(){
				this.getUserProfile()
				this.$refs.popup.close()
				
			},
			close(){
				this.$refs.popup.close()
			},
			buyThis(){
				if(this.buyList.length == 0)
				return uni.showToast({
					title:"商品不能为空!",
					icon:"none"
				})
				let a = uni.getStorageSync("userMes")
				// 有储存
				if(a.nickName )
				{
					this.userMes = a
					uni.navigateTo({
						url:'/pages/buy/buy'
					})
					this.saveFoodList()
				}
				else {
					// 无存
					this.$refs.popup.open()
				}
			},
			// uni 弹出框
			// 登录
			getUserProfile(){
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
									// 得到登录code
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
				this.HMmessages.show('登录成功',{icon:'success',iconColor:"#1dff7b"})
				this.saveFoodList()
				uni.navigateTo({
					url:'/pages/buy/buy'
				})
			}
			,
			// 登录
			changeTab(index){
				this.activeIndex = index
			},
			// 点击加一
			add(item) {
		
				let index = this.buyList.findIndex(v=>{
					return v._id == item._id
				})
				if(index == -1)
				{
					item.nums += 1
					this.buyList.push(item)
				}
				else{
					item.nums += 1
				}
			},
			// 点击减一
			minus(item) {
				let index = this.buyList.findIndex(v=>{
					return v._id == item._id
				})
				if(index == -1)
				{
					return 
				}
				else{
					if(this.buyList[index].nums == 1)
					{
						item.nums -= 1
						this.buyList.splice(index,1)
					}
					else
					{
						item.nums -= 1
					}
				}
			},
			
		},
		filters:{
			
		}
		,
		computed: 	{
			
			fatherToSon() {
				let a = []
				this.dishList.forEach(item => {
					if(item.optidata == this.menuList[this.activeIndex])
					a.push(item)
				})
				this.newDishList = a
			},
			calcTotal() {
				let nums = 0;
				let cost = 0;
				this.buyList.forEach(v=>{
					nums += v.nums
					cost += v.nums * v.objdis.Discount
				})
				this.all_nums = nums
				this.all_cost = Math.round(cost * 100)/100
				
			},
			toBuy() {
				
			}
			
		}
		
	}
</script>

<style lang="less" scoped>
	.active {
		background-color: #fff !important;
		font-weight: 700 !important;
	}
	.wrap{
		margin-bottom: 150upx;
		display: flex;
		justify-content: space-between;
		.left{
			width: 190upx;
			color: #a8a8a8;
			view{
				background-color: #f1f1f1;
				text-align: center;
				font-size: 34upx;
				height: 80upx;
				line-height: 80upx;
			}
			
			
		}
		.right{
			margin-right: 10upx;
			width: 72%;
			.title{
				height: 80upx;
				line-height: 80upx;
			}
			// 图片文字按钮
			.inner_desc{
				display: flex;
				.img_wrap{
					image{
						height: 220upx;
						width: 220upx;
						border-radius: 10upx;
					}
						
				}
				.r_desc{
					width: 100%;
					margin-left: 20upx;
					font-size: 30upx;
					
					.desc_title{
						font-size: 36upx;
						font-weight: 700;
						margin-top: 10upx;
					}
					.desc_label{
						color:#5b5b5b;
						margin-top: 10upx;
						text{
							margin-left: 20upx;
							padding: 5upx;
							text-align: center;
							background-color: #f1f1f1;
							&:first-child{
								margin-left: 0;
							}
						}
					}
					.sale{
						color:#a8a8a8;
						margin-top: 10upx;
					}
					// 价格 折扣 数量
					.cost_disc_num {
						color:#8c8c8c;
						display: flex;
						margin-top: 10upx;
						align-items: center;
						.now_cost{
							color:#ff9e2e;
							font-size: 36upx;
						}
						.init_cost{
							color:#8c8c8c;
							margin: 20upx;
							text-decoration: line-through;
						}
						.nums{
							color:#8c8c8c;
							display: flex;
							width: 100%;
							justify-content: space-between;
							align-items: center;
							text{
								text-align: center;
								line-height: 36upx;
								font-size: 30upx;
								&:first-child{
									font-size: 36upx;
									border: 2upx solid #C8C7CC;
									width: 36upx;
									height: 36upx;
									border-radius: 36upx;
								}
								&:last-child{
									font-size: 36upx;
									width: 36upx;
									height: 36upx;
									background-color: #ffee31;
									color:black;
									border-radius: 36upx;
								}
							}
						}
					}
				}
				
				
			}
		}
		.fix{
			position: fixed;
			left: 0;
			bottom: 0;
			right: 0;
			height: 130upx;
			border-radius: 75upx;
			background-color: #000;
			display: flex;
			margin: 0 50upx;
			.imgWrap{
				flex: 1.5;
				.numbers{
					position: fixed;
					left: 160upx;
					bottom: 50upx;
					background-color: #ff4c20;
					width: 40upx;
					font-size: 30upx;
					text-align: center;
					line-height: 40upx;
					height: 40upx;
					border-radius: 50%;
					z-index: 3;
				}
				image{
					position: fixed;
					left: 80upx;
					bottom: 10upx;
					height: 150upx;
					width: 120upx;
					
					
				}
			}
			.money{
				display: flex;
				flex-direction: column;
				flex: 3.2;
				justify-content: center;
				.m_top{
					font-size: 36upx;
					color: #FFFFFF;
					
				}
				.m_bottom{
					font-size: 32upx;
					color:#aaaaaa;
				}
				
			}
			.total_cost{
				flex: 2;
				font-size: 34upx;
				border-top-right-radius: 61upx;
				border-bottom-right-radius: 61upx;
				display: flex;
				justify-content: center;
				background-color: #ffe72a;
				align-items: center;
			}
		}
	}
</style>
