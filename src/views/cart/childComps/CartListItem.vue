<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native.stop="isCheckedState"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">
          <button :disabled="isShowDisabled" @click.stop="decrement(itemInfo)">-</button>
          {{itemInfo.count}}
          <button @click.stop="increment(itemInfo)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data(){
    return {
      isShowDisabled:false
    }
  },
  methods: {
    isCheckedState() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
    // 增加
    increment(params){ 
      this.$store.dispatch('increment',params);
      if(params.count > 0){
        return this.isShowDisabled = false;
      }
    },
    // 减少
    decrement(params){
      this.$store.dispatch('decrement',params);
      if(params.count <= 0){
        return this.isShowDisabled = true;
      }
    }
  }
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

.right button {
  width: 25px;
}
 
</style>