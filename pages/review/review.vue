<template>
	<view class="wrap">
		<textarea value="" v-model = "inputVal" placeholder="请输入对商家的评论" />
		<view class="submit" @click="submit">
			提交评论
		</view>
		<view class="mask">
			
		</view>
	</view>
</template>

<script>
	import {Post} from '../../api/request.js'
	const {log : l} = console
	
	export default{
		data() {
			return {
				merchantid:"",
				openid :"",
				inputVal:''
			}
		},
		onLoad(opt){
			l(opt)
			this.merchantid = opt.mid
			this.openid = opt.uid
		},
		methods:{
			async submit() {
				if(this.inputVal.trim().length == 0)
				{
					return uni.showToast({
						icon:"none",
						title:"内容不能为空哦"
					})
				}
				let userMes = uni.getStorageSync('userMes')
				l(userMes)
				let data = {
					messages: this.inputVal,
					avatarUrl: userMes.avatarUrl,
					nickName: userMes.nickName,
					openid: this.openid,
					merchantid:this.merchantid
				}
				let res = await Post('/message/comment',data)
				if(res[1].data.msg == "SUCCESS")
				{
					uni.showToast({
						title:"成功即将跳转",
						duration:1000
					})
					var that = this
					setTimeout(function () {
						that.$store.commit('initClickTab')
						uni.navigateTo({
							url:'/pages/takeout/takeout?id=' + that.merchantid
						})
					}, 2000)
					
				}
			}
		}
	}
</script>

<style lang = "less" scoped>
	.wrap{
		margin-top: 30upx;
		height: 620upx;
		background-color: #fff;
		textarea{
			padding: 20upx;
			height: 430upx;
			width: 100%;
			border-bottom: 2upx solid #dedede;
			font-size: 33upx;
		}
		.submit{
			text-align: center;
			font-weight: 540;
			color: white;
			height: 80upx;
			width: 60%;
			margin: 0 auto;
			border-radius: 20upx;
			line-height: 80upx;
			margin-top: 40upx;
			background-color: #ffdc2b;
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
