<template> 
    <div  id="detail">    
        <detail-nav class="title_top" @itemClick="tabClick" ref="detailNav"></detail-nav> 
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <div> 
                <detail-swipper :topImageInfo="topImages"></detail-swipper>
                <detail-bases-info :goods="goods"></detail-bases-info> 
                <detail-shop-info :shop="shop"></detail-shop-info>
                <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
                <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
                <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info> 
                <GoodsListTwo ref="recommend" :goods="recommendList"></GoodsListTwo>
            </div>
        </scroll>
        <detail-bottom-bar @addGoodsCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShowBackTop" ></back-top>

      <!-- <toast :message="message" :isShow="isShow"></toast> -->
    </div>
</template>

<script>
import DetailNav from './childComps/DetailNav'
import DetailSwipper from './childComps/DetailSwipper'
import DetailBasesInfo from './childComps/DetailBasesInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo' 
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsListTwo from 'components/content/goodtwo/GoodsListTwo'
// import Toast from 'components/common/toast/Toast' 

import {getDetailInfo,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
import {debounce} from 'common/utils'
import {BACKTOP_DISTANCE,REDUCE} from "common/const";
import {backTopMinix} from 'common/mixin'
import {mapActions} from 'vuex'

    export default {
        name:'Detail',
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommendList:[],
                offetTopScroll:[],
                getThemeTopY:null, 
                currentIndex:0, 

                // message:"",
                // isShow:false
            }
        },    
        // 混入
        mixins:[backTopMinix],    
        components:{
            DetailNav,
            DetailSwipper,
            DetailBasesInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo, 
            DetailBottomBar, 
            Scroll,
            GoodsListTwo,
            // Toast
        }, 
        created(){
            // 1.保存iid
            this.iid = this.$route.params.iid;
            // 2.请求数据 
            getDetailInfo(this.iid).then(res => {
                // console.log(res,"数据");
                const data = res.result;
                // 1.获取轮播数据
                this.topImages = data.itemInfo.topImages;
                
                // 2.数据整合
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
                // console.log(this.goods,"数据整合");
                // 3.获取商品信息
                this.shop = new Shop(data.shopInfo);
                // console.log(this.shop);
                // 4.获取图片数据
                this.detailInfo = data.detailInfo;
                // 5.获取保存参数尺码信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule); 
                // 6.获取评论信息
                if (data.rate.list) {
                    this.commentInfo = data.rate.list[0];
                }

                // this.$nextTick(() => {
                //     this.offetTopScroll = []
                //     this.offetTopScroll.push(0);
                //     this.offetTopScroll.push(this.$refs.params.$el.offsetTop);
                //     this.offetTopScroll.push(this.$refs.comment.$el.offsetTop);
                //     this.offetTopScroll.push(this.$refs.recommend.$el.offsetTop);
                //     console.log(this.offetTopScroll,"offsetTop");
                // });
                
                // 防抖动
                this.getThemeTopY = debounce(() => { 
                    this.offetTopScroll = []
                    this.offetTopScroll.push(0);
                    this.offetTopScroll.push(this.$refs.params.$el.offsetTop-REDUCE);
                    this.offetTopScroll.push(this.$refs.comment.$el.offsetTop-REDUCE);
                    this.offetTopScroll.push(this.$refs.recommend.$el.offsetTop-REDUCE);
                    this.offetTopScroll.push(Number.MAX_VALUE);
                    // console.log(this.offetTopScroll,"offsetTop");
                },200)
            });
            // 获取推荐信息
            getRecommend().then(res => { 
                this.recommendList = res.data.list 
            })
        },
        methods:{
            ...mapActions(['addCart']),
            // 详情图片加载完成 回调
            imageLoad(){
                // 滚动图片刷新的目的是为了让图片全部加载 得到图片的高度
                this.$refs.scroll.refresh();
                this.getThemeTopY();
            },
            tabClick(index){ 
                this.$refs.scroll.scrollTo(0,-this.offetTopScroll[index],200);
            },
            contentScroll(position){ 
                // 1.获取Y值
                const positionY = -position.y;
                // 2.positionY与主题中的值比较
                // [0, 15576, 16126, 16416] "offsetTop"
                /*
                    positionY 在 0 和 15576之间，index = 0
                    positionY 在 15576 和 16126 之间，index = 1
                    positionY 在 16126 和 16416 之间，index = 2
                    positionY 在 16416 和 较大值 之间，index = 3
                */ 
               let length = this.offetTopScroll.length; 
               for(let i = 0; i < length - 1; i++){
                   if(this.currentIndex !== i && (positionY >= this.offetTopScroll[i] && positionY < this.offetTopScroll[i+1])){
                        this.currentIndex = i;
                       this.$refs.detailNav.currentIndex = this.currentIndex; 
                   }

                //    if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.offetTopScroll[i] && positionY < this.offetTopScroll[i+1])  
                //    || (i === length - 1 && positionY >= this.offetTopScroll[i]))){
                //        this.currentIndex = i;
                //        this.$refs.detailNav.currentIndex = this.currentIndex; 
                //    }
               }
                this.listenShowTop(position);
            },
            // 接收发出的事件
            addToCart(){ 
                // 1.获取购物车所需要的显示信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid; 
                // 2.将商品添加到购物车里
                // this.$store.cartList.push(product);
                // this.$store.commit("addCart",product);
                // 3.添加成功后，弹出框提示
                /**
                 * 1. Actions里面可以返回Promise对象
                 * 2. 使用...mapActions映射到这里
                 */
                // 方法1：
                this.$store.dispatch("addCart",product).then(res => {
                    // 弹出框 Toast
                    this.$toast.show(res,2000);
                    console.log(this.$toast);
                });
                // 方法2：
                // this.addCart(product).then(res => {
                //     console.log(res);
                // }); 
            }
        }
    }
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 12;
    height: 100vh;
    background-color: #fff;
}
.content{
    height: calc(100% - 49px - 58px);
}
.title {    
    box-shadow: 0px 5px 10px rgba(150,150,150,.08);
}
.title img {    
    margin-top: 12px;
    width: 40px;
    height: 25px;
}
.title {    
    box-shadow: 0px 5px 10px rgba(150,150,150,.08);
}
.title_list{
    display: flex
}
.title_content {
    flex: 1;
}
.active {
    color: red;
}
.title_top{ 
    position: relative;
    z-index: 10;
    background-color: #fff; 
}
.info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
} 
</style>