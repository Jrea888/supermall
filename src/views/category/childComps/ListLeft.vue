<template>
    <div class="wrpper"> 
        <ul class="content"> 
            <li v-for="(item,index) in leftInfo" :key="index" :class="{active:index === currentIndex}"  @click="getKindList(item,index)">{{item.title}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'ListLeft',
    props:{
        leftInfo:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0,
            isActive:false
        }
    },
    computed:{
        // getActive(index){
        //     return  {active:index === this.currentIndex}
        // }
    },
    methods:{
        getKindList(item,index){ 
            // 发送事件，获取对应的数据
            this.$emit("getLeftData",item.maitKey);
            for(let i=0; i<=this.leftInfo.length;i++){
                if(index === i){
                    this.currentIndex = index;
                    return ;
                }
            }
        }   
    }
}
</script>

<style scoped>
.wrpper {
  height: calc(100% - 49px); 
  overflow: hidden;
}
.active {
    color: red;
    background: white;
}
</style>