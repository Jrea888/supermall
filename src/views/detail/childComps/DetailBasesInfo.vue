<template> 
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>

export default {
    name:'DetailBasesInfo',
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
.base-info{
   margin: 8px;
}
 .info-title{
   font-weight: 700;
   font-size: 16px;
   text-align: justify;
 } 
.info-price .n-price{
  color: red;
  font-size: 20px;
}
.info-price .o-price{
 font-size: 14px;
 color: #828882;
 text-decoration:line-through;
 margin-left: 5px;
}
.info-price .discount{
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;
}
.info-other{
    margin-top: 15px;
    line-height: 30px;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    display: flex;
    justify-content: space-between;
} 
.info-service{
  margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
.info-service img {
  width: 20px;
  vertical-align: middle;
}
.info-service span {
  font-size: 14px;
} 
</style>