<template>
	<view class="page-box-box">
		
		<view class="notArr" v-if="selectindex == 0">
			<!-- 书架为空时 -->
			<view v-if="listArr.length==0">
				<view class="sweepCode">
					<image class="sweepCodeImg" mode="scaleToFill" src="../../static/imgs/bookshelf_pic_default.png"></image>
				</view>
				<view class="sweepCodeTs">扫码书籍条形码，录入书籍信息</view>
				
			</view>
			<!-- 书架不为空 -->
			<view v-else>
				<view class="contentBox">
					<view class="typeChangeBtn">
						<view class="typeItem" :class="typeIndex==0?'active':''" @tap="changeTypeBtn(0)">
							<text :class="typeIndex == 0?'typeIndexAction':''">{{typeTxt}}</text>
							<image v-if="typeIndex == 0&&typeMask == true" class="typeImg" src="../../static/imgs/book-tab-arrow2.png"></image>
							<image v-if="typeIndex == 0&&typeMask == false" class="typeImg" src="../../static/imgs/book-tab-arrow.png"></image>
						</view>
						<view class="typeItem" :class="typeIndex==1?'active':''" @tap="changeTypeBtn(1)">
							<text :class="typeIndex == 1?'typeIndexAction':''">{{labelTxt}}</text>
							<image v-if="typeIndex == 1&&typeMask == true" class="typeImg" src="../../static/imgs/book-tab-arrow2.png"></image>
							<image v-if="typeIndex == 1&&typeMask == false" class="typeImg" src="../../static/imgs/book-tab-arrow.png"></image>
						</view>
					</view>
					<view class="typeBookList">
						<view class="centerBox" @touchstart="bindTouchStart" @touchend="bindTouchEnd"  @tap="cancelEdit">
							<view class="typeBookItem" v-for="(v,i) in allBookList" :key="i">
								<image class="typeBookImg" mode="aspectFill" :src="v.cover"  @longtap="longEdit"></image>
								<image v-if="v.read_status == 1" class="typeStatusImg" src="../../static/imgs/book/state-11.png"></image>
								<image v-if="v.read_status == 2" class="typeStatusImg" src="../../static/imgs/book/state-22.png"></image>
								<image v-if="v.read_status == 3" class="typeStatusImg" src="../../static/imgs/book/state-33.png"></image>
								<image v-if="v.read_status == 4" class="typeStatusImg" src="../../static/imgs/book/state-44.png"></image>
								<image @tap="selectBtn(v)" v-if="v.checked != true" class="typecheckboxImg" src="../../static/imgs/book/select.png"></image>
								<image @tap="selectBtn(v)" v-else class="typecheckboxImg" src="../../static/imgs/book/select-in.png"></image>
								<!-- <view class="typeStatusTxt">已读</view> -->
								<view class="typeText">{{v.title}}</view>
								<view class="typeTextTs">{{v.author}}</view>
							</view>
							
						</view>
				
					</view>
				</view>
				<!-- 下拉选择 -->
				<view class="selectBox" v-if="typeMask == true">
					<view class="whiteContent">
						<view class="typeLi" v-for="(item,i) in typeLabelArr" :key="i" @tap="changeType(item)">{{item.name}}<text class="num">({{item.books_count}})</text></view>
					</view>
				</view>
				<!-- 长按编辑 -->
				<view class="bottomEdit" v-if="editIo == true">
					<view class="editModel_a" v-if="longtapType == 0">
						<view class="botBtn" :class="checkedArr.length>0?'upColorIO':''" @tap.stop="openDeleteThisBook">移除图书</view>
						<view class="botBtn" :class="checkedArr.length>0?'upColorIO_add':''" @tap.stop="addLabel">添加标签</view>
						<view class="botBtn" @tap.stop="openReadRead">阅读状态</view>
						<view class="botBtn" @tap.stop="addbooklist">加入书单</view>
					</view>
					<view class="editModel_b" v-else>
						<view class="botBtn">移除图书</view>
						<view class="botBtn" @tap.stop="addLabel">添加标签</view>
					</view>
				</view>
				
				<!-- 长按点加入书单 -->
				<view class="addBooklist" @tap="cancelbooklistMG" v-if="booklistMG==true">
					<view class="booklistMark">
						<view class="bookTit">
							<view class="text">选择书单至</view>
							<view class="newbooklist" @tap.stop="newbooklist">新建书单</view>
							<image class="newbooklistImg" mode="aspectFill" src="../../static/imgs/book/add.png"></image>
						</view>
						<view class="bookdItem flexBox alignCenter" v-for="(item,i) in 7" :key="i">
							<image class="bookdImg" mode="aspectFill" src="../../static/imgs/book/3.png"></image>
							<view class="bookdTxt">霸道男主的强势专宠</view>
						</view>
					</view>
				</view>
				<!-- 移除本地书 -->
				<view class="cancelBook" v-if="cancelThisBook == true">
					<view class="thisBookWhile">
						<view class="thisbookInfor">
							<view class="deleteTs">确定删除所选中的2本图书？</view>
							<view class="selectDelete"  @tap="deleteSelectBtn">
								<image v-if="deleteBookSelset==true" mode="aspectFill" src="../../static/imgs/book/select-in.png"></image>
								<image v-else mode="aspectFill" src="../../static/imgs/book/select.png"></image>
								<view class="deleteTxtTs">删除本地文件</view>
							</view>
						</view>
						<view class="newlabelBtn">
							<view class="labelBtn" @tap="cancelThisBookBtn">取消</view>
							<view class="labelBtn sureBtn" @tap="deletsThisBooks">确定</view>
						</view>
					</view>
				</view>
				<!-- 添加标签 -->
				<view class="newlabelBG" v-if="newlabelBG == true">
					<view class="newlabelWhile">
						<view class="newlabelT">
							<view class="addL">添加标签</view>
							<view class="addR">新建标签</view>
							<image class="addRimg" mode="aspectFill" src="../../static/imgs/book/add.png"></image>
						</view>
						<view class="labelListBox">
							<view class="labelList">
								<view class="addtxts">综合性图书</view>
								<image v-if="1==1" mode="aspectFill" src="../../static/imgs/book/select.png"></image>
								<image v-else mode="aspectFill" src="../../static/imgs/book/select-in.png"></image>
							</view>
							<view class="labelList">
								<view class="addtxts">最爱的图书</view>
								<image v-if="1==1" mode="aspectFill" src="../../static/imgs/book/select.png"></image>
								<image v-else mode="aspectFill" src="../../static/imgs/book/select-in.png"></image>
							</view>
						</view>
						<view class="newlabelBtn">
							<view class="labelBtn" @tap="cancellabelBG">取消</view>
							<view class="labelBtn sureBtn">确定</view>
						</view>
					</view>
				</view>
				<!-- 阅读状态 -->
				<view class="readBG" v-if="readBG == true">
					<view class="readWhile">
						<view class="readStatus">未读</view>
						<view class="readStatus">在读</view>
						<view class="readStatus">读过</view>
						<view class="readStatus cancelreadStatus" @tap="cancelReadStatus">取消</view>
					</view>
				</view>
				<!-- 加入书单的新建书单 -->
				<view class="newbookBG" v-if="newbookBG == true">
					<view class="newbookWhile">
						<view class="newbookT">新建书单</view>
						<view class="newinputBox">
							<input type="text" placeholder-style="color:#CCCCCC;" placeholder="为你的书单添加一个标题">
						</view>
						<view class="newbookBtn">
							<view class="newBtn" @tap="cancelnewbookBG">取消</view>
							<view class="newBtn sureBtn">确定</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		
		<scancode v-if="selectindex==1"></scancode>
		<booklist v-if="selectindex==2"></booklist>
		<user v-if="selectindex==3"></user>
		
		
		<!-- 底部导航 -->
		<view class="tabbarBox">
			<view class="itemtab" v-for="(item, index) in tabData" :key="index" @tap="toPage(index)">
				<view class="imgbox">
					<image v-if="selectindex == index" :src="item.iconUrlIn"></image>
					<image v-else :src="item.iconUrl"></image>
				</view>
			</view>
		</view>
		
	
		
	</view>
