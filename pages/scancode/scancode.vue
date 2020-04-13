<template>
	<view class="addbook">
		
		<view class="findBox" >
			<view class="findCenter" @tap="gotoFind">
				<image class="findImg" src="../../static/imgs/entry_icon_search_default.png"></image>
				<input class="findInput" disabled="true" type="text" placeholder-style="color:#B3B3B3;" placeholder="书名、作者、ISBN">
				<view class="findBtn">搜索</view>
			</view>
		</view>
		
		<view class="sweepCode">
			<image class="sweepCodeImg" mode="scaleToFill" src="../../static/imgs/bookshelf_pic_default.png"></image>
		</view>
		<view class="sweepCodeTs">扫码书籍条形码，录入书籍信息</view>
		
		<view class="sweepCodeBtn">扫描书籍条形码</view>
	
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				bookTitle:'',
				titleMsg: '请先扫码',
				isbn: ''
			}
		},
		methods: {
			gotoFind(){
				uni.navigateTo({
					url: '/pages/scancode/find'
				})
			},
			scanCode: function(){
				let that = this;
				//判断是否在微信浏览器中
				if(this.$jswx){
					this.$jswx.scanQRCode({
					needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function (res) {
					var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					}
					});
				}
				else {
					uni.scanCode({
						scanType: 'barCode',
						success: function (res) {
							
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
							
							that.isbn = res.result
							
							uni.request({
								url: 'https://wx.s2.hiiyun.com/apis/book', 
								method: 'POST',
								data: {
									i:res.result  //'978751430687'
								},
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								success: (res) => {
									if(res.data.status==200){
										console.log(that.bookTitle)
										console.log(res.data);
										that.bookTitle = res.data.data[0].title
									}
									else {
										that.titleMsg = res.data.data.msg
									}
									
								}
							});
						},
						fail: function(res) {
							that.titleMsg = '连接后台失败'
							console.log(res)
						}
					});				
				}
				
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scoped>
	.findBox{
		width:100%;
		padding-top:40rpx;
	}
	.findCenter{
		width:670rpx;
		height: 84rpx;
		margin:auto;
		background: #F9F9F9;
		border-radius: 42rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.findImg{
		width: 34rpx;
		height:34rpx;
		margin:0 20rpx 0 40rpx;
	}
	.findInput{
		display: inline-block;
		color:#333;
		font-size: 28rpx;
		width: 400rpx;
	}
	.findBtn{
		display: inline-block;
		width: 180rpx;
		height:100%;
		background: #40A9FF;
		border-radius: 42rpx;
		line-height: 84rpx;
		text-align: center;
		color:#fff;
		font-size: 28rpx;
		float:right;
	}
	
	/*  */
	.sweepCode{
		width: 548rpx;
		height:376rpx;
		margin:125rpx auto 0;
	}
	.sweepCode .sweepCodeImg{
		width: 100%;
		height:100%;
	}
	.sweepCodeTs{
		text-align: center;
		font-size:28rpx;
		color:#B3B3B3;
		margin: 40rpx 0 50rpx 0;
	}
	.sweepCodeBtn{
		width: 510rpx;
		height:104rpx;
		border-radius: 52rpx;
		background: #40A9FF;
		margin:auto;
		font-size: 30rpx;
		color:#fff;
		line-height: 104rpx;
		text-align: center;
	}
	
</style>
