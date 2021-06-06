<template>
	<view class="wrap">
		<view class="user_wrap">
			<view class="login" v-if ="!userMes.nickName">
				<view class="">
					点击登录,一起分享与美食的喜悦吧!
				</view>
				<button type="default"  @click = "getUserProfile">去登录</button>
			</view>
			<view class="user" v-else>
				<image :src="userMes.avatarUrl" ></image>
				<text>{{userMes.nickName}}</text>
			</view>
		</view>
				
	</view>
</template>


<script>
	import {Post} from '../../api/request.js'
	const {log : l} = console
	export default{
		data() {
			return {
				userMes:{}
			}
		},
		methods:{
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
			}
		},
		onShow(){
			let a = uni.getStorageSync("userMes")
			if(a.nickName)
			{
				this.userMes = a
			}
		}
		
	}
</script>

<style scoped lang = "less">
	.wrap{
		
		.user_wrap{
			height: 350upx;
			background:linear-gradient(to top,#fffc8e 15%,#ffdc14 100%);
			.login{
				text-align: center;
				view{
					padding-top: 100upx;
					color: #fff;
					font-size: 36upx;
					font-weight: 550;
				}
				button {
					margin-top: 30upx;
					font-size: 38upx;
					border-radius: 50upx;
					width: 60%;
					color: #fff;
					background-color: #409EFF;
				}
			}
			.user{
				display: flex;
				padding-top: 100upx;
				padding-left: 80upx;
				image{
					width: 150upx;
					height: 150upx;
					border-radius: 50%;	
					
				}
				text{
					display: flex;
					align-items: center;
					margin-left: 30upx;
				} 
			}
			
			
		}
	}
</style>
