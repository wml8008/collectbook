<template>
	<view class="bookDetail">
		
		<view class="detailBos">
			<view class="detailTit">
				<view class="detailTitContent">
					<image class="detailImg" mode="scaleToFill" src="../../static/imgs/book/3.png"></image>
					<view class="detailTopText">
						<view class="topName">绿山墙的安妮：图像小说(全2册)</view>
						<view class="topNameTs">[加]露西·莫德·蒙哥马利 原著 /... [美] 玛利亚·马斯登 改编 / [美]布伦娜·桑姆勒 绘 </view>
						<view class="lookMore flexBox alignCenter">
							<text>查看更多信息</text>
							<image class="lookMoreImg" src="../../static/imgs/books_icon_more_default.png"></image>
						</view>
						<view class="englistTxt">外国文学</view>
					</view>
				</view>
			</view>
			<view class="detailInformation">
			<view class="detailInforContent">
				<view class="detailType flexBox packBetween">
					<view class="detailTypeItem">
						<view class="typeNum">2.2<text class="numDw">万人</text></view>
						<view class="typeTxt">想读此书</view>
					</view>
					<view class="detailTypeItem">
						<view class="typeNum">2.2<text class="numDw">万人</text></view>
						<view class="typeTxt">想读此书</view>
					</view>
					<view class="detailTypeItem">
						<view class="typeNum">2.2<text class="numDw">万人</text></view>
						<view class="typeTxt">想读此书</view>
					</view>
				</view>
				
				<view class="myLabelList">
					<view class="myLabelItem flexBox alignCenter labelTIT">我的标签</view>
					<view class="myLabelItem flexBox alignCenter" v-for="(item,index) in 5" :key="index">我的标签
						<view class="deleteLabelIconBox" >
							<image class="deleteLabelIcon" mode="scaleToFill" src="../../static/imgs/deleteLabel.png"></image>
						</view>
					</view>
				</view>
				
				<view class="titles">
					<text>图书简介</text>
					<text class="catalog">目录</text>
				</view>
				<view class="introduction">
					<view>
						“没有谁比一个富有想象力的女孩更有力量。”马修和玛莉拉兄妹俩原本打算领养一个男孩，帮着照看绿山墙农庄，没想到孤儿院却送来了11岁的女孩安妮。安妮一头红发、一脸雀斑。满脑子奇思妙想，一开口就停不下来。想哭就哭，想笑就笑，永远对明天抱有期望。但她也经常犯错、惹祸，让人头 痛不已。她最终能赢得大家的喜爱，顺利留在绿山墙吗？
						改编自经典女孩成长小说《绿山墙的安妮》，这本图像小说浓缩了原著的精髓，以美不胜收的全彩插图，完美再现了迷人的绿山墙里不一样的女孩安妮。
					</view>
					<image class="img" mode="scaleToFill" src="../../static/imgs/book-tab-arrow2.png"></image>                          
				</view>
				
				
				<view class="titles">包含这本书的书单</view>
				<view class="bookList">
					<view class="bookListCenter">
						
						<view class="outsideItem" v-for="(outitem,i) in 5" :key="i">
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
				
				<view class="titles" style="margin-top:0;padding-top:32rpx;">相似图书</view>
				
				<!-- 复制别处的 -->
				
				
			</view>
		</view>
		</view>
		
		<view class="detailBottomBtn">
			<view class="leftBtn">我在读这本书</view>
			<view class="addBtn">加入书单</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.detailBos{
		width:100%;
		position: absolute;
		top:0;
		bottom: 99rpx;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	
	.bookDetail{
		width:100%;
		height:100%;
		position:relative;
		overflow-x: hidden;
		overflow-y: scroll;
		background: #fff;
	}
	.detailTit{
		width:100%;
		height:330rpx;
		background: -webkit-linear-gradient(rgb(105,192,255),rgb(77,169,255));
		background: -o-linear-gradient(rgb(105,192,255),rgb(77,169,255));
		background: -moz-linear-gradient(rgb(105,192,255),rgb(77,169,255));
		background: -mos-linear-gradient(rgb(105,192,255),rgb(77,169,255));
		background: linear-gradient(rgb(105,192,255),rgb(77,169,255));
	}
	.detailTitContent{
		width:89.3%;
		height:100%;
		margin:auto;
	}
	.detailImg{
		width: 210rpx;
		height:294rpx;
	}
	.detailTopText{
		width: 420rpx;
		float:right;
	}
	.topName{
		font-size: 36rpx;
		color:#fff;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.topNameTs{
		width:100%;
		font-size:28rpx;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:32px;
		opacity:0.8;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.lookMore{
		height: 25rpx;
		font-size:24rpx;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:32rpx;
		opacity:0.6;
	}
	.lookMoreImg{
		width:10rpx;
		height:16rpx;
		margin-left:6rpx;
	}
	.englistTxt{
		width:136rpx;
		height:56rpx;
		background:rgba(222,241,255,1);
		border-radius:28rpx;
		font-size:24rpx;
		font-weight:500;
		color:rgba(64,169,255,1);
		text-align: center;
		line-height: 56rpx;
		margin-top:50rpx;
	}
	
	.detailInformation{
		background: #fff;
		border-radius: 30rpx 30rpx 0 0;
		height:200rpx;
		margin-top:-110rpx;
		padding-top:80rpx;
	}
	.detailInforContent{
		width:89.3%;
		height:auto;
		margin:30rpx auto 0;
	}
	.detailTypeItem{
		font-size: 24rpx;
		height:120rpx;
	}
	.typeNum{
		font-size: 54rpx;
		color:#848997;
	}
	.typeTxt{
		color:rgba(157,163,180,1);
	}
	.detailTypeItem .typeNum .numDw{
		font-size: 24rpx;
	}
	
	/*  */
	.myLabelList{
		width:100%;
		height:80rpx;
		margin-top:60rpx;
		white-space:nowrap;
		overflow-x: scroll;
	}
	.myLabelTxt{
		height:64rpx;
		width:112rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(157,163,180,1);
		line-height: 64rpx;
		text-align: center;
		display: inline-block;
	}
	.myLabelItem{
		height:64rpx;
		width:auto;
		line-height: 62rpx;
		display: inline-block;
		padding:0 20rpx;
		font-size:28rpx;
		color:rgba(86,94,115,1);
		background:rgba(247,247,247,1);
		border:1rpx solid rgba(238,238,238,1);
		border-radius:31rpx;
		margin-left: 20rpx;
	}
	.myLabelItem.labelTIT{
		background:#FFF;
		border:1rpx solid #FFF;
		color:#9DA3B4;
		font-size:26rpx;
		padding-left:0;
		margin-left:0;
	}
	.deleteLabelIconBox{
		display: inline-block;
		height:100%;
		width:20rpx;
		margin:0 0 0 15rpx;
	}
	.deleteLabelIcon{
		width:16rpx;
		height:16rpx;
		margin:0;
		padding:0;
	}
	
	/*  */
	.titles{
		margin-top:85rpx;
		font-size:34rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:42rpx;
	}
	.titles .catalog{
		margin-left: 28rpx;
		color:#9DA3B4;
	}

	.introduction{
		font-size:28rpx;
		height:120rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(86,94,115,1);
		line-height:40rpx;
		margin-top:30rpx;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.introduction .img{
		width: 26rpx;
		height: 15rpx;
		position: absolute;
		bottom:15rpx;
		right:0;
	}
	.introduction.autoHeight{
		height:auto;
	}
	
	/*  */
/* 	.bookList{
		width:100%;
		height:100%;
		overflow-x:hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	} */
	.bookListCenter{
		width: 100%;
		margin:30rpx auto 0rpx;
	}
	.outsideItem{
		width:190rpx;
		height: 438rpx;
		display: inline-block;
	}
	.outsideItem:nth-child(3n-1){
		margin:0 50rpx;
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
	
	
	/* 底部操作按钮 */
	.detailBottomBtn{
		width:100%;
		height:98rpx;
		border-top:1rpx solid #EEEEEE;
		position: absolute;
		left:0;
		bottom:0;
		background: #fff;
		font-size: 30rpx;
	}
	.leftBtn{
		width:66.66%;
		line-height: 98rpx;
		text-align: center;
		float:left;
		color:#40A9FF;
	}
	.addBtn{
		height:100%;
		width:33.33%;
		background: #40A9FF;
		line-height: 98rpx;
		text-align: center;
		float:right;
		color:#fff;
	}

</style>
