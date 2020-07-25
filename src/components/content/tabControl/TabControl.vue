<template>
    <div class="tab-control">
        <div class="tab-control-item" 
             v-for="(item,index) in titles" 
             :class="{active:index === indexCurrent}" 
             @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            indexCurrent:0
        }
    },
    methods:{
        itemClick(index){
            this.indexCurrent = index;
            this.$emit("tabClick",index);
        }
    }
}
</script>

<style scoped>
.tab-control {
    display: flex;
    text-align: center;
    height: 35px;
    line-height: 35px;
    font-size: 15xp;
    background-color: #efef;
}
.tab-control-item {
    flex: 1;
}
.active span {
    padding: 3px;
    border-bottom: 2px solid red;
}
.active {
    color:red;
}

</style>