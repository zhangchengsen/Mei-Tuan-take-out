let Get = function(Url){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:"https://meituan.thexxdd.cn/api" + Url,
			method:"GET",
		})
		.then(res=>{
			resolve(res)
		})
		.catch(res=>{
			reject(res)
		})
	})
}
let Post = function(Url,data){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:"https://meituan.thexxdd.cn/api" + Url,
			method:"POST",
			data:data
		})
		.then(res=>{
			resolve(res)
		})
		.catch(res=>{
			reject(res)
		})
	})
}
export {Get,Post}
