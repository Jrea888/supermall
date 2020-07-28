<template>
    <div class="goods-item">
        <img :src="goodsItem.show.img" alt="" @load="imageLoad" @click="itContentPage"> 
        <div class="goods-item-title">
            <p>{{goodsItem.title}}...</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div> 
    </div>
</template>


<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        imageLoad(){
            // 发射出一个事件总线
            console.log("图片加载发出事件！");
            this.$bus.$emit("itemImageLoad");
        },
        itContentPage(){
            console.log("点击详情页！"); 
            // 跳转 动态传ID push 到路由中的某一个路径
            this.$router.push('/detail/'+this.goodsItem.iid)
        }
    }
}

</script>

<style scoped>
.goods-item {
    position: relative;
    padding-bottom:40px;
    width: 48%;
}
.goods-item img{    
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
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/image/common/collect.svg") 0 0/14px 14px;
}
</style>