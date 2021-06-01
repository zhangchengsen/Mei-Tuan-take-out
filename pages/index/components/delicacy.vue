<template>
	<view class="delicacy">
		<view class="delicacy-tool">
			<view class="front">
				<view @click="showSort"><text>{{title_name}}</text>
					<image src="/static/coen/paixu.png"></image>
				</view>
				<view @click="back">销量高</view>
				<view @click="back">速度快</view>
				<view @click="back">津贴联盟</view>
			</view>
			<view class="back" @click="showFilter">
				<text>筛选</text>
				<image src="/static/coen/shaixuan.png"></image>
			</view>
			<view class="sort" v-if="sortListVis">
				<block v-for="(item,index) in sortList" :key="index">
					<!-- 点击变亮 -->
					<view :class="{ 'active' : index == activeIndex }" @click="focus(index,item.screen,item.name)">
						{{item.name}}
					</view>
				</block>

			</view>

			<view class="feature" v-if="filterListVis">
				<!-- 上部分 -->
				<view class="feature-title">
					{{featureList.title}}
				</view>
				<view class="featureList">

					<block v-for="(item,index) in featureList.datas" :key="index">
						<view @click="labelChange(index,item.sign)" :class="{select : !item.id}">
							{{item.name}}
						</view>
					</block>
				</view>
				<!-- 中部分 -->
				<view class="feature-title">
					{{personList.title}}
				</view>
				<view class="featureList">

					<block v-for="(item,index) in personList.datas" :key="index">
						<view @click="singleSelect(index,item.per)" :class="{select : item.active}">
							{{item.name}}
						</view>
					</block>
				</view>
				<!-- 下部分 -->
				<view class="choose">
					<view class="c_left" @click = "clearAll">
						取消
					</view>
					<view class="c_right" @click = "getSelectList">
						确定
					</view>
				</view>
			</view>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="maskVis" @click="back">

		</view>
	</view>
</template>

<script>
	import {
		Post
	} from '../../../api/request.js'
	export default {
		computed: {},
		data() {
			return {
				sortList: [{
						"name": "综合排序",
						"screen": "_id",
						"nums": 1
					},
					{
						"name": "起送价最低",
						"screen": "delivering",
						"nums": 1
					},
					{
						"name": "配送费最低",
						"screen": "physical",
						"nums": 1
					},
					{
						"name": "人均高到低",
						"screen": "capita",
						"nums": -1
					},
					{
						"name": "人均低到高",
						"screen": "capita",
						"nums": 1
					}
				],
				featureList: {
					"title": "商家特色(可多选)",
					"datas": [{
							"id": 1,
							"sign": 'duration',
							"name": '配送最快'
						},
						{
							"id": 1,
							"sign": 'deliver',
							"name": '0元起送'
						},
						{
							"id": 1,
							"sign": 'physi',
							"name": '免配送费'
						}
					],
				},
				personList: {
					"title": "人均价",
					"datas": [{
							"name": "20元以下",
							"per": {
								"$lt": 20
							},
							"active": false,
						},
						{
							"name": "20-40元",
							"per": {
								"$lte": 40,
								"$gte": 20
							},
							active: false,
						},
						{
							"name": "40元以上",
							"per": {
								"$gt": 40
							},
							active: false,
						},
					]
				},
				maskVis: false,
				sortListVis: false,
				filterListVis: false,
				activeIndex: 0,
				title_name: "综合排序",
				selectList:{},
				focusMes:{}
			}

		},
		methods: {
			showFilter() {
				this.back()
				this.filterListVis = true;
				this.maskVis = true
			},
			labelChange(index,sign) {
				this.featureList.datas[index].id = !this.featureList.datas[index].id
				if(!this.featureList.datas[index].id)
					this.$set(this.selectList,sign,sign)
				else {
					this.$delete(this.selectList,sign)
				}
				console.log(this.selectList)
			},
			showSort() {
				this.back()
				this.sortListVis = true
				this.maskVis = true
			},
			back() {
				this.maskVis = false;
				this.filterListVis = false;
				this.sortListVis = false;
			},
			async focus(index, screen, name) {
				this.focusMes.screen = screen
				this.focusMes.name = name
				this.focusMes.index = index
				this.activeIndex = index;
				this.title_name = this.sortList[index].name
				let data = {
					screen,
					name
				}
				let res = await Post('/forshop/starting', data)
				this.$store.commit("setFoodData", res[1].data)

			},
			// 单选
			singleSelect(index,cap) {
				this.personList.datas.forEach((item, i) => {
					if(i == index) 
					{
						// 有就删
						if(item.active)
						{
							item.active = false
							this.$delete(this.selectList,'capita')
						}
						// 没有就加
						else {
							item.active = true;
							if(!this.selectList['capita'])
							this.$set(this.selectList,'capita',cap)
							else {
								this.selectList['capita'] = cap
							}
						}
						
					}
					// 其他清空
					else {
						item.active = false
					}
				})
				console.log(this.selectList)
			},
			// 清空全部
			clearAll() {
				this.personList.datas.forEach(item=>{
					item.active = false
				})
				// 也可以用findIndex提高性能 但数量只有三
				this.featureList.datas.forEach(item=>{
					item.id = 0
				})
				this.selectList = {}
				this.back()
				this.focus(this.focusMes.index,this.focusMes.screen,this.focusMes.name)
			},
			// 筛选后的请求
			async getSelectList() {
				if(JSON.stringify(this.seleList) == '{}')
					return 
				let res = await Post('/forshop/multiple',this.selectList)
				if(res == "没有商品数据")
				{
					 uni.showToast({
						icon:"none",
						title:"暂时没有该类商品哦,请重新筛选"
					})
				}
				else 
				
				this.$store.commit('setFoodData',res[1].data)
				this.back()
			}
		}
	}
