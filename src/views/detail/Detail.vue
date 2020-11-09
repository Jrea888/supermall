<template>
  <div id="detail">
    <detail-nav class="title_top" @itemClick="tabClick" ref="detailNav"></detail-nav> 
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swipper :topImageInfo="topImages"></detail-swipper>
      <detail-bases-info :goods="goods"></detail-bases-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendList" >
        <div slot="recommend">热门推荐</div>
      </goods-list>
    </scroll> 
    <detail-bottom-bar @addGoodsCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :isShow="isShow"></toast> -->
  </div>
</template>

<script>
import DetailNav from "./childComps/DetailNav";
import DetailSwipper from "./childComps/DetailSwipper";
import DetailBasesInfo from "./childComps/DetailBasesInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from 'components/common/toast/Toast'

import {
  getDetailInfo,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import { debounce } from "common/utils";
import { BACKTOP_DISTANCE, REDUCE } from "common/const";
import { backTopMinix,itemListenerMixin} from "common/mixin";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      offsetTopScroll: [],
      getThemeTopY: null,
      currentIndex: 0,

      // message:"",
      // isShow:false
    };
  },
  // 混入
  mixins: [backTopMinix,itemListenerMixin],
  components: {
    DetailNav,
    DetailSwipper,
    DetailBasesInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
    // Toast
  },
  created() {
    // 1.保存iid
    this.iid = this.$route.params.iid;
    // 2.请求数据
    getDetailInfo(this.iid).then(res => {
      console.log(res)
      const data = res.result;
      // 1.获取轮播数据
      this.topImages = data.itemInfo.topImages;
      // 2.数据整合
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取商品信息
      this.shop = new Shop(data.shopInfo);
      // 4.获取图片数据
      this.detailInfo = data.detailInfo;
      // 5.获取保存参数尺码信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      } 
      // 防抖动处理后，获取组件和被滚动的距离，等一会。
      this.getThemeTopY = debounce(() => {
        this.offsetTopScroll = [];
        this.offsetTopScroll.push(0);
        this.offsetTopScroll.push(this.$refs.params.$el.offsetTop - REDUCE);
        this.offsetTopScroll.push(this.$refs.comment.$el.offsetTop - REDUCE);
        this.offsetTopScroll.push(this.$refs.recommend.$el.offsetTop - REDUCE);
        // 取一个非常大的值
        this.offsetTopScroll.push(Number.MAX_VALUE);
      }, 200);
    });
    // 获取推荐信息
    getRecommend().then(res => {
      this.recommendList = res.data.list;
    });
  },
  mounted(){ },
  destroyed(){
    // 取消事件
    this.$bus.$off('itemImageLoad',this.itemImageListener)
  },
  methods: {
    ...mapActions(["addCart"]),
    // 详情图片加载完成 回调
    imageLoad() {
      // 滚动图片刷新的目的是为了让图片全部加载 得到图片的高度
      // this.$refs.scroll.refresh();
      this.newRefresh();
      this.getThemeTopY();
    },
    tabClick(index) {
      this.$refs.scroll.scrollTo(0, -this.offsetTopScroll[index], 200);
    },
    contentScroll(position) {
      // 1.获取Y值
      const positionY = -position.y;
      // 2.positionY与主题中的值比较
      let length = this.offsetTopScroll.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.offsetTopScroll[i] &&
          positionY < this.offsetTopScroll[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNav.navCurrentIndex = this.currentIndex;
        }
      }
      // 返回顶部
      this.listenShowTop(position);
    },
    // 添加到购物车
    addToCart() { 
      console.log(this.goods)
      // 1.获取购物车所需要的显示信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid; 
      /**
       * 2.将商品添加到购物车里
       * 3.添加成功后，弹出框提示
       */
      // 方法1：
      this.$store.dispatch("addCart", product).then(res => {
        // 弹出框 Toast
        this.$toast.show(res, 2000);
      });
      // 方法2：(...mapActions)
      // this.addCart(product).then(res => {
      //     console.log(res);
      // });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 12;
  height: 100vh;
  background-color: #fff;
} 
.content {
  height: calc(100% - 120px);
  overflow: hidden;
}
.title {
  box-shadow: 0px 5px 10px rgba(150, 150, 150, 0.08);
}
.title img {
  margin-top: 12px;
  width: 40px;
  height: 25px;
}
.title {
  box-shadow: 0px 5px 10px rgba(150, 150, 150, 0.08);
}
.title_list {
  display: flex;
}
.title_content {
  flex: 1;
}
.active {
  color: red;
}
.title_top {
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