<template>
  <div id="cart">
    <nav-tab class="cart_bar">
      <div slot="center">购物车({{length}})</div>
    </nav-tab>
    <cart-list></cart-list>
    <buttom-bar></buttom-bar>
  </div>
</template>

<script>
import CartList from "./childComps/CartList";
import ButtomBar from "./childComps/CartBottomBar";
import NavTab from "components/common/navbar/NavTab";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    CartList,
    ButtomBar,
    NavTab
  },
  computed: {
    // 两种语法
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: "cartLength",
      list: "cartList"
    })
  },
  activated(){ 
    // 获取 localStorage中的数据
    let goodsList = window.localStorage.getItem('cartGoods');
    // console.log(goodsList,"localStrage")
    // console.log(JSON.parse(goodsList),"localStrage")
  }
};
</script>

<style>
.cart_bar {
  color: white;
  background-color: var(--color-tint);
}
#cart {
  height: 100vh;
}
</style>
