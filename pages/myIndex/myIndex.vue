<template>
	<view class="home">
		
		<view class="typeChangeBtn">
			<view class="typeItem">
				<text :class="typeIndex == 0?'typeIndexAction':''">{{typeTxt}}</text>
				<image class="typeImg" src="../../static/imgs/book-tab-arrow.png"></image>
			</view>
			<view class="typeItem">
				<text :class="typeIndex == 1?'typeIndexAction':''">{{labelTxt}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				typeTxt:'分类',
				labelTxt:'标签',
				typeIndex:0,
				typeIndexAction:'typeIndexAction',
				
			
			}
		},
		
		//初始化
		mounted() {
			
		},
		watch:{
			
		},
		methods: {
		
			
		},
		components: {
			
			
		}
	}
</script>

<style scoped>
	.home{
		width:100%;
		height:100%;
	}

	
	
</style>
