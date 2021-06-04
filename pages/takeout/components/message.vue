<template>
	<view class="wrap">
		
		<view class="label" >
			<block v-for = "(item,index) in label" :key = "index">
				<text @click = "sortLabel(item,index)" :class = "{'active' : index == activeIndex}">{{item}}</text>
			</block>
		</view>
		<block v-for = "(item,index) in comment" :key = "index">
			<view class="view">
				<!-- 上部 -->
				<view class="v_top">
					<view class="t_left">
						<image :src="item.avatarUrl"></image>
						<view class="">
							{{item.nickName}}
						</view>
					</view>
					
					<view class="time">
						{{item.time}}
					</view>
				</view>
				<!-- 上部 -->
				<view class="word">
					{{item.usermess}}
				</view>
			</view>
			
			
		</block>
	</view>
</template>

<script>
	let {log : l} = console
	export default{
		props:{
			discussList:Array,
			comment:Array,
			label:Array
		},
		data() {
			return {
				activeIndex:0
			}
		},
		methods:{
			sortLabel(msg,index) {
				this.activeIndex = index
				this.$parent.labelStateChange(msg)
			}
		},
		computed:{
			abc() {
				
			}
		}
		
	}
</script>

<style scoped lang="less">
	.active{
		background-color:#ffe72a;
		
		border: none !important;
	}
	.wrap{
		margin-left: 20upx;
		margin-right: 20upx;
		.label{
			font-size: 30upx;
			text{
				display: inline-block;
				padding: 10upx;
				border: 2upx solid #eee;
				font-weight: 700;
				margin-top: 20upx;
				margin-left: 20upx;
			}
		}
		.view{
			margin-top: 40upx;
			padding-bottom: 20upx;
			border-bottom: 4px solid #f1f1f1;
			.v_top{
				height: 70upx;
				color: #383838;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 38upx;
				.t_left{
					display: flex;
					justify-content: center;
					align-items: center;
					line-height: 1.3;
					image{
						width: 60upx;
						height: 60upx;
						border-radius: 50%;
						margin-right: 10upx;
					}	
				}
				.time{
					font-size: 30upx;
				}

				
				
			}
			.word{
				margin-top: 10upx;
				font-size: 32upx;
				color: #383838;
			}
		}
	}
</style>
