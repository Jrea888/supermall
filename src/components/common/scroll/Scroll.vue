<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
         pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            scroll:null
        }
    },
    // 被挂载之后
    mounted(){
        // 创建scroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        });
        this.scroll.scrollTo(0,0);
        // 滚动是是否显示
        if(this.probeType === 2 || this.probeType === 3){
            this.scroll.on("scroll",position =>{ 
                this.$emit("scroll",position);
            });
        }
       
        // 监听是否到达底部  完成上拉加载
        if(this.pullUpLoad){
            this.scroll.on("pullingUp",() => {
                console.log("监听到滚动到底部","Scroll");
                this.$emit("pullingUp");
            });
        }
        // 重新刷新
        this.scroll.refresh();
    },
    methods:{
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time);
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp();
        },
        refresh (){
            console.log("刷新");
            this.scroll && this.scroll.refresh();
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>

<style scoped>

</style>