</template>

<script>
	
	
	import myIndex from "@/pages/myIndex/myIndex.vue"
	import scancode from "@/pages/scancode/scancode.vue"
	import booklist from "@/pages/booklist/booklist.vue"
	import user from "@/pages/user/user.vue"
	import http from '@/utils/http.js'
	
	export default {
		data() {
			return {
				listArr:[1], // 书架列表
				active:'active', // 下划框
				typeTxt:'分类',
				labelTxt:'标签',
				typeIndex:0, // 类型选择
				typeIndexAction:'typeIndexAction', // 类型高亮
				typeMask: false, // 遮罩开关
				booklistMG: false, // 加入书单的遮罩
				newbookBG: false, // 加入书单的新建书单的遮罩、新建标签
				newlabelBG: false, // 头部添加标签
				cancelThisBook:false, // 移除本地书
				deleteBookSelset:false, // 移除选中
				readBG:false,
				
				selectindex: 0, //tarbar 导航选择
				tabData:[ //tarbar 导航
					{
						iconUrl: '../../static/imgs/tabBar/1.png',
						iconUrlIn:'../../static/imgs/tabBar/1-in.png',
						path: '/pages/index/index'
					},
					{
						iconUrl: '../../static/imgs/tabBar/2.png',
						iconUrlIn:'../../static/imgs/tabBar/2-in.png',
						path: '/pages/scancode/scancode'
					},
					{
						iconUrl: '../../static/imgs/tabBar/3.png',
						iconUrlIn:'../../static/imgs/tabBar/3-in.png',
						path: '/pages/index/index'
					},
					{
						iconUrl: '/static/imgs/tabBar/4.png',
						iconUrlIn:'/static/imgs/tabBar/4-in.png',
						path: '/pages/user/user'
					}
				],
				
				current_page:1, // 分页
				page_num:10,
				tag:'',
				category:'',
				typeLabelArr:[], // 列表
				typeArr:[],
				labelArr:[],
				allBookList:[],
				checkedArr:[], // 选择的id值数组
				upColorIO:'upColorIO', // 移除高亮并能点击
				upColorIO_add:'upColorIO_add', // 添加高亮并能点击
				
				editIo: false,
				longtapType: 0, // 其他或想读长按
				startTime: 0,
				endTime:0,
			}
		},
		
		onLoad(){
			
			// 要有 token的情况下才调用接口
			this.getShelf();
		},
		methods: {
			// 调接口部分
			getShelf(){ 
				let params = {
					current_page: this.current_page,
					page_num: this.page_num,
					category: this.category,
					tag: this.tag
				}
				http.bookshelf(params).then( res=>{
					this.labelArr = res.data.tags.list;
					this.typeArr = res.data.category.list;
					this.allBookList = res.data.list;
				})
			},
			
			toPage(index){
				this.selectindex = index;
				if(index == 0){
					uni.setNavigationBarTitle({
					　　title:'书架'
					})
				}else if(index == 1){
					uni.setNavigationBarTitle({
					　　title:'录入'
					})
				}else if(index == 2){
					uni.setNavigationBarTitle({
					　　title:'书单'
					})
				}else{
					uni.setNavigationBarTitle({
					　　title:'我的'
					})
				}
				
			},
			// 点击类型和标签
			changeTypeBtn(num){ 
				console.log(num)
				if(num == 0){
					this.typeLabelArr = this.typeArr;
				}else{
					this.typeLabelArr = this.labelArr;
				}
				this.typeIndex = num;
				if(this.typeMask == true){
					this.typeMask = false;
				}else{
					this.typeMask = true;
				}
			},	
			// 选择类型和标签下的分类
			changeType(item){ 
				this.typeIndex == 0?this.typeTxt = item.name : this.labelTxt = item.name;
				this.typeMask = false;
			},
			// 勾选
			selectBtn(item){
				if(typeof item.checked =='undefined' || item.checked == false){
					this.$set(item,"checked",true);
					this.checkedArr.push(item.id);
					console.log('加',this.checkedArr)
				}else{
					item.checked = !item.checked;
					this.checkedArr = this.checkedArr.filter(function(v){
						return v != item.id
					})
				}
				console.log('all',this.checkedArr)
			},
			// 长按编辑
			bindTouchStart(e) {
			    this.startTime = e.timeStamp;
			},
			bindTouchEnd(e) {
			    this.endTime = e.timeStamp;
			},
			longEdit(){
				this.editIo = true;
			},
			cancelEdit(){
				var _this = this;
				 if(this.endTime  - this.startTime < 350) {
				    _this.editIo = false;
				 }
			},
			addbooklist(){ // 点击加入书单
				this.booklistMG =  true;
			},
			cancelbooklistMG(){// 关闭加入书单
				this.booklistMG =  false;
			},
			newbooklist(){ //点击新建书单和新建标签
				this.booklistMG =  false;
				this.newbookBG = true;
			},
			cancelnewbookBG(){ //取消新建书单
				this.newbookBG = false;
			},
			
			// 移除图书
			openDeleteThisBook(){
				var _this = this;
				if(_this.checkedArr > 0){
					_this.cancelThisBook = true;
				}else{
					return false
				}	
			},
			cancelThisBookBtn(){
				this.deleteBookSelset = false;
				this.cancelThisBook = false;
			},
			deleteSelectBtn(){
				this.deleteBookSelset == true? this.deleteBookSelset = false : this.deleteBookSelset = true;
			},
			deletsThisBooks(){
				var _this = this;
				if(_this.deleteBookSelset == true){
					var params = {
						books_ids: '[' + _this.checkedArr.join(',') + ']'
					}
					http.deleteBooks(params).then( res=>{
						_this.cancelThisBook = false;
						uni.showToast({
							title: res.msg,
							duration: 2000,
						})
						_this.getShelf();
						
					})
				}else{
					return false
				}
			},
			// 添加标签
			addLabel(){
				this.newlabelBG = true;
			},
			cancellabelBG(){
				this.newlabelBG = false;
			},
			// 修改阅读状态
			openReadRead(){
				this.readBG = true;
			},
			cancelReadStatus(){
				this.readBG = false;
			}
			
			
		},
		components: {
			myIndex,
			scancode,
			booklist,
			user
		},
		onShareAppMessage(res) {
			return {
			  title: '',
			  path: '/pages/index/index'
			}
		}
	}
