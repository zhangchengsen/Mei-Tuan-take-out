<template>
	<view>
		<search></search>
		<reference :referList = "referList"></reference>
		<rec></rec>
		<view @click="scrollTo">
			<delicacy id="boxFixed" :class="{'is_fixed' : isfixed}" :catchtouchmove="true"></delicacy>
		</view>
		<takeOut :foodList = "foodList"></takeOut>
	</view>
</template>

<script>
	import search from './components/search.vue'
	import delicacy from './components/delicacy.vue'
	import rec from './components/rec.vue'
	import reference from './components/reference.vue'
	import takeOut from './components/takeOut.vue'
	import {Get} from '../../api/request.js'
	import {mapState} from 'vuex'
	
	
	export default {
		data() {
			return {
				referList: [],
				rect: '',
				topdata: '',
				isfixed:false,
				menutop:'',
				foodList:[]
			}
		},
		components: {
			delicacy,
			search,
			rec,
			reference,
			takeOut
		},
		onLoad() {
			
		},
		onPageScroll(e) {
			// console.log(e.scrollTop)
			this.rect = e.scrollTop
		},
		mounted() {
			this.refer();
			
		},
		created(){
			// 监听筛选组件距离顶部的距离
			const query = wx.createSelectorQuery()
			query.select('#boxFixed').boundingClientRect()
			query.exec((res) => {
				this.menutop = res[0].top
				console.log(this.menutop)
				this.topdata = res[0].top
			})
			this.nearFood()
		}
		,
		onLoad() {
			this.refer();
		},

		computed: {
			// 监听筛选组件置顶和不置顶
			namepage() {
				// console.log('我是自动执行的')
				// 如果页面滚动的高度大于筛选组件距离顶部的高度，那就置顶，反之不置顶
				if (this.rect >= this.menutop + 10) {
					// console.log('置顶')
					this.isfixed = true
				} 
				else {
					// console.log('不置顶')
					this.isfixed = false
				}
			},
			...mapState(['foodData']),
			foodChange() {
				this.foodList = this.foodData.foodList
			}
		},

		methods: {
			async refer() {
				// get是封装好的uni.request
				let res = await Get("/forshop/getprefer");
				res = res[1].data;
				res[res.length - 1].title = "还是重庆火锅"
				this.referList = res
			},
			async nearFood(){
				let res = await Get("/forshop/wxshop")
				res = res[1].data;
				this.foodList = res
				
			}
			,
			
			scrollTo(){
				uni.pageScrollTo({
				    scrollTop: this.topdata + 6,
				    duration: 300
				});
			}
		}
	
	}
</script>
<style>
.is_fixed{position: fixed; left: 0; top: 0; right: 0;}
</style>
