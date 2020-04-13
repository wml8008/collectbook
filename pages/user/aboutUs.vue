<template>
	<view class="aboutUs">
		
		<view class="aboutTop">
			<view class="imgBox"></view>
			<view class="edition">v 1.0.1</view>
		</view>
		
		<view class="aboutList">
			<view class="aboutItem">
				<view class="leftTxt">商务合作</view>
				<view class="rightInfor">
					<image class="toRight" mode="scaleToFill" src="../../static/imgs/menu-arrow.png"></image>
					<view class="txt">i@ude.io</view>
				</view>
			</view>
			<view class="aboutItem">
				<view class="leftTxt">关注公众号</view>
				<view class="rightInfor">
					<image class="toRight" mode="scaleToFill" src="../../static/imgs/menu-arrow.png"></image>
					<view class="txt">广东优德科技</view>
				</view>
			</view>
			<view class="aboutItem">
				<view class="leftTxt">用户交流群</view>
				<view class="rightInfor">
					<image class="toRight" mode="scaleToFill" src="../../static/imgs/menu-arrow.png"></image>
					<view class="txt">12345678</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				
			};
		},
		methods: {
			
		}
	}

</script>

<style scoped>
	.aboutUs{
		width:100%;
		height:100%;
		background: #ffffff;
	}
	.aboutTop{
		width:100%;
		height:322rpx;
		padding-top:90rpx;
	}
	.imgBox{
		width:216rpx;
		height:216rpx;
		background:rgba(191,191,191,1);
		border-radius:12rpx;
		margin:auto;
	}
	.edition{
		text-align: center;
		margin-top:45rpx;
		font-size:24rpx;
		font-weight:500;
		color:rgba(179,179,179,1);
	}

	/*  */
	.aboutList{
		width:650rpx;
		margin:44rpx auto 0;
	}
	.aboutItem{
		width:100%;
		height: 104rpx;
	}
	.leftTxt{
		float:left;
		line-height: 104rpx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		font-size:30rpx;
	}
	.rightInfor{
		height:100%;
		float:right;
	}
	.txt{
		font-size:28rpx;
		font-weight:500;
		color:rgba(157,163,180,1);
		float:right;
		line-height: 104rpx;
	}
	.toRight{
		width:12rpx;
		height:20rpx;
		float:right;
		margin-top:44rpx;
		margin-left:30rpx;
	}
	
</style>
