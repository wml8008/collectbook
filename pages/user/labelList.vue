<template>
	<view class="labelList">
		
		<view class="mapBox">
			<view class="labelItem" v-for="(m,i) in allLabelArr" :key="i">
				<view class="labelTit">{{m[0].alphabet}}</view>
				<view class="itemBox">
					<view class="itemLi" v-for="(n,j) in m" :key="j">{{n.name}}</view>
				</view>
			</view>
		</view>
		
		<view class="addBtn">新建标签</view>
		
		<view class="labelDesignBG" v-if="labelDesignBG == true">
			<view class="labelDesignWhite">
				<view class="labelDesignT">{{labelDesignT}}</view>
				<view class="inputBos">
					<input class="inputLabel" type="text" placeholder="请输入标签名">
				</view>
				<view class="btns">
					<view class="btn">取消</view>
					<view class="btn sure">确定</view>
				</view>
			</view>
		</view>
		
		<view class="markBg" v-if="1==0">
			<view class="mark">
				
			</view>
		</view>
		
	</view>
</template>

<script>

	import http from '../../utils/http.js'
	
	export default {
		data() {
			return {
				labelDesignT: '新建标签',
				labelDesignBG: true,
				allLabelArr:[
					[
						{id: 1, name: "最喜欢的书",alphabet:'C'},
						{id: 1, name: "最喜欢的书",alphabet:'C'},
						{id: 1, name: "最喜欢的书",alphabet:'C'}
					],
					[
						{id: 1, name: "最喜欢的书",alphabet:'D'},
						{id: 1, name: "最喜欢的书",alphabet:'D'},
						{id: 1, name: "最喜欢的书",alphabet:'D'}
					]
				],
			
			};
		},
		onLoad(){
			this.getLabelList();
		},
		methods: {
			getLabelList(){
				http.getAllLabel({}).then(res=>{
					console.log(res);
					// this.allLabelArr = res.data.list;
				})
			}
		}
	}
</script>

<style scoped>
	.labelList{
		width:100%;
		height:100%;
		background: #F7F7F7;
	}
	.mapBox{
		width:100%;
		position: absolute;
		top:0;
		bottom: 100rpx;
		overflow-x:hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.labelTit{
		height: 60rpx;
		padding-left:40rpx;
		background:rgba(247,247,247,1);
		color:#848997;
		font-size: 24rpx;
		line-height: 60rpx;
	}
	.itemBox{
		width:100%;
		background: #fff;
	}
	.itemLi{
		height: 104rpx;
		line-height: 104rpx;
		width: calc(100% - 80rpx);
		margin:auto;
		color:#333333;
		border-bottom:1rpx solid #F2F2F2;
		font-size: 30rpx;
	}
	
	.addBtn{
		width:100%;
		height:98rpx;
		background:rgba(64,169,255,1);
		position: absolute;
		bottom:0;
		left:0;
		text-align: center;
		line-height: 98rpx;
		color:#fff;
		font-size: 30rpx;
	}
	
	/*  */
	.labelDesignBG{
		width:100%;
		height:100%;
		position: absolute;
		top:0;
		left:0;
		z-index: 99;
		background: rgba(0,0,0,0.64);
	}
	.labelDesignWhite{
		width: 710rpx;
		height:372rpx;
		background: #fff;
		border-radius:20rpx;
		position: absolute;
		bottom:20rpx;
		left:20rpx;
		z-index: 100;
	}
	.labelDesignT{
		width:570rpx;
		margin:auto;
		padding-top: 80rpx;
		height:32rpx;
		line-height: 32rpx;
		font-size: 32rpx;
	}
	.inputBos{
		width:570rpx;
		margin:37rpx auto 0;
		height:40rpx;
		border-bottom:1rpx solid #ECECEC;
		padding-bottom:3rpx;
	}
	.inputBos .inputLabel{
		display: inline-block;
		width:100%;
		height:40rpx;
		font-size: 30rpx;
		color:#565E73;
		line-height: 30rpx;
	}
	.btns{
		position: absolute;
		bottom:0;
		left:0;
		height:124rpx;
		width:100%;
		border-top: 1rpx solid #F2F2F2;
	}
	.btns .btn{
		width:50%;
		height:100%;
		float:left;
		text-align: center;
		line-height: 124rpx;
		font-size:30rpx;
		font-weight:500;
		color:rgba(157,163,180,1);
	}
	.btns .btn.sure{
		color:#40A9FF;
	}
	
</style>
