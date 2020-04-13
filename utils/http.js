
var config = require('./config.js')


var userLogin = function(e){
	return config.postRequest("/login",e);
}
var bookshelf = function(e){
	return config.getRequest("/shelf",e);
}
var deleteBooks =  function(e){
	return config.postRequest("/delete",e);
}

// 录入模块
var findBook = function(e){
	return config.postRequestTwo("/book",e);
}
var addMyBook = function(e){
	return config.postRequestTwo('/create_book',e);
}

// 用户个人中心模块
var getUserReadType = function(e){
	return config.getRequest('/read/status',e);
}
var getAllLabel = function(e){
	return config.getRequest('/tags/search',e);
}


module.exports = {
	userLogin, // 用户登陆
	bookshelf, // 首页书架列表
	deleteBooks, // 移除书
	getUserReadType, //用户的各阅读状态数
	getAllLabel, // 标签管理
}
