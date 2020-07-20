<template> 
    <div>
      <nav-tab class="home_nav"><div slot="center">购物街</div></nav-tab> 
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
    </div>
</template>

<script>
import NavTab from 'components/common/navbar/NavTab';
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";

import {getHomeBannerInfo} from 'network/home';

  export default {
    name: 'Home',
    data(){
      return {
        banners:[],
        recommends:[]
      }
    },
    components:{
      NavTab,
      HomeSwiper,
      HomeRecommendView
    },
    created(){
      this.getMultiData();
    },
    methods:{
      // 网络请求方法
      getMultiData(){
        getHomeBannerInfo().then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      }

    }
  }
</script>

<style>  
.home_nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
