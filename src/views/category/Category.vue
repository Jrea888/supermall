<template> 
    <div class="category">
      <nav-tab class="home_nav"><div slot="center">商品分类</div></nav-tab>
      <div class="cate_list">
        <div class="cate_left">
          <list-left :leftInfo="cateLeft" @getLeftData="getleft"></list-left>
        </div>
        <div class="cate_right">
          <!-- 标题、图片、图片标题、链接 --> 
          <shop-list :shopData="cateShop" :bigTitle="cateTitle"></shop-list>
        </div>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
  import BackTop from 'components/content/backTop/BackTop'

import ListLeft from './childComps/ListLeft';
import ShopList from './childComps/ShopList';

import NavTab from '../../components/common/navbar/NavTab'

import {getCateLeft,getCateListData} from 'network/category'

  export default {
    name: 'Category',
    data(){
      return {
        scroll:null,
        cateLeft:[],
        cateShop:[],
        cateTitle:{},
      }
    },
    components:{
      ListLeft,
      ShopList,
      NavTab,
      BackTop
    },
    created(){
      // 请求数据
      this.getLeftData();
      this.getleft("3627");
    },
    // 组件 挂载 完之后
    mounted(){ 
      this.scroll = new BScroll(document.querySelector('.wrpper'),{
        probeType:3,
        click:true,
        pullUpLoad:true
      });
      this.scroll.on('scroll',position => {
        // console.log(position);
      });
      this.scroll.on('pullingUp',()=>{
        // console.log("上拉加载！");
      });
    },
    methods:{ 
     getLeftData(){
        getCateLeft().then(res => {
          let data = res.data.category;
          this.cateLeft = data.list;
          // console.log(this.cateLeft);
        }) 
      },
      getleft(id){
        getCateListData(id).then(res => { 
          this.cateTitle["title"] = res.data.info.title
          this.cateShop = res.data.list;
          // console.log( this.cateShop,"-----");
          // console.log( this.cateTitle,"-----");
        }); 
      }
    }
  }
</script>

<style>   
.category {
  height: 100vh;
}

.home_nav {
  background-color: var(--color-tint);
  color: #fff;
}

.cate_list{
  height:  calc(100% - 49px) ;
  display: flex;     
}

.cate_left{
  width: 100px;
  height: 100%;
  background:rgb(243, 253, 252)
}

.li_bg {
  background-color: white;
}

.content li {
  width: 100%;
  height: 46px;
  text-align: center;
  line-height: 46px;
  border-bottom: 1px solid #bfbcbc;
}

.cate_right {
  flex: 1;
  height: 100%;
  background: rgb(255, 234, 234);
}

</style>
