<template>
  <div class="cateList">
    <ul>
      <li
        v-for="(item,index) in leftInfo"
        :key="index"
        :class="{active:index === currentIndex}"
        @click="getKindList(item,index)"
      >
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ListLeft",
  props: {
    leftInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      isActive: false
    };
  },
  computed: {
    // getActive(index){
    //     return  {active:index === this.currentIndex}
    // }
  },
  methods: {
    getKindList(item, index) {
      // 发送事件，获取对应的数据 
      this.$emit('backTopNav');
      this.$emit("getLeftData", item.maitKey);
      for (let i = 0; i <= this.leftInfo.length; i++) {
        if (index === i) {
          this.currentIndex = index;
          return;
        }
      } 
    }
  }
};
</script>

<style scoped>
.cateList {
  height: auto;
}
.cateList ul li {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
}
.cateList ul li span {
  font-size: 12px;
}
.active {
  color: red;
  background: white;
  font-weight: bold;
}
.active span {
  border-bottom: 2px solid red;
  padding: 5px 10px;
}
</style>