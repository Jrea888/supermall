<template>
    <div class="goods-item"> 
        <img :src="goodsItem.image" alt="" > 
        <div class="goods-item-title">
            <p>{{goodsItem.title}}...</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div> 
    </div>
</template>


<script>
export default {
    name:'GoodsListItemTwo',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    creared(){
        console.log("子组件加载");
    },
    methods:{

    },
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