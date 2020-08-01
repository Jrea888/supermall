<template> 
    <div id="home">
      <nav-tab class="home_nav"><div slot="center">购物街</div></nav-tab>  
      <tab-control ref="tabControl1" 
            :titles="['流行','新款','精选']" 
            @tabClick="tabNavControl" v-show="isTabFixed"></tab-control>
      <!-- better-scroll 滚动封装组件 -->
      <div  class="wrapper">
        <scroll class="content" 
                ref="scroll" 
                :probeType="3" 
                @scroll="contentScroll"
                @pullingUp="loadMove"
                :pull-up-load="true">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <home-recommend-view :recommends="recommends"></home-recommend-view>
            <future-view></future-view>
            <tab-control ref="tabControl2" 
                        :titles="['流行','新款','精选']" 
                        @tabClick="tabNavControl"></tab-control>
            <goods-list :goods="goods[showGoods].list"/>
        </scroll>
      </div>
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
import {debounce} from 'common/utils' 
import {NEW, POP, SELL} from "common/const";
import {backTopMinix} from 'common/mixin'

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
        indexCurrent:POP, 
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    mixins:[backTopMinix],
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
      // 防抖处理  
      const refresh = debounce(this.$refs.scroll.refresh,200);
      // 监听总线 图片加载向下滑动Bug处理
      this.$bus.$on("itemImageLoad",() => {
          // console.log("接收事件总线！"); 
          // this.$refs.scroll.refresh();
          refresh();
      }); 
    },
    computed:{
      showGoods(){
        return this.indexCurrent
      }
    },
    destroyed(){
      console.log("Home destroyed");
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY(); 
    },
    methods:{
      // 数据切换
      tabNavControl(index){  
        switch(index){
          case 0:
            this.indexCurrent = POP
            break;
          case 1:
            this.indexCurrent = NEW
            break;
          case 2:
            this.indexCurrent = SELL
            break;
        }
        this.$refs.tabControl1.indexCurrent = index;
        this.$refs.tabControl2.indexCurrent = index;
      }, 
      // 返回距离图表 是否 显示
      contentScroll(position){
        // console.log(position);
        // 1.判断backTop是否显示
        this.listenShowTop(position);
        // 2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      loadMove(){
        this.getGoodsListData(this.indexCurrent);
        // console.log("完成上拉加载","loadMove");
        // 异步加载图片时的问题  刷新一次
        // this.$refs.scroll.refresh();
      },
      swiperImageLoad(){
        // 获取tabControl的offsetTop，所有的组件都有一个属性$el:用于获取组件的元素
        // console.log(this.$refs.tabControl2.$el.offsetTop,"最大图片加载完成之后");
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        // console.log(this.tabOffsetTop);
      },

      // 网络请求方法
      getMultiData(){
        getHomeBannerInfo().then(res => { 
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
          this.$refs.scroll.finishPullUp();
        })
      }

    }
  }
</script>

<style scoped> 
#home {
  height: 100vh;
}
.home_nav {
  background-color: var(--color-tint);
  color: #fff;
} 
.wrapper {
  height: calc(100% - 49px - 48px);
}
.content { 
  height: 100%;
  overflow: hidden;  

  /* position: absolute;
  left: 0;
  right:0;
  top: 45px;
  bottom: 45px;
  overflow: hidden; */
}

</style>
