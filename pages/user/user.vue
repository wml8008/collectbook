
<template>
	<view class="userInforBox">
		
		<!-- 让用户进行确定 -->
		<view class="openPowerIO" v-if="openPowerIO == true">
			<view class="powerContent">
				<view class="powerTit">您还未登录</view>
				<view class="powerTitTs">请先登录后再进行操作</view>
				<view class="powerBtn">
					<button class="leftBtn" hover-class="none" @tap="cancelPower">
						暂不登陆
					</button>
					<button class="rightBtn" hover-class="none" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
						立即登录
					</button>
				</view>
			</view>
		</view>
		
		<view class="userInfo">
			<view class="userImg"><image mode="scaleToFill" :src="isCanUse==true?userInfor.avatarUrl:avatarUrl" /></image></view>
			<view class="nameBox" @tap="openPower">
				<view class="userName">{{isCanUse==true?userInfor.nickName:'点击登录'}}</view>
				<view class="nameTs">{{isCanUse==true?userId:'登录后体验更多功能'}}</view>
			</view>
		</view>
	
		<view class="statusList">
			<view @tap="gotoReadType('想读')" class="statusItem flexBox packUptodown packCenter alignCenter">
				<view class="nums">{{readTypeObj.want_read}}</view>
				<view class="statusTxt">想读</view>
			</view>
			<view @tap="gotoReadType('未读')" class="statusItem flexBox packUptodown packCenter alignCenter">
				<view class="nums">{{readTypeObj.unread}}</view>
				<view class="statusTxt">未读</view>
			</view>
			<view @tap="gotoReadType('在读')" class="statusItem flexBox packUptodown packCenter alignCenter">
				<view class="nums">{{readTypeObj.reading}}</view>
				<view class="statusTxt">在读</view>
			</view>
			<view @tap="gotoReadType('读过')" class="statusItem flexBox packUptodown packCenter alignCenter">
				<view class="nums">{{readTypeObj.read}}</view>
				<view class="statusTxt">读过</view>
			</view>
		</view>
		
		<view class="systemList">
			<view class="systemCenter">
				<navigator open-type="navigate" url="/pages/user/myBook">
					<view class="systemItem flexBox packBetween alignCenter">
						<text class="systemTxt">我的书单</text>
						<image mode="aspectFill" class="systemImg" src="../../static/imgs/menu-arrow.png"></image>
					</view>
				</navigator>
				<navigator open-type="navigate" url="/pages/user/labelList">
					<view class="systemItem flexBox packBetween alignCenter">
						<text class="systemTxt">标签管理</text>
						<image mode="aspectFill" class="systemImg" src="../../static/imgs/menu-arrow.png"></image>
					</view>
				</navigator>
				<navigator open-type="navigate" url="/pages/user/aboutUs">
					<view class="systemItem flexBox packBetween alignCenter">
						<text class="systemTxt">关于我们</text>
						<image mode="aspectFill" class="systemImg" src="../../static/imgs/menu-arrow.png"></image>
					</view>
				</navigator>
				<view class="systemItem flexBox packBetween alignCenter">
					<text class="systemTxt">分享给好友</text>
					<image mode="aspectFill" class="systemImg" src="../../static/imgs/menu-arrow.png"></image>
				</view>
			
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import http from '../../utils/http.js'

	export default {
		data() {
			return {
				openPowerIO: false, // 授权框
				isCanUse: false, // true 为已经登陆
				userId: '12',
				userInfor:{},
				avatarUrl: '/static/imgs/avatar-none.png',
				readTypeObj:{
					want_read:0,
					unread:0,
					reading:0,
					read:0
				}
			};
		},
		created(){
			let _this = this;
			_this.isCanUse = uni.getStorageSync('isCanUse');
			uni.getStorageSync('userInfor') ? _this.userInfor = JSON.parse(uni.getStorageSync('userInfor')):'';
			_this.userId = uni.getStorageSync('userId');
			this.getUserReadType();
		},
		
		methods: {
			openPower(){
				if(this.isCanUse == true){
					return false
				}else{
					this.openPowerIO = true;
				}
			},
			cancelPower(){
				this.openPowerIO = false;
			},
			
			//登录
			login() {
				let _this = this;
				uni.login({ // 1.wx获取登录用户code
					provider: 'weixin',
					success: function(loginRes) {
						if (_this.isCanUse != true) { 
							uni.getUserInfo({
								provider: 'weixin',
								success: function(res) {
									console.log(res);
									uni.setStorageSync('userInfor', JSON.stringify(res.userInfo));
								}
							});
						}
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						http.userLogin({
							code:loginRes.code,
							raw_data:uni.getStorageSync('rawData'),
							signature:uni.getStorageSync('signature'),
							encrypted_data:uni.getStorageSync('encryptedData'),
							iv:uni.getStorageSync('iv'),
						}).then( res=>{
							console.log(res)
							_this.isCanUse = true; 
							_this.userId = res.data.user_id;
							uni.setStorageSync('isCanUse',true);
							uni.setStorageSync('token',res.data.token);
							uni.setStorageSync('userId',res.data.user_id);
						})
					
						
					},
				});
			},
			//第一授权获取用户信息===》按钮触发L
			wxGetUserInfo() {
				let _this = this;
				_this.openPowerIO = false;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(res) {
						// 先删除
						uni.clearStorageSync();
						// 数据缓存
						uni.setStorageSync('rawData', res.rawData);
						uni.setStorageSync('signature', res.signature);
						uni.setStorageSync('encryptedData', res.encryptedData);
						uni.setStorageSync('iv', res.iv);
						uni.setStorageSync('userInfor', JSON.stringify(res.userInfo));
						uni.setStorageSync('isCanUse', true);//记录是否第一次授权  false:表示不是第一次授权
						_this.userInfor = res.userInfo;
						_this.login();
					},
					fail(err) {
						// console.log(err);
					}
				});
			},
			// 获取阅读状态
			getUserReadType(){
				console.log(8899)
				http.getUserReadType({}).then(res=>{
					this.readTypeObj = res.data
					console.log(res);
				})
			},
			
			
			//点击菜单跳转
			menuClick: function(index){
				uni.navigateTo({
					url: this.menuData[index].path
				})
			},
			gotoReadType(type){
				uni.navigateTo({
					url: '/pages/user/readType?type=' + type
				})
			}
		},
		
		
	}
