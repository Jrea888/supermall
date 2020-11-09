<template>
  <div class="cateInfo">
    <ul class="clear-fix">
      <li v-for="(item,index) in shopData" :key="index">
        <a :href="item.link">
          <img v-lazy="item.image" alt @load="cateImgLoad" />
          <span>{{item.title}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ShopList",
  props: {
    shopData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isImgLoad: false
    };
  },
  methods: {
    cateImgLoad() {
      if (!this.isImgLoad) {
        this.$emit("swiperImageLoad");
        this.isImgLoad = true;
      }
    }
  }
};
</script>

<style scoped>
.cateInfo {
  height: auto;
  padding-top: 15px;
}
.cateInfo ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.cateInfo ul li {
  width: 33%;
  float: left;
  padding: 5px 0;
  text-align: center;
}
.cateInfo ul li a {
  display: inline-block;
  width: 100%;
  height: auto;
}
.cateInfo ul li a img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}
.cateInfo ul li a span {
  font-size: 12px;
  display: block;
  color: #333;
  padding-top: 0.5rem;
}
</style>