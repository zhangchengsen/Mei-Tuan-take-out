<template>
	<view>
		<search></search>
		<reference :referList = "referList"></reference>
		<delicacy></delicacy>
		<takeOut></takeOut>
	</view>
</template>

<script>
	import search from './components/search.vue'
	import delicacy from './components/delicacy.vue'
	import reference from './components/reference.vue'
	import takeOut from './components/takeOut.vue'
	import {Get} from '../../api/request.js'
	export default {
		data() {
			return {
				referList:[]
			}
		},
		components:{
			delicacy,
			search,
			reference,
			takeOut
		}
		,
		onLoad() {
			this.refer();
		},
		methods: {
			async refer() {
				// get是封装好的uni.request
				let res = await Get("/forshop/getprefer");
				res = res[1].data;
				res[res.length - 1].title = "还是重庆火锅"
				this.referList = res
			}
		}
	}
</script>

<style>

</style>
