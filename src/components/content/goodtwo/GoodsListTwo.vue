<template>
    <div class="recommend-info">
        <div class="info-header">热门推荐</div> 
        <div class="goods-flex">
            <goods-list-item-two  v-for="item in goods" :goods-item="item"/>
        </div>
    </div>
</template>

<script>
import GoodsListItemTwo from './GoodsListItemTwo'

export default {
    name:'GoodsListTwo',
    components:{
        GoodsListItemTwo
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped> 
.recommend-info {
    padding: 5px;
}
.goods-flex{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around
}

.info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
} 
</style>