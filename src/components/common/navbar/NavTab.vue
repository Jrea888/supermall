<template>
    <div class="nav_title">
        <div class="left_title"><slot name="left"></slot></div>
        <div class="center_title"><slot name="center"></slot></div>
        <div class="right_title"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name:'NavTab', 
    }
</script>

<style scoped>
.nav_title{
    display: flex;
    height: 49px;
    line-height: 49px;
    text-align: center;
}
.center_title {
    flex: 1;
}
.left_title, .right_title{
    width: 65px;
}
</style>
