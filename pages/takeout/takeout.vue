<template>
	<view class="">
		<bussiness :intro = "intro"></bussiness>
		<tabs></tabs>
		<ordering v-if="clickTab == 0"></ordering>
		<message v-if = "clickTab == 1" :discussList = "discussList"></message>
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
				discussList:[]
			}
		},
		computed:{
			...mapState(['clickTab']),
			
		}
		,
		onLoad(opt){
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
				// l(this.dishList)
			},
			async getIntro(id) {
				let data = {
					openid : id
				}
				let res = await Post('/forshop/shop',data)
				this.intro = res[1].data[0]
				// l(this.intro)
			},
			async getDiscuss(id) {
				let data = {
					merchantid : id
				}
				let res = await Post('/message/discuss',data)
				this.discussList = res[1].data
				l(this.discussList)
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

<style>
</style>