</script>

<style scoped lang="less">
	.select {
		color: #f2b14e;
		background-color: #fff8e0 !important;
	}

	.mask {
		background: rgba(0, 0, 0, 0.2);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 3;
	}

	.active {
		color: #f4c382;
	}

	.delicacy {


		.delicacy-tool {
			background-color: #fff;
			z-index: 5;
			width: 100%;
			height: 70upx;
			display: flex;
			position: relative;

			.front {
				display: flex;
				align-items: center;
				font-size: 30upx;
				width: 80%;

				view {

					flex: 1;

					&:first-child {
						flex: 1.5;
					}

					display: flex;
					font-size: 30upx;
					align-items: center;
					justify-content: center;

					image {
						width: 30upx;
						height: 30upx;
					}
				}
			}

			.back {
				width: 20%;
				display: flex;
				align-items: center;
				padding-left: 30upx;
				font-size: 32upx;
				box-sizing: border-box;

				image {
					width: 30upx;
					height: 30upx;
				}
			}

			// 排序
			.sort {
				background-color: #fff;
				position: absolute;
				top: 100%;
				width: 100%;
				font-size: 30upx;

				view {
					height: 70upx;
					width: 100%;
					line-height: 70upx;
					border-bottom: 2upx solid #dedede;

					&:first-child {
						border-top: 2upx solid #dedede;
					}
				}
			}

			// 筛选
			.feature {
				background-color: #fff;
				position: relative;
				position: absolute;
				margin-bottom: 60upx;
				top: 100%;
				width: 100%;
				height: 600upx;

				.choose {
					border-top: 2upx solid #dedede;
					width: 100%;
					position: absolute;
					bottom: 0%;
					display: flex;

					.c_left {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.c_right {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						height: 70upx;
						background-color: #f4c382;
					}

				}

				.feature-title {
					font-size: 30upx;
					padding: 10upx 0;
				}

				.featureList {

					display: flex;
					justify-content: center;
					align-items: center;

					view {
						flex: 1;
						font-weight: 600;
						background-color: #ececec;
						margin: 16upx;
						display: flex;
						justify-content: center;
						height: 50upx;
						font-size: 28upx;
						align-items: center;
					}

				}
			}
		}

	}
</style>
