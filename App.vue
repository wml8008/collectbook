<script>
	export default {
		globalData: {
			isIphoneX: false,
			screenWidth: 375,
			screenHeight: 800,
			statusBarHeight: 20,
			code: '',
			token: ''
		},
		onLaunch: function() {
			console.log('App Launch');
			let that = this;
			
			let systemInfo = uni.getSystemInfoSync();
			this.$options.globalData.screenWidth = systemInfo.screenWidth;
			this.$options.globalData.screenHeight = systemInfo.screenHeight;
			this.$options.globalData.statusBarHeight = systemInfo.statusBarHeight;
			console.log(this.$options.globalData.statusBarHeight)
			
			//检测是否iphoneX系列，主要用于小程序端
			if (systemInfo.model.indexOf('iPhone X') > -1) {
			  this.$options.globalData.isIphoneX = true;
			}
			
			//检测是否iphone11系列，主要用于小程序端
			if (systemInfo.model.indexOf('iPhone 11') > -1) {
			  this.$options.globalData.isIphoneX = true;
			}
			
			
			//小程序获取code登录
			//#ifdef MP-WEIXIN
				wx.login({
					success:function(res){
						that.$options.globalData.code = res.code;
						
						//
					}
				})
			//#endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
	/*隐藏滚动条*/
	::-webkit-scrollbar{
		width: 0;
		height: 0;
		color: transparent;
	}
	/*禁止长按默认事件*/
	.uni-page-head, .uni-page-head * {
		pointer-events: none;
		-webkit-touch-callout:none;
		-webkit-user-select:none;
		-khtml-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
		user-select:none;
	}
	
	/* 全局样式 */
	page{
		width:100%;
		height:100%;
	}
	/* ===弹性布局的兼容写法==== */
	.flexBox{
		display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
		display: -moz-box; /* 老版本语法: Firefox (buggy) */
		display: -ms-flexbox; /* 混合版本语法: IE 10 */
		display: -webkit-flex; /* 新版本语法: Chrome 21+ */
		display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
	}
	/*主轴从上至下*/
	.packUptodown {
	   -webkit-box-direction: normal;
	    -webkit-box-orient: vertical;
	    -moz-flex-direction: column;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	}
	/*主轴居左*/
	.packStart {
	    -webkit-box-pack: start;
	    -moz-justify-content: flex-start;
	    -webkit-justify-content: flex-start;
	    justify-content: flex-start;
	}
	/*主轴居中*/
	.packCenter {
	    -webkit-box-pack: center;
	    -moz-justify-content: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	}
	/*主轴居右*/
	.packEnd {
	    -webkit-box-pack: end;
	    -moz-justify-content: flex-end;
	    -webkit-justify-content: flex-end;
	    justify-content: flex-end;
	}
	/*主轴两边*/
	.packBetween{
		-webkit-box-pack:justify;
		-webkit-justify-conent:space-between;
		-ms-flex-pack:justify;
		justify-content: space-between;
	}
	
	/*交叉轴居左对齐*/
	.alignStart {
	    -webkit-box-align: start;
	    -moz-align-items: start;
	    -webkit-align-items: flex-start;
	    align-items: flex-start;
	}
	/*交叉轴居中对齐*/
	.alignCenter {
	    -webkit-box-align: center;
	    -moz-align-items: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	/*交叉轴居右对齐*/
	.alignEnd {
	    -webkit-box-align: end;
	    -moz-align-items: end;
	    -webkit-align-items: flex-end;
	    align-items: flex-end;
	}
	
	/* 书城列表、想读列表、在读列表 */
	.centerBox{
		width:calc(100% - 72rpx);
		margin:auto;
		padding: 30rpx 0rpx;
		zoom: 1;
	}
	.centerBox:after{
		content:'';
		display:block;
		clear:both;
		height:0;
		overflow:hidden;
		visibility:hidden;
	}
	.centerBox .typeBookItem{
		width:190rpx;
		height:438rpx;
		float:left;
		position: relative;
	}
	.centerBox .typeBookItem:nth-child(3n-1){
		margin:0 54rpx;
	}
	.centerBox .typeBookImg{
		width:190rpx;
		height:266rpx;
	}
	.centerBox .typeStatusImg{
		position: absolute;
		width:72rpx;
		height:34rpx;
		bottom:172rpx;
		left:0;
		z-index: 3;
	}
	.centerBox .typeStatusTxt{
		position: absolute;
		width:72rpx;
		height:34rpx;
		bottom:172rpx;
		left:0;
		z-index: 4;
		font-size: 20rpx;
		color:#fff;
		text-align: center;
		line-height: 34rpx;
	}
	.centerBox .typecheckboxImg{
		position: absolute;
		width:50rpx;
		height:50rpx;
		top:-10rpx;
		right:-10rpx;
	}
	.centerBox .typeText{
		width:100%;
		font-size: 26rpx;
		color:#333;
	}
	.centerBox .typeTextTs{
		font-size: 24rpx;
		color:#9DA3B4;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	
	/* 长按书底部操作 */
	.bottomEdit{
		width: 100%;
		height: 98rpx;
		background: #ffffff;
		color:#D6D6D6;
		font-size: 30rpx;
		position: absolute;
		bottom:0;
		left:0;
		z-index: 999;
		border-top:1rpx solid #EEEEEE;
	}
	.bottomEdit .upColorIO{
		color:#40A9FF;
	}
	.bottomEdit .upColorIO_add{
		color:#333;
	}
	.editModel_a,.editModel_b{
		width: 100%;
		height:100%;
	}
	.editModel_a .botBtn{
		width:25%;
		height:100%;
		text-align: center;
		line-height: 98rpx;
		float:left;
	}
	.editModel_b .botBtn{
		width:50%;
		height:100%;
		text-align: center;
		line-height: 98rpx;
		float:left;
	}
	
	/* 去掉 button 默认样式  */
	button::after {
	    border: none;
	}
	button{
		border:none;
		margin:0;
		padding:0;
		display: inline-block;
		line-height: normal;
		border-radius: 0;
		background: #fff;
		text-align: left;
	}
	
	
	
</style>
