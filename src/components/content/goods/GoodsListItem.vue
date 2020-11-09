<template>
  <div class="goods-item">
    <img v-lazy="showImage" alt @load="imageLoad" @click="itContentPage" />
    <div class="goods-item-title">
      <p>{{goodsItem.title}}...</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    },
    recommendList: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad() {
      // 发射出一个事件总线
      if (this.$route.path.indexOf("/home")) {
        this.$bus.$emit("itemImageLoad");
      } else if (this.$route.path.indexOf("/detail")) {
        this.$bus.$emit("itemImageLoad");
      } else if (this.$route.path.indexOf("/category")) {
        this.$bus.$emit("itemImageLoad");
      }
    },
    itContentPage() {
      // 跳转 动态传ID push 到路由中的某一个路径
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-item-title {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  overflow: hidden;
}
.goods-item-title p {
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-item-title .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-item-title .collect {
  position: relative;
}

.goods-item-title .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/image/common/collect.svg") 0 0/14px 14px;
}
</style>