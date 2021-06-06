<template>
	<view class="">
		<bussiness :intro = "intro"  ></bussiness>
		<tabs></tabs>
		<ordering   v-if="clickTab == 0" :menuList = "menuList" :dishList = "dishList" :intro = "intro"></ordering>
		<message v-if = "clickTab == 1" :discussList = "discussList" :comment = "comment" :label="label"></message>
		<introduce v-if = "clickTab == 2" :intro = "intro"></introduce>
	</view>
</template>

<script>
	import tabs from './components/tabs.vue'
	import bussiness from './components/bussiness.vue'
	import ordering from './components/ordering.vue'
	import introduce from './components/introduce.vue'
	import message from './components/message.vue'
	import {mapState} from 'vuex'
	import {Post} from '../../api/request.js'
	let {log : l} = console
	export default {
		data() {
			return {
				dishList:[],
				intro:{},
				discussList:[],
				mid:'',
				comment:[],
				label:[],
				menuList:[]
			}
		},
		computed:{
			...mapState(['clickTab']),
			
		}
		,
		onLoad(opt){
			this.mid = opt.id
			this.getDishes(opt.id)
			this.getIntro(opt.id)
			this.getDiscuss(opt.id)
		},
		methods:{
			async getDishes(id) {
				let data = {
					openid : id
				}
				let res = await Post('/forshop/getdishes',data)
				this.dishList = res[1].data
				this.doDishesList()
			},
			// 处理商品信息
			doDishesList() {
				this.dishList.forEach(v=>
				{
					this.$set(v,"nums",0)
				})
				let kinds = this.dishList.map(v=>v.optidata)
				this.menuList = Array.from(new Set(kinds))
			}
			,
			async getIntro(id) {
				let data = {
					openid : id
				}
				let res = await Post('/forshop/shop',data)
				this.intro = res[1].data[0]
				l(this.intro)
			},
			async getDiscuss(id) {
				let data = {
					merchantid : id
				}
				let res = await Post('/message/discuss',data)
				this.discussList = res[1].data
				// 数组去重以及过滤空标签
				let a = this.discussList.map(v=>v.messagedata)
				this.comment = a
				let b = this.discussList.map(v=>v.classmessage)
				let c = Array.from(new Set(b))
				c = c.filter(v=>v)
				this.label = ['全部',...c]
				// l(1)
			},
			// 标签状态改变
			async labelStateChange(msg) {
				if(msg == "全部")
				{
					let data = {
						merchantid: this.mid,
					}
					// l(msg)
					const res = await Post('/message/discuss',data)
					this.discussList = res[1].data
					let a = this.discussList.map(v=>v.messagedata)
					this.comment = a
				}
				
				else 
				{
					let data = {
						merchantid: this.mid,
						classmessage:msg
						
					}
					const res = await Post('/message/discuss',data)
					this.discussList = res[1].data
					// 只动数组动标签
					let a = this.discussList.map(v=>v.messagedata)
					this.comment = a
				}
				
			}
		},
		components:{
			bussiness,
			tabs,
			ordering,
			introduce,
			message
		}
		
	}
</script>

<style scoped>
	.fixed {
		position: fixed !important;
		left: 0 !important;
		right: 0 !important;
		bottom: 0 !important;
		top: 230upx !important;
	}
	.scroll{
		overflow-y: auto !important;
		height: 100% !important;
	}
</style>
