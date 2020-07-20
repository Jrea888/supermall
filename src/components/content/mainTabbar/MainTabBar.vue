<template>
  <tab-bar>
    <tab-bar-item link="/home">
      <img slot="icon" src="~assets/image/tabbar/home.svg" alt="">
      <img slot="active-icon" src="~assets/image/tabbar/home_active.svg" alt="">
      <div slot="text">首页</div>
    </tab-bar-item>
    <tab-bar-item link="/category">
      <img slot="icon" src="~assets/image/tabbar/category.svg" alt="">
      <img slot="active-icon" src="~assets/image/tabbar/category_active.svg" alt="">
      <div slot="text">分类</div>
    </tab-bar-item>
    <tab-bar-item link="/cart">
      <img slot="icon" src="~assets/image/tabbar/cart.svg" alt="">
      <img slot="active-icon" src="~assets/image/tabbar/cart_active.svg" alt="">
      <div slot="text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link="/profile">
      <img slot="icon" src="~assets/image/tabbar/profile.svg" alt="">
      <img slot="active-icon" src="~assets/image/tabbar/profile_active.svg" alt="">
      <div slot="text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

  <script>
    import TabBar from 'components/common/tabbar/TabBar'
    import TabBarItem from 'components/common/tabbar/TabBarItem'

    export default {
      name: "MainTabBar",
      components: {
        TabBar, 
        TabBarItem
      }
    }
  </script>

<style scoped>

</style>
