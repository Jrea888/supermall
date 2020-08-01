<template> 
  <div id="cart">
      <nav-tab class="cart_bar"><div slot="center">购物车({{length}})</div></nav-tab>
      <cart-list></cart-list>
  </div>
</template>

<script>

import CartList from './childComps/CartList'
import NavTab from 'components/common/navbar/NavTab';

import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components:{
      CartList,
      NavTab
    },
    computed:{
      // 两种语法 
      // ...mapGetters(['cartLength','cartList'])
      ...mapGetters({
        length:'cartLength',
        list:'cartList'
      })
    }
  }
</script>

<style>  
.cart_bar {
  color:white;
  background-color: var(--color-tint);
}
#cart {
  height: 100vh;
}
</style>
