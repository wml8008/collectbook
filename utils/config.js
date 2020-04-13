const commonUrl_one =""  // 服务器域名或IP ，公共路径 one
const commonUrl_two =""  // 服务器域名或IP ，公共路径 two


function postRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		uni.request({
			url: commonUrl_one + url,
			data: postData,
			dataType:"json",
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'token': uni.getStorageSync("token")
			},
			success: function(res) {
				// 此处的code=0，只是个举例，有的可能是1等其他的，具体的看后台决定；
                //res.data.data也根据自己的后台返回层级决定，
                //有的可能是res.data.data.data等其他形式。
                //返回什么就相应的做调整
				if (true) {					
					resolve(res);
				} else {
					// 请求服务器成功，但是由于服务器没有数据返回，
                     //此时无code。会导致这个空数据 
					// 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
                    //不会被阻断在那里执行不下去！
					resolve(res.data.data);
				}
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}
 
 
function postRequestTwo(url, data) {
 	var promise = new Promise((resolve, reject) => {
 		var that = this;
 		var postData = data;
 		uni.request({
 			url: commonUrl_one + url,
 			data: postData,
 			dataType:"json",
 			method: 'POST',
 			header: {
 				'content-type': 'application/x-www-form-urlencoded',
 				'token': uni.getStorageSync("token")
 			},
 			success: function(res) {
 				// 此处的code=0，只是个举例，有的可能是1等其他的，具体的看后台决定；
                 //res.data.data也根据自己的后台返回层级决定，
                 //有的可能是res.data.data.data等其他形式。
                 //返回什么就相应的做调整
 				if (true) {					
 					resolve(res);
 				} else {
 					// 请求服务器成功，但是由于服务器没有数据返回，
                      //此时无code。会导致这个空数据 
 					// 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
                     //不会被阻断在那里执行不下去！
 					resolve(res.data.data);
 				}
 			},
 			error: function(e) {
 				reject('网络出错');
 			}
 		})
 	});
 	return promise;
 }
  
 
// get请求封装
function getRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		uni.request({
			url: commonUrl_one + url,
			data: postData,
			method: 'GET',
			header: {
				'content-type': 'application/json',
				'token': uni.getStorageSync("token")
			},
			success: function(res) {
				if (true) {
					resolve(res);
				} else {
					resolve(res.data.data);
				}
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}
 
 // get请求封装
function getRequestTwo(url, data) {
 	var promise = new Promise((resolve, reject) => {
 		var that = this;
 		var postData = data;
 		uni.request({
 			url: commonUrl_two + url,
 			data: postData,
 			method: 'GET',
 			header: {
 				'content-type': 'application/json',
 				'token': uni.getStorageSync("token")
 			},
 			success: function(res) {
 				if (true) {
 					resolve(res);
 				} else {
 					resolve(res.data.data);
 				}
 			},
 			error: function(e) {
 				reject('网络出错');
 			}
 		})
 	});
 	return promise;
 }
  
 
module.exports = {
	postRequest,
	getRequest,
	postRequestTwo,
	getRequestTwo
}
