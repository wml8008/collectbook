<!--
	参数：
		mode:
			1. 书籍列表，可以编辑
			2. 书单列表，不可编辑
			3. 书单列表，可以编辑
		booksData：列表数据，数组，每项格式如下：
			{
				imgs: []			//封面图，字符串数组，多本书的封面组成书单的封面
				title: '野兔',
				author: '[阿根廷]塞萨尔·艾拉',
				stateCode: '1',		//阅读状态，1想读 2未读 3在读 4读过
				imgUrl: '/static/imgs/book/1.png',
				select: false,			//是否选中，只有在编辑状态下有效
			}
	
		editStart.sync: 是否在编辑状态， 双向绑定
		
		@seleIndex： 选中/取消选中某个索引事件
		
		clickPath:	普通状态下(非编辑状态)，点击的跳转
-->
<template>
	<view>
		<view class="books-box">
			<view class="item-box" v-for="(item, index1) in myBooksData" :key="index1">
				<view class="item" v-for="(item, index2) in myBooksData[index1]" :key="index2" @click.stop @touchstart="item_touchstart($event, index1, index2)" @touchmove="item_touchmove()" @touchend.prevent.stop="item_touchend($event, index1, index2)">
				<view class="item-child">
					<view style="height: 12px"></view>
					<view :class="['img-box', mode!=1?'shadow':'']" >
						<!--封面，比较复杂-->
						<image v-if="item.imgUrl || item.imgs.length<4" :src="item.imgUrl||item.imgs[0]" :class="[mode==1?'book-image':'book-image-one']" ></image>
						<view v-else class="book-image-box">
							<image v-for="(item2, index) in item.imgs" v-if="index<4" :key="index" :src="item.imgs[index]" class="book-image-2"></image>
						</view>
						
						
						<!--非模式2才有-->
						<view v-if="mode==1" :class="['state', 'state-bg-'+String(item.stateCode)]">{{stateStyle[Number(item.stateCode)].text}}</view>
						<view class="select" v-if="editMode && mode!=2">
							<image class="sele-img" src="../../static/imgs/book/select.png"></image>
							<image class="sele-img-in" :style="{opacity: item.select?'1':'0'}" src="../../static/imgs/book/select-in.png"></image>
						</view>
					</view>
					<view class="title">{{item.title}}</view>
					<view class="author">{{item.author}}</view>
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: [
				'booksData', 'editStart', 'mode', 'clickPath'
		],
		data() {
			return {
				myBooksData:[],
				
				//判断是否在触摸中
				vibrateStart: false,
				//触摸定时器ID
				timeID: 0,
				touchX: 0,
				touchY: 0,
				isMove: false,	//是否有移动
				
				//是否处于编辑模式中
				editMode: false,
				
				stateStyle: [
					{
						bgUrl: '',
						text: ''
					},
					{
						bgUrl: '/static/imgs/book/state-1.png',
						text: '想读'
					},
					{
						bgUrl: '/static/imgs/book/state-1.png',
						text: '未读'
					},
					{
						bgUrl: '/static/imgs/book/state-1.png',
						text: '在读'
					},
					{
						bgUrl: '/static/imgs/book/state-1.png',
						text: '读过'
					}
				]
			}
		},
		methods: {
			//转换外部列表为内容列表(转为3个一组),自动读取
			propsToList: function(){
				let booksData = []
				
				//整理成三个一组
				for (let i=0; i< this.booksData.length; i++){
					if(i%3==0){
						booksData.push([])
					}
					
					booksData[Math.floor(i/3)].push(this.booksData[i])
				}
				
				this.myBooksData = booksData;
			},
			
			//按下
			item_touchstart: function(e, index1, index2){
				let that = this
				//是否编辑模式下，操作不一样，并且不包括模式2
				if((!that.editMode) && that.mode!=2) {
					let timeID = setTimeout(function() {
						//定时器ID相同，且在触摸中
						if(that.timeID == timeID && that.vibrateStart) {
							(uni.vibrate ||uni.vibrateLong || uni.vibrateShort)({
								success: function(){
									console.log('震动吧')
								},
								fail: function(){
									console.log('震动失败')
								}
							})
							
							//变成编辑模式
							that.editMode = true;
							
							//通知父组件
							that.$emit('update:editStart', true)
						}
					}, 1000);
					
					this.timeID = timeID					
				}
				else {
					this.touchX = e.touches[0].pageX
					this.touchY = e.touches[0].pageY					
				}
				
				this.vibrateStart = true
			},
			
			item_touchmove: function(e, index1, index2){ 
				if(this.vibrateStart) {
					this.isMove=true;
				}
			},
			
			//松开
			item_touchend: function(e, index1, index2){ 
				let that = this;
					if(!this.isMove) {
						this.bookClick(index1, index2)
					}	
				
				this.isMove=false;
				this.vibrateStart = false
				clearTimeout(this.timeID)				
			},
			//鼠标点击
			bookClick: function(index1, index2){
				//在编辑模式下触发，并且模式不为2
				if(this.editMode && this.mode!=2){
					this.$emit('seleIndex', {
						index: index1*3 + index2,
						state:  !Boolean(this.myBooksData[index1][index2].select)
					})
				}
				else {
					//非编辑模式跳转
					uni.navigateTo({
						url: this.clickPath  //'../../pages/bookDetails/bookDetails'
					})
				}
			}
		},
		watch:{
			editStart: function(val){
				if(val == this.editMode) return;
				
				this.editMode = val?true:false
			},
			booksData: {
				handler: function(newVal,oldVal){
					this.propsToList()
				},	
				deep:true
			}
		},
		mounted(){
			//转换外部列表为内容列表(转为3个一组)
			this.propsToList()
			
			this.editMode = this.editStart
		}
	}
