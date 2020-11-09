<template>
  <div>
    <div class="info-header">
      <slot name="recommend"></slot> 
    </div>
    <div class="goods">
      <goods-list-item v-for="item in goods" :goods-item="item" />
    </div>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: { 

  }
};

</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>