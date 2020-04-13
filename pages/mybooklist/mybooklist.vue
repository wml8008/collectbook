<template>
	<view class="page-box" :style="{minHeight: pageboxHeight+'px'}" @click="operateChange(false)">
		<booksList mode='3' :booksData="booksListData" :editStart.sync='operateStart' @seleIndex="seleIndex" click-path="/pages/booklist/booklist"></booksList>
		
		<view :class="['operate','block', isIphoneX?'ipx':'']" v-if="operateStart" @click.stop>
			<view class="item" :style="{width: operateData2.mode==1?'50%':'25%'}" v-for="(item, index) in operateData" :key="index">
				<view :style="{color: operateData2.state==0?'#d6d6d6':index==0?'#ff3b30':operateData2.oneSele?'':'#d6d6d6'}" @click="toOperate(index)">{{item}}</view>
			</view>
			<view class="ipx-block" v-if="isIphoneX" style="height: 68upx"></view>
		</view>
		<view style="height: 98upx"></view>
		<view v-if="isIphoneX" style="height: 68upx"></view>
		
		<!--弹出的询问块-->
		<bottomOperate id="bottom-operate" ref="bottom-operate"></bottomOperate>
	</view>
</template>

<script>

	import booksList from "@/components/my/booksList.vue"
	import bottomOperate from "@/components/my/bottomOperate.vue"
	
	export default {
		data() {
			return {
				//屏幕高度
				screenHeight: 800,
				
				//图书盒子最少的高度
				pageboxHeight: 800,
				
				isIphoneX: false,
				
				booksListData: [
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/4.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					},
					{
						imgs:[
							'/static/imgs/book/1.png',
							'/static/imgs/book/2.png',
							'/static/imgs/book/3.png',
							'/static/imgs/book/1.png'
						],
						title: '豆瓣评分9.8最高的书籍',
						author: '星际老人',
						select: false
					}
				],
				
				operateData: [
					'删除书单',
					'重命名该书单'
				],
				
				operateData2: {
					mode: 1,		//1表示有选中想读的情况下(只有两个选项)，2有四个选项
					state: 0,		//1表示有选中，可以操作
					oneSele: false,	//是否只有一个选中，只有一个选中的情况下，才可以重命名书单
				},
				
				
				operateStart: false,
			}
		},
		
		//初始化
		mounted() {
			this.screenHeight = getApp().globalData.screenHeight
			
			this.pageboxHeight = this.screenHeight
			
			this.isIphoneX = getApp().globalData.isIphoneX
			
			//#ifdef H5
			this.pageboxHeight = (window.innerHeight || document.documentElement.clientHeight) - 44
			//#endif
		},
		watch:{
			operateStart: function(val){
				//当开启时，全部选中清空
				for (let i=0;i<this.booksListData.length; i++){
					let item = this.booksListData[i]
					item.select = false
				}
			},
			//图书数据改变时
			booksListData: {
				handler: function(newVal,oldVal){
					//循环迭代是否有选中的或者想看的
					let select = false;
					let xiangdu = false;
					let con = 0;
					for (let i=0;i<this.booksListData.length; i++){
						let item = this.booksListData[i]
						if(item.select){
							select = true;
							con++
						} 
					}
					
					this.operateData2.oneSele = con==1?true:false
					this.operateData2.state = select?1:0
					
				},	
				deep:true
			}
		},
		methods: {
			//操作菜单展示改变
			operateChange: function(state){
				this.operateStart = state?true:false
			},
			
			//选中改变
			seleIndex: function(data){
				this.booksListData[Number(data.index)].select = Boolean(data.state)
			},
			
			//执行操作
			toOperate: function(index){
				let operate = [
					'delBook',
					'rename'
				]
				
				this[operate[Number(index)]]()
			},
			
			//删除图书
			delBook: function(){
				let that = this
				
				//没有选中时，返回
				if(this.operateData2.state==0) return;
				
				uni.showModal({
					title: '确定删除所选中的图书？',
					confirmText: '删除',
					confirmColor: '#58b4ff',
					success: function(res){
						if (res.confirm) {
							//删除图书
							for (let i=0;i<that.booksListData.length; i++){
								let item = that.booksListData[i]
								if(item.select) {
									that.booksListData.splice(i, 1)
									i-=1;
								}
							}
						} else if (res.cancel) {
							
						}
					}
				})
			}
			
			//重命名
			,rename: function(){
				//没有选中时，返回
				if(this.operateData2.state==0) return;
				
				//多个选中时，返回
				if(!this.operateData2.oneSele) return;
				
				//弹出询问框
				this.$refs['bottom-operate'].toOpen({
					title:'添加标签',
					mode:1,
					success: function(){
						console.log('按了确认')
					},
					cancel: function(){
						console.log('按了取消')
					}
				})
			}
			
		},
		components: {
			booksList,bottomOperate
		}
	}
</script>

<style>
	.page-box {
		min-height: 100%;
	}
	
	.operate.block {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 300;
		height: 98upx;
		overflow: hidden;
		background: #fff;
		
		
	}
	.item {
		width: 25%;
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		float: left;
		font-size: 30upx;
		color: #333333;
	}
	
	.ipx-block {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
	}
	
	.operate.block.ipx {
		height: 164upx;
	}
</style>
