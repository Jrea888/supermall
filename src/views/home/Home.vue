<template> 
    <div id="home" class="wrapper">
      <nav-tab class="home_nav"><div slot="center">购物街</div></nav-tab> 
      <!-- better-scroll 滚动封装组件 -->
      <scroll class="content" 
              ref="scroll" 
              :probeType="3" 
              @scroll="contentScroll"
              @pullingUp="loadMove">
        <home-swiper :banners="banners"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <future-view></future-view>
        <tab-control class="tab-control" 
        :titles="['流行','新款','精选']"
        @tabClick="tabNavControl"></tab-control>
        <goods-list :goods="goods[showGoods].list"/>
      </scroll>
      
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FutureView from "./childComps/FutureView"

import NavTab from 'components/common/navbar/NavTab';
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeBannerInfo,getHomeListData} from 'network/home';

  export default {
    name: 'Home',
    data(){
      return {
        banners:[],
        recommends:[],
        // 定义数据存储格式
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        indexCurrent:'pop',
        isShowBackTop:false
      }
    },
    components:{
      FutureView,
      HomeSwiper,
      HomeRecommendView,
      NavTab,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created(){
      // 请求多个数据
      this.getMultiData();
      // 请求货物数据
      this.getGoodsListData('pop');
      this.getGoodsListData('new');
      this.getGoodsListData('sell');

    },
    mounted(){
      // 监听总线
      this.$bus.$on("itemImageLoad",() => {
          console.log("接收事件总线！");
          console.log(this.$refs.scroll);
          this.$refs.scroll.refresh();
      })
    },
    computed:{
      showGoods(){
        return this.indexCurrent
      }
    },
    methods:{
      // 数据切换
      tabNavControl(index){ 
        console.log(index);
        switch(index){
          case 0:
            this.indexCurrent = 'pop'
            break;
          case 1:
            this.indexCurrent = 'new'
            break;
          case 2:
            this.indexCurrent = 'sell'
            break;
        }
      },
      // 返回顶部 
      backClick(){
        console.log("backClick");
        // 面向组件的封装 
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      // 返回距离图表 是否 显示
      contentScroll(position){
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000;
      },
      loadMove(){
        this.getGoodsListData(this.indexCurrent);
        console.log("完成上拉加载","loadMove");
        // 异步加载图片时的问题  刷新一次
        // this.$refs.scroll.refresh();
      },
      // 网络请求方法
      getMultiData(){
        getHomeBannerInfo().then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      // 请求货物列表数据
      getGoodsListData(type){
        // 请求第一页数据
        const page = this.goods[type].page+1;  
        getHomeListData(type,page).then(res => { 
          // 参数扩展
          this.goods[type].list.push(...res.data.list);
          // 页码j加 1 
          this.goods[type].page += 1;

          // 加载后 必须调用此方法 才可以继续下一步下拉加载
          this.$refs.scroll.finishPullUp() 
        })
      }

    }
  }
</script>

<style scoped> 
#home {
  padding-top: 49px;
  height: 100vh;
}
.home_nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
} 
.tab-control {
  position: sticky;
  top:49px;
  z-index: 9;
}
.content {
  height: calc(100% - 47px);
  overflow: hidden; 
  /* position: absolute;
  left: 0;
  right:0;
  top: 45px;
  bottom: 45px;
  overflow: hidden; */
}
</style>