</script>

<style scoped>
	
	.userInforBox{
		width:100%;
		height:100%;
		background: #fff;
	}
	.userInfo{
		background: #fff;
		height: 136rpx;
		width: 662rpx;
		padding-top: 36rpx;	
		margin:auto;
	}
	.userImg {
		width: 136rpx;
		height: 136rpx;
		border-radius: 50%;
		float:left;
	}
	.userImg image{
		width: 136rpx;
		height: 136rpx;
		border-radius: 50%;
	}
	.nameBox{
		float:left;
		margin:20rpx 0 0 30rpx;
	}
	.userName {
		color: #333333;
		font-size: 36rpx;
	}
	.nameTs {
		margin-top: 22rpx;
		font-size: 26rpx;
		line-height: 26rpx;
		height: 26rpx;
		color: #9DA3B4;
	}
	
	/*  */
	.statusList{
		width:670rpx;
		height:172rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 4rpx 20rpx 0rpx rgba(204,204,204,0.2);
		border-radius:20rpx;
		margin: 48rpx auto 0;
	}
	.statusItem{
		width:25%;
		height:100%;
		float:left;
	}
	.nums{
		font-size:36rpx;
		font-weight:500;
		color:rgba(64,169,255,1);
		line-height:38rpx;
	}
	.statusTxt{
		font-size:28rpx;
		font-weight:500;
		color:rgba(179,179,179,1);
		line-height:38rpx;
		margin-top:10rpx;
	}
	
	/*  */
	.systemList{
		width:100%;
		height:auto;
	}
	.systemCenter{
		width: 660rpx;
		margin:40rpx auto 120rpx;
	}
	.systemItem{
		width:100%;
		height: 124rpx;
	}
	.systemTxt{
		font-size:30rpx;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.systemImg{
		width: 10rpx;
		height:18rpx;
	}
	
	/* 授权 */
	.openPowerIO{
		width:100%;
		height:100%;
		position: absolute;
		left:0;
		top:0;
		z-index: 9999;
		background: rgba(0,0,0,0.65);
	}
	.powerContent{
		width: 650rpx;
		height: 340rpx;
		border-radius: 10rpx;
		background: #fff;
		position: absolute;
		left:50%;
		top: 300rpx;
		margin-left:-325rpx;
	}
	.powerTit{
		font-size: 36rpx;
		text-align: center;
		color:#333;
		font-weight: bold;
		height:100rpx;
		line-height: 100rpx;
		padding-top:50rpx;
	}
	.powerTitTs{
		font-size: 26rpx;
		text-align: center;
		color:#CCCCCC;
		font-weight: bold;
		height: 50rpx;
	}
	.powerBtn{
		width:100%;
		height:98rpx;
		border-top: 2rpx solid #F2F2F2;
		margin-top:40rpx;
	}
	.powerBtn button{
		width:50%;
		text-align: center;
		line-height: 98rpx;
		font-size: 30rpx;
	}
	.leftBtn{
		border-right: 1rpx solid #F2F2F2;
		box-sizing: border-box;
	}
	.rightBtn{
		color:#40A9FF;
	}
	
</style>
