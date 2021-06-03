import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const foodData = {
	foodList :[]
}
const clickTab = 0
// 放到数据仓库
const state = {
	foodData,
	clickTab
}
export default new Vuex.Store({
	state,
	mutations:{
		setFoodData(state,data)
		{
			console.log(data)
			if(!data)
			{
				data[0].logo = "https://th.bing.com/th/id/R0278ed560c308e90963206b65b080f9d?rik=S4%2f19mgmQwJD9Q&riu=http%3a%2f%2fwww.spaceflightfans.cn%2fwp-content%2fuploads%2f2020%2f11%2fIMG_20201112_114809.jpg&ehk=62A3Ui9u4tncny9LfJ5TrN9ahPmfh9UliO6IKjej9Xk%3d&risl=&pid=ImgRaw";
				data[0].shop = "暂时没有，请重新筛选"
			}
			state.foodData = {
				foodList: data
			}
		}
		,
		changeClickTab(state,data)
		{
			state.clickTab = data
		}
	}
	
})