</script>

<style scoped>
	page {
		width:100%;
		height: 100%;
	}
	.page-box-box {
		height: 100%;
		width:100%;
		position: relative;
	}
	.contentBox{
		width:100%;
		position: absolute;
		top:0;
		bottom:98rpx;
		z-index: 10;
	}
	
	/* 自定义tabbar导航 */
	.tabbarBox{
		height:98rpx;
		width:100%;
		position: absolute;
		bottom:0;
		left:0;
		z-index: 9;
		background: #ffffff;
	}
	.itemtab{
		width:25%;
		height:100%;
		float:left;
	}
	.imgbox{
		width:100%;
		height:100%;
		line-height: 98rpx;
		text-align: center;
	}
	.imgbox image{
		width:44rpx;
		height:44rpx;
	}
	
	/* 类型选择 */
	.typeChangeBtn{
		width:100%;
		height: 96rpx;
		background-color: #ffffff;
		
	}
	.typeItem{
		width:50%;
		height:100%;
		float:left;
		color: #9DA3B4;
		font-size: 34rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.typeItem.active:after {
		position:absolute;
		content:"";
		left:50%;
		bottom:10rpx;
		width:30rpx;
		height:4rpx;
		background: #40A9FF;
		margin-left:-15rpx; 
	}
	.typeItem .typeIndexAction{
		color:#333;
	}
	.typeItem .typeImg{
		width:16rpx;
		height:10rpx;
		margin-left:10rpx;
	}
	/* 下拉选择遮罩 */
	.selectBox{
		width:100%;
		position: absolute;
		top: 96rpx;
		bottom:0;
		z-index: 99;
		background: rgba(0,0,0,0.64);
	}
	.whiteContent{
		width:100%;
		height:auto;
		background: #F6F6F6;
		border-radius: 0 0 20rpx 20rpx;
		padding:30rpx 0;
	}
	.typeLi{
		display: inline-block;
		width:320rpx;
		padding:26rpx 0;
		font-size: 26rpx;
		margin-left:40rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		color:#333;
	}
	.typeLi text{
		color:#848997;
	}
	
	/* 书城列表 */
	.typeBookList{
		width:100%;
		position: absolute;
		bottom:0;
		top:96rpx;
		overflow-x:hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

	/* 加入书单位遮罩 */
	.addBooklist{
		width:100%;
		height:100%;
		position: absolute;
		bottom:0;
		top:0;
		z-index: 999;
		background: rgba(0,0,0,0.64);
	}
	.booklistMark{
		width:94%;
		height: 848rpx;
		background: #fff;
		border-radius: 20rpx;
		position: absolute;
		bottom:20rpx;
		left:3%;
		overflow-x:hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.booklistMark .bookTit{
		width:90%;
		height: 124rpx;
		margin: auto;
	}
	.booklistMark .bookTit .text{
		font-size:32rpx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		float:left;
		line-height: 124rpx;
	}
	.booklistMark .bookTit .newbooklist{
		font-size:30rpx;
		font-weight:500;
		color:rgba(86,94,115,1);
		line-height: 124rpx;
		float:right;
		line-height: 124rpx;
	}
	.booklistMark .bookTit .newbooklistImg{
		width:32rpx;
		height:32rpx;
		float:right;
		margin: 46rpx 12rpx 0 0;
	}
	.bookdItem{
		width:90%;
		height: 132rpx;
		margin: auto;
	}
	.bookdItem .bookdImg{
		width:60rpx;
		height:84rpx;
	}
	.bookdItem .bookdTxt{
		font-size:32rpx;
		font-weight:500;
		color:rgba(86,94,115,1);
		width: 460rpx;
		margin-left:24rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	/* 新建书单 */
	.newbookBG{
		width:100%;
		height:100%;
		position: absolute;
		bottom:0;
		top:0;
		z-index: 999;
		background: rgba(0,0,0,0.64);
	}
	.newbookWhile{
		width:94%;
		height: 370rpx;
		background: #fff;
		border-radius: 20rpx;
		position: absolute;
		bottom:20rpx;
		left:3%;
	}
	.newbookT{
		width:80%;
		padding-top:70rpx;
		margin:auto;
		color:#333;
		font-size:32rpx;
		font-weight:bold;
	}
	.newinputBox{
		width:80%;
		margin:10rpx auto 0;
		height:36rpx;
		border-bottom:1rpx solid #F2F2F2;
		padding:15rpx 0;
	}
	.newinputBox input{
		display: inline-block;
		width:100%;
		height:100%;
		font-size:30rpx;
		color:#333;
	}
	.newbookBtn{
		height:98rpx;
		width:100%;
		margin-top:90rpx;
	}
	.newbookBtn .newBtn{
		border-top:1rpx solid #F2F2F2;
		height:98rpx;
		width:50%;
		float:left;
		text-align: center;
		line-height: 98rpx;
		color:#9DA3B4;
	}
	.newbookBtn .newBtn.sureBtn{
		color:#40A9FF;
	}


	
	/* 空书架时 */
	.notArr .sweepCode{
		width: 548rpx;
		height:376rpx;
		margin:auto;
		padding-top:150rpx;
	}
	.sweepCode .sweepCodeImg{
		width: 100%;
		height:100%;
	}
	.sweepCodeTs{
		text-align: center;
		font-size:28rpx;
		color:#B3B3B3;
		margin: 40rpx 0 50rpx 0;
	}
	
	/* 头部添加标签  */
	.newlabelBG{
		width:100%;
		height:100%;
		position: absolute;
		bottom:0;
		top:0;
		z-index: 999;
		background: rgba(0,0,0,0.64);
	}
	.newlabelWhile{
		width:94%;
		height:498rpx;
		max-height: 500rpx;
		background: #fff;
		border-radius: 20rpx;
		position: absolute;
		bottom:20rpx;
		left:3%;
	}
	.newlabelT{
		width:86%;
		height:124rpx;
		margin:auto;
	}
	.addL{
		height:100%;
		line-height: 124rpx;
		float:left;
		color:#333;
		font-weight: bold;
		font-size: 32rpx;
	}
	.addR{
		height:100%;
		line-height: 124rpx;
		float:right;
		color:#565E73;
		font-size: 30rpx;
	}
	.addRimg{
		width:32rpx;
		height:32rpx;
		float:right;
		margin-top:48rpx;
		margin-right:8rpx;
	}
	.labelListBox{
		width:86%;
		height:248rpx;
		overflow-y: scroll;
		margin:auto;
	}
	.labelList{
		width:100%;
		height:124rpx;
	}
	.labelList .addtxts{
		font-size:30rpx;
		font-weight:500;
		color:rgba(86,94,115,1);
		line-height: 124rpx;
		float:left;
	}
	.labelList image{
		width: 40rpx;
		height:40rpx;
		float:right;
		margin-top:40rpx;
	}
	.newlabelBtn{
		height:123rpx;
		width:100%;
		line-height: 123rpx;
		border-top:1rpx solid #F2F2F2;
	}
	.newlabelBtn .labelBtn{
		width:50%;
		display: inline-block;
		text-align: center;
		line-height: 123rpx;
		font-size: 30rpx;
		color:#9DA3B4;
	}
	.newlabelBtn .labelBtn.sureBtn{
		color:#40A9FF;
	}
	
	/* 移除 */
	.cancelBook,.readBG{
		width:100%;
		height:100%;
		position: absolute;
		bottom:0;
		top:0;
		z-index: 999;
		background: rgba(0,0,0,0.64);
	}
	.thisBookWhile{
		width:94%;
		height:372rpx;
		background: #fff;
		border-radius: 20rpx;
		position: absolute;
		bottom:20rpx;
		left:3%;
	}
	.thisbookInfor{
		width:80%;
		height:248rpx;
		margin:auto;
	}
	.deleteTs{
		font-size:32rpx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		padding-top: 75rpx;
	}
	.selectDelete{
		height:40rpx;
		color:#CCCCCC;
		margin-top:20rpx;
	}
	.selectDelete image{
		float:left;
		width:40rpx;
		height:40rpx;
	}
	.selectDelete .deleteTxtTs{
		margin-left:15rpx;
		float:left;
		font-size:30rpx;
		font-weight:500;
		color:rgba(204,204,204,1);
	}
	/* 修改状态 */
	.readWhile{
		width:94%;
		height:auto;
		background: #fff;
		border-radius: 20rpx;
		position: absolute;
		bottom:20rpx;
		left:3%;
	}
	.readStatus{
		width:100%;
		height: 123rpx;
		line-height: 123rpx;
		text-align: center;
		border-bottom:1rpx solid #F2F2F2;
		color:#333;
	}
	.readStatus.cancelreadStatus{
		color:#9DA3B4;
		border:none;
	}
	
</style>

