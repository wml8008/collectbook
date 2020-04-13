<template>
	<view class="readType">
		
		
				<view class="centerBox">
					<view class="typeBookItem" v-for="(v,i) in allBookList" :key="i">
						<image class="typeBookImg" src="../../static/imgs/book/1.png" @longtap="longEdit(v)"></image>
						<image class="typeStatusImg" src="../../static/imgs/book/state-1.png"></image>
						<image @tap="selectBtn(v)" v-if="v.checked != true" class="typecheckboxImg" src="../../static/imgs/book/select.png"></image>
						<image @tap="selectBtn(v)" v-else class="typecheckboxImg" src="../../static/imgs/book/select-in.png"></image>
						<view class="typeStatusTxt">已读</view>
						<view class="typeText">野兔</view>
						<view class="typeTextTs">[阿根廷]塞萨尔... ·艾拉</view>
					</view>
				</view>
				<view class="bottomNull" v-if="bottomIO == true"></view>
				
	
			<!-- 长按编辑 -->
			<view class="bottomEdit" v-if="editIo == true">
				<view class="editModel_a" v-if="longtapType == 0">
					<view class="botBtn">移除图书</view>
					<view class="botBtn">添加标签</view>
					<view class="botBtn">阅读状态</view>
					<view class="botBtn">加入书单</view>
				</view>
				<view class="editModel_b" v-else>
					<view class="botBtn">移除图书</view>
					<view class="botBtn">添加标签</view>
				</view>
			</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allBookList:[
					{name:'全部标签',value:20},
					{name:'暂无标签',value:10},
					{name:'喜欢的书',value:28},
					{name:'爱情的书',value:28},
					{name:'爱情的书',value:28},
					{name:'爱情的书',value:28},
					{name:'不太喜欢的',value:5}
				],	
				editIo: false,
				longtapType:0,
				bottomIO:false,
			};
		},
		methods: {
			longEdit(){
				this.editIo = true;
				this.bottomIO = true;
			},
			selectBtn(){
				
			}
		},
		onLoad(options){
			uni.setNavigationBarTitle({
			　　title: options.type
			})
		}
	}

</script>

<style scoped>

	.readType{
		width:100%;
		height:100%;
		overflow-x:hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.bottomNull{
		height:100rpx;
	}


</style>
