<template> 
    <div  id="detail">    
        <detail-nav class="title_top" @itemClick="tabClick"></detail-nav>
        <scroll class="content" ref="scroll">
            <detail-swipper :topImageInfo="topImages"></detail-swipper>
            <detail-bases-info :goods="goods"></detail-bases-info> 
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info> 
            <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
        </scroll>
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
import DetailRecommendInfo from './childComps/DetailRecommendInfo' 

import Scroll from 'components/common/scroll/Scroll'

import {getDetailInfo,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
import {debounce} from 'common/utils'
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
            }
        },        
        components:{
            DetailNav,
            DetailSwipper,
            DetailBasesInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailRecommendInfo, 
            Scroll
        }, 
        created(){
            // 1.保存iid
            this.iid = this.$route.params.iid;
            // 2.请求数据
            getDetailInfo(this.iid).then(res => {
                const data = res.result;
                // 1.获取轮播数据
                this.topImages = data.itemInfo.topImages;
                console.log(res);
                // 2.数据整合
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
                console.log(this.goods);
                // 3.获取商品信息
                this.shop = new Shop(data.shopInfo);
                console.log(this.shop);
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
                    console.log("----");
                    this.offetTopScroll = []
                    this.offetTopScroll.push(0);
                    this.offetTopScroll.push(this.$refs.params.$el.offsetTop);
                    this.offetTopScroll.push(this.$refs.comment.$el.offsetTop);
                    this.offetTopScroll.push(this.$refs.recommend.$el.offsetTop);
                    console.log(this.offetTopScroll,"offsetTop");
                },100)
            });
            // 获取推荐信息
            getRecommend().then((res, error) => { 
                // this.recommendList = res.data.list
                console.log(res.data.list,"推荐信息");
            })
        },
        methods:{
            // 详情图片加载完成 回调
            imageLoad(){
                this.$refs.scroll.refresh();
                 this.getThemeTopY();
            },
            tabClick(index){
                console.log(index);
                this.$refs.scroll.scrollTo(0,-this.offetTopScroll[index],200);
            }
        }
    }
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 12;
    height: 100vh;
    z-index: 1;
    background-color: #fff;
}
.content{
    height: calc(100% - 44px);
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
</style>