</script>

<style>
	
	/* //图书图片背景颜色 */

	
	

		
	.item-box {
		width: 100%;
		overflow:hidden;
		
	
	}

	.item{
		float: left;
		width: 190upx;
		margin: 0 30upx;
		margin-bottom: 32upx;
	}
		
		/*禁止长按默认事件*/
		
		
		
	* {
		pointer-events: none;
	  -webkit-touch-callout:none;
	  -webkit-user-select:none;
	  -khtml-user-select:none;
	  -moz-user-select:none;
	  -ms-user-select:none;
	  user-select:none;
	}
	
	.img-box {
		position: relative;
		width: 190upx;
		height: 266upx;
		
	
	}
	.state-bg-1 {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAiCAYAAAD8gp97AAABHUlEQVRoge3ZL04DQRiG8aeQIBCYpgn9AwgEjlEI8KBIgGNQicRxgyYkXzAcAEeC4QYYTB0IJGoOAA7ShIUus/tNanffn3xnzT6ZZMV2YrAvmukTeAdegSfgsTcdPy/6pk0OVOUNmAC3ven4o+I8sZQszbYNXAMvMdiJAtXbBO5jMIvBVmqfanGgwjnwEIOtJic/2h5o5gi4i8GWkxMF+nUMXCWrApVcxmD7/0cF+tMBbmKwUhMFKtsFzuYXBUpdzC8KlDqIwXaKVYGqnRarAlU7LFYFqrYXg82+agpUYw3YQoFcCpSxgQK5hiiQq48CuRQoY4QCuXSDMga08LfPorq6Qb6+AvlGCuTTDcpQoIyhAvkGCuRToAwFcsH6N/3ELbhysyw9AAAAAElFTkSuQmCC);
	}
	.state-bg-2 {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAiCAYAAAD8gp97AAABG0lEQVRoge3ZL07EQBiG8aeQIBCYNewfQKzA4RCg1oAiAY7xWeQ6bkBCwmI4AI4EgxyH4QAgkJwB3Ec2obBl2pmsbd+ffKemTyapaGHBnXb6Aj6AN+AZeJpNipdl37TNgeq8A1fA3WxSfNacR1aipd3GwDXwasFPFajZNvBgwW8s+FrjUx0OVDLg0YKvRyc/uh5o7hi4t+Cr0YkC/ToBLqNVgSqmFvzg/6hAfwrg1oJXmihQ1R5wvrgoUOxicVGg2KEF3y1XBap3Vq4KVO+oXBWo3r4Fn3/VFKjBBrCDAiUpUMYWCpQ0RIGS+ihQkgJljFCgJN2gjAEd/O2zrJ5uUFpfgdJGCpSmG5ShQBlDBUobKFCaAmUoUBJsfgOKmDJo/pbGNgAAAABJRU5ErkJggg==);
	}
	.state-bg-3 {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAiCAYAAAD8gp97AAABHUlEQVRoge3Zr0oEURiG8WcUDAaLxf2jBoPNZtCuSVi9DKtw4GCzLWwRBLF4ATbB4h1YvAANRq/BbZ8sOLrjmfkOW2feX3zPlHk4MGEKi8FopynwCbwDL8BzMZ68LvqmbQ5U5wO4Bu6L8eSr5jyxlCzttgPcAG8Ww0iBmm0BjxbDrcWw0vhUhwOVzoEni2E1OfnR9UAzx8CDxbCcnCjQrxPgKlkVqOLSYjj4PyrQnwK4sxgqTRSoag84m18UKHUxvyhQ6tBi2C1XBap3Wq4KVO+oXBWo3r7FMPuqKVCDNWAbBXIpUMYmCuQaoECuHgrkUqCMIQrk0g3K6NPB3z6LWtcN8vUUyDdUIJ9uUIYCZQwUyNdXIJ8CZSiQCza+AcrXMBA95m57AAAAAElFTkSuQmCC);
	}
	.state-bg-4 {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAiCAYAAAD8gp97AAABG0lEQVRoge3ZL07EQBiG8aeQIBCYNewfQKzA4RCg1oAiAY7xWeQ6bkBCwmI4AI4EgxyH4QAgkJwB3Ec2obBl2pmsbd+ffKemTyapaOHBnHb6Aj6AN+AZeComs5dl37TNgeq8A1fAXTGZfdacR1aipd3GwDXw6sFOFajZNvDgwW482FrjUx0OVDLg0YOtRyc/uh5o7hi492Cr0YkC/ToBLqNVgSqmHuzg/6hAfwrg1oNVmihQ1R5wvrgoUOxicVGg2KEH2y1XBap3Vq4KVO+oXBWo3r4Hm3/VFKjBBrCDAiUpUMYWCpQ0RIGS+ihQkgJljFCgJN2gjAEd/O2zrJ5uUFpfgdJGCpSmG5ShQBlDBUobKFCaAmUoUBJsfgOWUDJoTNDE+QAAAABJRU5ErkJggg==);
	}
	.img-box.shadow {
		box-shadow: 0px 1upx 20upx 0px 
			rgba(204, 204, 204, 0.36);
	}
	
	.title {
		font-size: 26upx;
		line-height: 30upx;
		max-height: 72upx;
		margin-top: 17.5upx;
		color: #333333;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.author {
		margin-top: 9upx;
		color: #9da3b4;
		font-size: 24upx;
		line-height: 34upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	
	.book-image {
		width: 190upx;
		height: 266upx;
	}
	
	.book-image-one {
		padding: 16upx 10upx;
		width: 170upx;
		height: 234upx;					
	}
	
	.book-image-box {
		width: 190upx;
		height: 266upx;
		padding: 6upx 0;
	}
	
	.book-image-2 {
		float: left;
		margin: 10upx 0 0 10upx;
		width: 80upx;
		height: 112upx;				
	}
	
	.state {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 72upx;
		height: 34upx;
		line-height: 34upx;
		background-size: 72upx 34upx ;
		font-size:  20upx;
		color: #ffffff;
		text-align: center;
	}
	
	.select {
		position: absolute;
		top: -10upx;
		right: -10upx;
		width: 50upx;
		height: 50upx;
		
	}
	.sele-img, .sele-img-in {
		position: absolute;
		top: 0;
		left: 0;
		width: 50upx;
		height: 50upx;
		opacity: 1;
	}
	
</style>
