<template>
	<view class="findPage">
		
		<view class="findBox" >
			<view class="findCenter flexBox alignCenter">
				<image class="findImg" src="../../static/imgs/search_icon_search_default.png"></image>
				<input :value="findInputTxt" class="findInput" @input="findbook" type="text" placeholder-style="color:#B3B3B3;" placeholder="书名、作者、ISBN">
			</view>
		</view>
		
		<view v-if="1==0">
			<view class="tit">热门搜索</view>
			<view class="popularList">
				<view class="popularItem">小世界其乐无穷</view>
				<view class="popularItem">你是我生命的四分之三</view>
				<view class="popularItem">小世界其ssW</view>
			</view>
			<view class="tit">历史搜索</view>
			<view class="historyList">
				<view class="historyItem" @tap="findInput('凡人修仙传')">
					<image class="hisImg" mode="scaleToFill" src="../../static/imgs/entry_icon_search_default.png"></image>
					<view class="hisTxt">凡人修仙传</view>
					<image class="hisImgR" mode="scaleToFill" src="../../static/imgs/search_icon_link_visited.png"></image>
				</view>
				<view class="historyItem"  @tap="findInput('一起上梁山做好汉')">
					<image class="hisImg" mode="scaleToFill" src="../../static/imgs/entry_icon_search_default.png"></image>
					<view class="hisTxt">一起上梁山做好汉</view>
					<image class="hisImgR" mode="scaleToFill" src="../../static/imgs/search_icon_link_visited.png"></image>
				</view>
				<view class="clearHis">清空输入历史</view>
			</view>
		</view>
		<view v-else class="findListBox">
			<view class="findList">
				<view class="findItem" v-for="(item,index) in 6" :key="index">
					<image class="findItemImg" mode="scaleToFill" src="../../static/imgs/book/2.png"></image>
					<view class="findItemTxt">
						<view class="findName">天上地下</view>
						<view class="findTs">[日]陈舜臣</view>
					</view>
					<view class="addBookBtn" :class="index == 0?'notAdd':''" @tap="addMyBook(item)">加入书架</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				findInputTxt:'',
				notAdd:'notAdd', // 灰按钮
				findList:[], // 搜索回来的列表
				
			};
		},
		onLoad(){
			
		},
		methods: {
			findBook(){
				this.findList = [];
			},
			findInput(value){
				this.findInputTxt = value;
				this.findBook();
			},
			// 加入书架
			addMyBook(item){
				var params = {
					title: item.title,
					author: item.author,
					press: item.press,
					cover: item.cover,
					pubtime: item.pubtime,
					pagenum: item.pagenum,
					isbn: item.isbn,
					contentintro: item.contentintro,
					authorintro: item.authorintro,
					title: item.category,
				}
				http.addMyBook(params).then(res=>{
					
				});
			}
		}
	}
</script>

<style scoped>
	.findPage{
		height:100%;
	}
	.findBox{
		width:100%;
		border-bottom:1rpx solid #EEEEEE;
	}
	.findCenter{
		width:670rpx;
		height: 84rpx;
		margin:auto;

	}
	.findImg{
		width: 34rpx;
		height:34rpx;
		margin:0 20rpx 0 0;
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
	.tit{
		width:690rpx;
		margin:30rpx auto 30rpx;
		font-size:28rpx;
		font-weight:500;
		color:rgba(157,163,180,1);
		line-height:38rpx;
	}
	.popularList{
		zoom: 1;
		width:690rpx;
		margin:auto;
	}
	.popularList:after{
		 content:".";
		clear:both; 
		display:block; 
		height:0; 
		overflow:hidden; 
		visibility:hidden;
	}
	.popularItem{
		width:auto; 
		display:inline-block !important; 
		display:inline;
		height:68rpx;
		background:rgba(242,242,242,1);
		border-radius:34rpx;
		font-size:26rpx;
		font-weight:500;
		color:rgba(86,94,115,1);
		line-height:68rpx;
		padding:0 36rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.historyList{
		width:100%;
	}
	.historyItem{
		width:100%;
		height: 116rpx;
		border-bottom:1rpx solid #EEEEEE;
		position: relative;
	}
	.hisImg{
		width: 34rpx;
		height:34rpx;
		float:left;
		margin: 42rpx 30rpx 0 40rpx;
	}
	.hisImgR{
		width: 20rpx;
		height:20rpx;
		position: absolute;
		right:40rpx;
		top:48rpx;
	}
	.hisTxt{
		width: 500rpx;
		height:100%;
		line-height: 116rpx;
		font-size:30rpx;
		font-weight:500;
		color:rgba(86,94,115,1);
		float:left;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.clearHis{
		height:116rpx;
		text-align: center;
		font-size:28rpx;
		color:rgba(132,137,151,1);
		line-height: 116rpx;
	}
	
	/* 搜索后的列表 */
	.findListBox{
		width:100%;
		height:calc(100% - 105rpx);
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.findList{
		width:90%;
		margin:auto;
	}
	.findItem{
		width:100%;
		height:192rpx;
	}
	.findItem .findItemImg{
		width:80rpx;
		height:112rpx;
		float:left;
		margin-top:40rpx;
	}
	.findItem .findItemTxt{
		width:360rpx;
		height:112rpx;
		float:left;
		margin-top:40rpx;
		margin-left:20rpx;
	}
	.findItem .findItemTxt .findName{
		color:rgb(64,169,255);
		font-size: 30rpx;
		padding-top:20rpx;
	}
	.findItem .findItemTxt .findTs{
		color:rgb(157,163,180);
		font-size: 28rpx;
		padding-top:5rpx;
	}
	.findItem .addBookBtn{
		width:160rpx;
		height:68rpx;
		float:right;
		margin-top: 62rpx;
		background: rgb(64,169,255);
		font-size: 28rpx;
		text-align: center;
		line-height: 68rpx;
		color:#fff;
		border-radius: 34rpx;
	}
	.findItem .addBookBtn.notAdd{
		background: rgb(243,243,243);
		color:rgb(204,204,204);
	}
	
	
</style>
