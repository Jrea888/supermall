<template> 
    <div  id="detail">    
        <detail-nav class="title_top"></detail-nav>
        <scroll class="content" ref="scroll">
            <detail-swipper :topImageInfo="topImages"></detail-swipper>
            <detail-bases-info :goods="goods"></detail-bases-info> 
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
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

import Scroll from 'components/common/scroll/Scroll'

import {getDetailInfo,Goods,Shop,GoodsParam} from 'network/detail'
    export default {
        name:'Detail',
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{}
            }
        },        
        components:{
            DetailNav,
            DetailSwipper,
            DetailBasesInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
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
                // 5.获取尺码信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            }) 
        },
        methods:{
            imageLoad(){
                this.$refs.scroll.refresh();
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