<!--底部弹出的操作块
	mode值：
		1.添加标签
		2.新建，或者说填写框
		
	@toNew: 点击了新建 
-->
<template>
	<view class="box">
		<view :class="['inquiry-box', open?'in':'', isIphoneX?'ipx':'', mode?'mode'+mode:'']" @click.stop>
			<view class="title block" v-if="mode==1">{{title}}<view v-if="mode==1" class="add-label"><image src="../../static/imgs/book/add.png"></image>新建标签</view></view>
			<view class="title2 block" v-if="mode==2">{{title}}</view>
			<view class="button block">
				<view class="item left" @click="myCancel">取消</view>
				<view class="item right" @click="mySucc">确定</view>
			</view>
		</view>
		
		<view class="mask" v-if="open" @click.stop="maskClick"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isIphoneX: false,
				
				open: false,
				title: '',
				
				mode: 0
			}
		},
		//加载数完成
		mounted: function (){
			this.isIphoneX = getApp().globalData.isIphoneX
		},
		
		methods: {
			//展示
			toOpen: function(propOb){
				this.title = propOb.title||undefined
				this.mode = propOb.mode||undefined
				this.succ = propOb.success;
				this.cancel = propOb.cancel;
				this.open = true;
				
			},
			
			//点击遮罩关闭
			maskClick: function(){
				this.open = false
				this.cancel()
			},
			
			//点击确认
			mySucc: function(){
				this.open = false
				this.succ()
			},
			
			//点击取消
			myCancel: function(){
				this.open = false
				this.cancel()
			}
		}
		
	}
</script>

<style scoped>
	.box {
		height: 0;
		width: 0;
	}
	
	.inquiry-box {
		opacity: 0;
		position: fixed;
		z-index: -10;
		bottom: 20upx;
		width: 710upx;
		margin: 0 20upx;
		left: 0;
		height: 0;
		background: #fff;
		border-radius: 20upx;
		overflow: hidden;
		transition: opacity 0.3s;
		
		
	}
	
	.add-label {
		position: absolute;
		top: 0;
		right: 50upx;
		height: 124upx;
		line-height: 124upx;
		font-weight: normal;
		color: #565e73;
		font-size: 30upx;;
		padding-left: 43upx;
		height: 124upx;
		
		
	}
	.title.block {
		position: absolute;
		padding: 0 49upx;
		height: 124upx;
		line-height: 124upx;
		top: 0;
		left: 0;
		right:0;
		overflow: hidden;
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
		
	
	}
	
	.button.block {
		position: absolute;
		bottom:0;
		left:0;
		border-top: 1px solid #f2f2f2; ;
		height: 124upx;
		width: 710upx;
		margin: 0 auto;
		
		
	}
	image {
		position: absolute;
		display: block;
		top: 46upx;
		left: 0upx;
		height: 32upx;
		width: 32upx;
	}
	
	.item {
		float: left;
		width: 50%;
		height: 124upx;
		line-height: 124upx;
		font-size: 30upx;
		text-align: center;
		overflow: hidden;
	}
	.item.left {
		color: #9da3b4;
	}
	.item.right {
		color: #40a9ff;
	}
	
	.inquiry-box.in {
		opacity: 1;
		z-index: 500;
		height: 300px;
	}
	
	.inquiry-box.in.mode2{
		height: 372upx;
	}
	
	.inquiry-box.ipx{
		bottom: 88upx;
	}
	
	.mask {
		position: fixed;
		z-index: 450;
		opacity: 0.64;
		background: #000;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
</style>
