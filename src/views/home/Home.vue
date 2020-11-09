<template>
  <div id="home">
    <!-- 顶部导航 -->
    <nav-tab class="home_nav">
      <div slot="center">购物街</div>
    </nav-tab>
    <!-- 首页Tab切换 -->
    <tab-control
      ref="tabControl1"
      :titles="['流行','新款','精选']"
      @tabClick="tabNavControl"
      v-show="isTabFixed"
    ></tab-control>
    <!-- better-scroll 滚动封装组件 -->
    <div class="wrapper">
      <!-- 滚动组件封装 -->
      <scroll
        class="content"
        ref="scroll"
        :probeType="3"
        @scroll="contentScroll"
        @pullingUp="loadMove"
        :pull-up-load="true"
      >
        <!-- 轮播图 -->
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <!-- 推荐数据 四个 -->
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <!-- 本周流行 -->
        <future-view></future-view>
        <!-- 当isTabFixed为 true时 就显示tabControll1，此组件将被划上去，遮住-->
        <tab-control
          ref="tabControl2"
          :titles="['流行','新款','精选']"
          @tabClick="tabNavControl"
          v-show="!this.isTabFixed"
        ></tab-control>
        <!-- Tab切换的数据 -->
        <goods-list :goods="showGoodList" />
      </scroll>
    </div>
    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FutureView from "./childComps/FutureView";
// 公共组件
import NavTab from "components/common/navbar/NavTab";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
// 引用方法
import { getHomeBannerInfo, getHomeListData } from "network/home";
import { debounce } from "common/utils";
import { backTopMinix, itemListenerMixin, TabCeiling } from "common/mixin";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      saveY: 0
    };
  },
  // 混入
  mixins: [backTopMinix, itemListenerMixin, TabCeiling],
  // 注册组件
  components: {
    FutureView,
    HomeSwiper,
    HomeRecommendView,
    NavTab,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    // 请求多个数据
    this.getMultiData();
    // 请求 TabControl 数据
    this.getGoodsListData("pop");
    this.getGoodsListData("new");
    this.getGoodsListData("sell");
  },
  mounted() {
    this.$refs.scroll.refresh();
  },
  computed: {
    showGoods() {
      return this.indexCurrent;
    },
    showGoodList() {
      return this.goods[this.showGoods].list;
    }
  },
  // 回来时停留到 离开时的位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  // 离开组件时记录 所滚动的 saveY 值
  deactivated() {
    // 1.保存Y
    this.saveY = this.$refs.scroll.getScrollY();
    console.log(this.saveY);
    // 2.取消全局事件
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    // 上拉加载更多
    loadMove() {
      this.getGoodsListData(this.indexCurrent);
    },
    // 网络请求方法
    getMultiData() {
      getHomeBannerInfo().then(res => {
        // 获取轮播图数据
        this.banners = res.data.banner.list;
        // 获取 四个推荐数据
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求货物列表数据
    getGoodsListData(type) {
      // 请求第一页数据
      const page = this.goods[type].page + 1;
      getHomeListData(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多 必须调用此方法 才可以继续下一步下拉加载
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>
<style scoped>
#home {
  height: 100vh;
}
.home_nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用原生浏览器滚动时，为了不让导航集合网页一起滚动所设置的样式
    position:fixed;
    left:0;
    top:0
    right:0
    z-index:9
   */
}
.wrapper {
  height: calc(100% - 97px);
}
.content {
  height: 100%;
  overflow: hidden;
}

/* position: absolute;
  left: 0;
  right:0;
  top: 45px;
  bottom: 45px;
  overflow: hidden; */
</style>
