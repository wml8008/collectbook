<template>
	<view class="myBook">
		
		<view class="bookList">
			<view class="bookListCenter">
				
				<view class="outsideItem" v-for="(outitem,i) in 12" :key="i">
					<view class="insideItem">
						<view class="insideCenter">
							<image class="insideImg" mode="scaleToFill" src="../../static/imgs/book/1.png"></image>
							<image class="insideImg" mode="scaleToFill" src="../../static/imgs/book/2.png"></image>
							<image class="insideImg" mode="scaleToFill" src="../../static/imgs/book/3.png"></image>
							<image class="insideImg" mode="scaleToFill" src="../../static/imgs/book/4.png"></image>
						</view>
					</view>
					<view class="bookName">豆瓣评分9.8最高的书籍</view>
					<view class="bookNameTs">星际老人</view>
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
	
	.bookList{
		width:100%;
		height:100%;
		overflow-x:hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.bookListCenter{
		width: calc(100% - 72rpx);
		margin:30rpx auto 100rpx;
	}
	.outsideItem{
		width:190rpx;
		height: 438rpx;
		display: inline-block;
	}
	.outsideItem:nth-child(3n-1){
		margin:0 54rpx;
	}
	.insideItem{
		width:190rpx;
		/* 266-16 */
		height: 250rpx;
		padding-top:16rpx;
		box-shadow: 0px 3px 20px rgba(204,204,204,0.36);
	}
	.insideCenter{
		width:170rpx;
		height: 234rpx;
		margin: auto;
		/* 兼容写法 */
		display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
		display: -moz-box; /* 老版本语法: Firefox (buggy) */
		display: -ms-flexbox; /* 混合版本语法: IE 10 */
		display: -webkit-flex; /* 新版本语法: Chrome 21+ */
		display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		align-items:flex-start;
		justify-content: space-between;
	}
	.insideImg{
		width: 80rpx;
		height:112rpx;
	}
	.bookName{
		height:64rpx;
		font-size: 26rpx;
		color:#333;
		line-height:32rpx;
		margin-top:12rpx;
		/* 两行溢出... */
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.bookNameTs{
		width:100%;
		font-size:24rpx;
		font-weight:500;
		color:rgba(157,163,180,1);
		line-height:32rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		margin-top:15rpx;
	}
	
</style>
