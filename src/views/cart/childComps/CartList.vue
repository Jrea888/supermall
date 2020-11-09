<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item,index) in cartList"
        :key="index"
        :item-info="item"
        @click.native="interDetailPage(item)"
      />
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    interDetailPage(info) {
      this.$router.push("/detail/" + info.iid);
    }
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 49px - 48px - 45px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>