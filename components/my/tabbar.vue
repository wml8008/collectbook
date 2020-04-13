<template>
	<view class='tabbar-box'>
		
		<view class="itemtab" v-for="(item, index) in tabData" :key="index" @tap="toPage(index)">
			<view class="imgbox">
				<image  :src="item.iconUrlIn" ></image>
				<!-- <image v-else :src="item.iconUrl" ></image> -->
			</view>
			
		</view>
		
		
		
		
	</view>
</template>

<script>
	export default {
		props: ['message'],
		data() {
			return {
				isIphoneX: false,
				tabData:[
					{
						iconUrl: '../../static/imgs/tabBar/1.png',
						iconUrlIn:'../../static/imgs/tabBar/1-in.png',
						path: '/pages/index/index'
					},
					// {
					// 	iconUrl: '../../static/imgs/tabBar/2.png',
					// 	iconUrlIn:'../../static/imgs/tabBar/2-in.png',
					// 	path: '/pages/scancode/scancode'
					// },
					// {
					// 	iconUrl: '../../static/imgs/tabBar/3.png',
					// 	iconUrlIn:'../../static/imgs/tabBar/3-in.png',
					// 	path: '/pages/index/index'
					// },
					{
						iconUrl: '/static/imgs/tabBar/4.png',
						iconUrlIn:'/static/imgs/tabBar/4-in.png',
						path: '/pages/user/user'
					}
				]
			}
		},
		created: function(){
			this.isIphoneX = getApp().globalData.isIphoneX
		},
		methods: {
			toPage: function(index){
				if(index == this.selectindex) 
				{
					return;
				}
				else {
					this.$emit('changeIndex', index)
				}
			}
		}
	}
</script>

<style>
	.tabbar-box {
		width:100%;
		height: 98rpx;
		background: #f00;
	}
	.tabbar-box .itemtab {
		height:100%;
		width: 25%;
		background: #0f0;
		float:left;
	}
	.imgbox{
		height:100%;
		width: 100%;
	}
	.itemtab image {
		display: inline-block;
		width: 44rpx;
		height:44rpx;
	}
	
		
</style>
