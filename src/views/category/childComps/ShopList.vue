<template>
    <div class="rightcontent">      
        <div class="cateTitle">{{bigTitle.title}}</div> 
        <div class="cateInfo">
            <ul>
                <li v-for="(item,index) in shopData" :key="index">
                    <a :href="item.link">
                        <img v-lazy="item.image" alt="">
                        <div>{{item.title}}</div>
                    </a>
                </li> 
            </ul>
        </div>
    </div> 
</template>

<script>
export default {
    name:'ShopList',
    props:{
        shopData:{
            type:Array,
            default(){
                return []
            }
        },
        bigTitle:{
            type:Object,
            default(){
                return {}
            }
        }
    }, 
    data(){
        return {
            
        }
    },
    methods:{

    }
}
</script>

<style scoped>
.rightcontent{
  height: calc(100% - 49px);
  overflow: hidden;
  overflow-y: scroll;
}
.cateTitle {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 700;
  margin: 5px 0;
  padding: 0 10px;
  border-bottom: 2px solid #eee;
}
.cateInfo ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.cateInfo ul li {
  text-align: center;
}
.cateInfo ul li a {
  display: inline-block;
  width: 100%;
  height: auto;
}
.cateInfo ul li a img {
  width: 120px; 
  border-radius: 3px;
}
.cateInfo ul li a div {
  font-size: 14px;
  color: #333;
}
</style>