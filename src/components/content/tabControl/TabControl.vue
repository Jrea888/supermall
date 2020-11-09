<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item,index) in titles"
      :class="{active:index === tabControlIndex}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl", 
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      tabControlIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.tabControlIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  background-color: rgb(244, 253, 255);
}
.tab-control-item {
  flex: 1;
}
.active span {
  padding: 3px;
  border-bottom: 2px solid red;
}
.active {
  color: red;
}
</style>