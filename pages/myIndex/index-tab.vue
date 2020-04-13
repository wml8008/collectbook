<!-- tabData数据格式：
	tabData: [
		{	//一个tab选项
		
			text: '分类',
			seleIndex: 0,	//当前选中的下拉选项
			dropData: [
				{	//一个下拉选项
					title: '全部分类',		
					amount: '11651',
					type: 0
				}//..可以多个下拉选项
				
		}//...可以多个下拉选项
-->

<template>
<view>
	<view class="box-block" :style="{top:boxTop}" @touchmove.stop.prevent="maskmove" catchtouchmove="false">
		<view class="tab-box">
			<view :class="['item',tabIndex==index?'in':'']" v-for="(item, index) in tabData2" :key="index" @click="tabChange(index)">
				<view :class="['text-box']">
					<view class="text">{{item.text}}</view>
					<view class="line" v-if="tabIndex==index"></view>
				</view>
				<view :class="['arrow', dropOpen?'open':'',]"><image src="/static/imgs/book-tab-arrow.png"></image></view>
			</view>
		</view>
		
		<!--  #ifdef  MP-WEIXIN --><!--行内样式用upx在小程序里不生效, 故使用rpx-->
		<scroll-view scroll-y="true" :class="['drop','block', dropOpen?'open':'']" :style="{height: dropOpen? Math.ceil(tabData2[tabIndex].dropData.length/2) * 82+ 'rpx' : '' }">
		<!--  #endif -->
		<!--  #ifndef MP-WEIXIN -->
		<scroll-view scroll-y="true" :class="['drop','block', dropOpen?'open':'']" :style="{height: dropOpen? Math.ceil(tabData2[tabIndex].dropData.length/2) * 82+ 'upx' : '' }">
		<!--  #endif -->
			<view :class="['item-box', tabData2[tabIndex].seleIndex==index?'in':'']" v-for="(item, index) in tabData2[tabIndex].dropData" :key="index">
				<view class="item" @click="seleChange(tabIndex ,index)">{{item.title+' '}}<text class="amount">({{item.amount}})</text></view>
			</view>
		</scroll-view>
	</view>
	
	<!--占位-->
	<view style="height: 96upx;"></view>
	
	<view :class="['mask','block', dropOpen?'open':'']" @click="dropOff" @touchmove.stop.prevent="maskmove" catchtouchmove="false" ></view>
</view>
</template>

<script>
	export default {
		props: [
				'tabData'
		],
		data() {
			return {
				//#ifdef H5
					boxTop: '0',
				//#endif
				
				//#ifndef H5
					boxTop: 0,
				//#endif
				
				tabData2: [
					{	//一个tab选项
					
						text: '分类',
						seleIndex: 0,	//当前选中的下拉选项
						dropData: []
					}
				],
				
				tabIndex: 0,
				
				dropOpen: false,
				
				//是否有移动
				maskMove: false,
				
				timeID: ''
			}
		},
		methods: {
			//tab被点击时
			tabChange: function(index){
				
				if(index==this.tabIndex) {
					//下拉展开取反
					this.dropOpen = !this.dropOpen
				}
				else {
					this.tabIndex = index
					this.dropOpen = false
				}
			}
			
			//下拉关闭
			,dropOff: function(){
				this.dropOpen = false
			},
			
			//蒙版触摸转换成点击
			maskstart: function(){
			},
			maskmove: function(){
				this.maskMove=true;
			},
			maskend: function(){
				let that = this;
					if(!this.maskMove) {
						this.dropOff()
					}	
				
				this.maskMove=false;
			},
			
			//下拉内容选择改变时
			seleChange: function(tabIndex, index){
				this.tabData2[tabIndex].seleIndex = Number(index);
				this.tabData2[tabIndex].text = this.tabData2[tabIndex].dropData[index].title;
				this.dropOpen = false
			}
		},
		
		//渲染完成后
		mounted: function(){
			this.tabData2 = this.tabData
		},
		watch: {
		　　tabData:{
				handler: function(newVal,oldVal){
					this.tabData2 = this.tabData
				},	
		　　　　deep:true
		　　}
		}
	}
</script>

<style>
	
	.box-block {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 30;
	}
	
	.mask.block {
		z-index: -2;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: 0;
	}
	
	.mask.block.open {
		opacity: 0.64;
		z-index: 28;
	}
	
	.tab-box {
		background: #fff;
		height: 96upx;
		width: 100%;
		padding-bottom:1px;
		
		
		
		
	}



.item {
			width: 50%;
			height: 96upx;
			float: left;
			text-align: center;
			
			
			
			
			
			 
				
		}
.text-box {
				display: inline-block;
				
				
			}
.text {
					font-size: 32upx;
					color: #9da3b4;
					height: 72upx;
					line-height: 72upx;
				}
				
				.line {
					width: 24upx;
					height: 4upx;
					background-color: #40a9ff;
					border-radius: 2upx;
					margin:0 auto;
				}

.arrow {
				opacity: 0;
				display: inline-block;
				width: 14upx;
				height: 14upx;
				padding: 30upx 0 0 9upx; 
				vertical-align: top;
				
				
			}
.arrow image {
					display: block;
					width: 100%;
					height: 100%;
					transform:rotate(180deg);
					transition: transform 0.3s;
				}
.arrow.open image {
					transform:rotate(0deg);
				}
			
		.item.in  .text {
				color: #333;
				font-weight: bold;
			}
			.item.in  .arrow {
				opacity: 1;
			}
	//下拉展示
	.drop.block {
		position: relative;
		top: -1px;
		padding: 0;
		height: 0;
		max-height: 410upx;
		background-color: #f6f6f6;
		transition: 0.3s;
		overflow: hidden;
		border-radius: 0px 0px 20upx 20upx;
	}
	
	
	.item-box {
		width: 50%;
		float: left;
	}
		
	.item {
		height: 82upx;
		line-height: 82upx;
		padding: 0 40upx;
		font-size: 26upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		
		
	}
	.amount {
		color: #848997;
	}
	.item-box.in .item {
		color: #40a9ff;
		font-weight: bold;
		
		
	}
	.amount {
		color: #40a9ff;
	}
	.drop.block.open {
		padding: 24upx 0;
	}

</style>
