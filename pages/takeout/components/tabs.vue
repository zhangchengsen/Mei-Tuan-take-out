<template>
	<view class="wrap">
		<block v-for="(item,index) in tabList" :key = "index">
			<text :class="{'active' : activeIndex == index }" @click = "changeTab(index)">{{item}}</text>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:0,
				tabList:['点菜','评价','商家']
			}
		},
		methods:{
			changeTab(index) {
				this.activeIndex = index;
				this.$store.commit('changeClickTab',index)
			}
		}
	}
</script>

<style scoped lang="less">
	.wrap {
		margin-top: 20upx;
		margin-bottom: 20upx;
		height: 70upx;
		line-height: 70upx;
		text {
			font-size: 36upx;
			display: inline-block;
			margin-left: 50upx;
			&:first-child{
				margin-left: 20upx;
			}
		}
	}
	.active{
		font-size: 42upx;
		font-weight: 700;
		border-bottom: 4upx solid #ffff1a;
	}
</style>
