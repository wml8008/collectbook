import Vue from 'vue'
import App from './App'

//判断是否在微信浏览器中

// function isFromWeiXin() {
//     var ua = navigator.userAgent.toLowerCase();
//     if (ua.match(/MicroMessenger/i) == "micromessenger") {
//         return true;
//     }
//     return false;
// }

// if(isFromWeiXin()){
// 	console.log('在微信中打开')
// 	var jweixin = require('jweixin-module')
// 	jweixin.ready(function(){ 
// 	});
	
// 	jweixin.config({
// 	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
// 	    appId: '', // 必填，公众号的唯一标识
// 	    timestamp: undefined, // 必填，生成签名的时间戳
// 	    nonceStr: '', // 必填，生成签名的随机串
// 	    signature: '',// 必填，签名
// 	    jsApiList: [] // 必填，需要使用的JS接口列表
// 	});
	
// 	if(!Vue.prototype.$jswx){
// 		Vue.prototype.$jswx = jweixin
// 	}
// }



//引入自己封装的ajax模块，并挂载到vue中


Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
