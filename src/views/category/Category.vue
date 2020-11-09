<template>
  <div class="category">
    <nav-tab class="home_nav">
      <div slot="center">商品分类</div>
    </nav-tab>
    <div class="cate_list">
      <div class="cate_left">
        <div class="wrapper1">
          <scroll class="content" ref="scroll1">
            <list-left :leftInfo="cateLeft" @getLeftData="getleft" @backTopNav="backTopNav"></list-left>
          </scroll>
        </div>
      </div>
      <div class="cate_right">
        <div class="wrapper2">
          <tab-control
            ref="tabControl1"
            :titles="['综合','销量','新品']"
            @tabClick="tabNavControl"
            v-show="isTabFixed"
          ></tab-control>
          <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
            <shop-list :shopData="cateShop" @swiperImageLoad="swiperImageLoad"></shop-list>
            <tab-control
              ref="tabControl2"
              @tabClick="tabNavControl"
              :titles="['综合','销量','新品']"
              v-show="!this.isTabFixed"
            ></tab-control>
            <goods-list :goods="showGoodList" />
          </scroll>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import BackTop from "components/content/backTop/BackTop";
import NavTab from "components/common/navbar/NavTab";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import ListLeft from "./childComps/ListLeft";
import ShopList from "./childComps/ShopList";

import { getCateLeft, getCateListData } from "network/category";
import { getHomeBannerInfo, getHomeListData } from "network/home";
import { backTopMinix, itemListenerMixin, TabCeiling } from "common/mixin";
import { NEW, POP, SELL } from "common/const";

export default {
  name: "Category",
  data() {
    return {
      scroll: null,
      cateLeft: [],
      cateShop: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      indexCurrent: "pop",
      isTabFixed: false,
      tabOffsetTop: 0
    };
  },
  mixins: [backTopMinix, itemListenerMixin, TabCeiling],
  components: {
    NavTab,
    Scroll,
    BackTop,
    TabControl,
    GoodsList,
    ListLeft,
    ShopList
  },
  created() {
    this.getLeftData();
    this.getleft("3627");

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
  methods: {
    backTopNav() {
      this.$refs.scroll.scrollTo(0, 0, 200);
    },
    getGoodsListData(type) {
      // 请求第一页数据
      const page = this.goods[type].page + 1;
      getHomeListData(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多 必须调用此方法 才可以继续下一步下拉加载
        // this.$refs.scroll.finishPullUp();
      });
    },
    getLeftData() {
      getCateLeft().then(res => {
        let data = res.data.category;
        this.cateLeft = data.list;
      });
    },
    getleft(id) {
      getCateListData(id).then(res => {
        this.cateShop = res.data.list;
      });
    }
  }
};
</script>

<style>
.home_nav {
  background-color: var(--color-tint);
  color: #fff;
}

.cate_list {
  display: flex;
}

.cate_left {
  width: 100px;
  height: 85vh;
  background: rgb(243, 253, 252);
}

.cate_right {
  height: 92vh;
  flex: 1;
}
.wrapper1 {
  height: calc(100% - 0px);
}
.wrapper2 {
  height: calc(100% - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
