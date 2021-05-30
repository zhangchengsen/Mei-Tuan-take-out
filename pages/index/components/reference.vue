<template>
	<view class="prefer">
		<view class="pefer_title">
			为你优选
		</view>
		<view class="prefer_item">
			<!-- 滚动单 -->
			<scroll-view class="scroll" scroll-x="true" scroll-with-animation="true" >
				<view class="prefer-dis">
					<block v-for="(item,index) in referList" :key = "index" >
						<view class="prefer-view">
							<image :src="item.image" mode="aspectFill"></image>
							<text>{{item.title}}</text>
							<text>{{item.lable}}</text>
						</view>
						
					</block>
					
					
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data() {
			
			return{
				
			}
		},
		// 父组件调用接口 传递数据
		props:{
			referList:Array,
		},
		mounted(){
		}
	}
</script>

<style lang="less" scoped>
	.prefer {
		margin: 30upx;
		margin-top: 0;
		.pefer_title{
			height: 50upx;
			line-height: 50upx;
		}
		.prefer_item {
			.scroll {
				white-space: nowrap;
				width: 100%;
				height: 300upx;
				.prefer-dis {
						display: flex;
						justify-content: space-between;
						.prefer-view{
							display: flex;
							flex-direction: column;
							justify-content: center;
							width: 300upx;
							padding: 0 20upx;
							&:first-child{
								padding: 0;
							}
							image{
								height: 200upx;
								width: 300upx;
							}
							text{
							
								height: 45upx;
								font-size: 28upx;
								
								display: -webkit-box;
								overflow: hidden;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
								
								&:last-child{
									color:#C0C0C0;
									font-size: 24upx !important;
								}
							}
						}
					}
			
			}
		}

	}

	

	
</style>
