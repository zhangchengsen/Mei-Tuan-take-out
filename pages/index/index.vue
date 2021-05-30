<template>
	<view>
		<search></search>
		<reference></reference>
		<delicacy></delicacy>
		<takeOut></takeOut>
	</view>
</template>

<script>
	import search from './components/search.vue'
	import delicacy from './components/delicacy.vue'
	import reference from './components/reference.vue'
	import takeOut from './components/takeOut.vue'
	
	export default {
		data() {
			return {
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

		},
		methods: {

		}
	}
</script>

<style>

</style>
