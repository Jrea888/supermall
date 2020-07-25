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
            probeType:this.probeType
        });
        this.scroll.scrollTo(0,0);
        // 滚动是是否显示
        this.scroll.on("scroll",position =>{ 
            this.$emit("scroll",position);
        });
        // 监听是否到达底部  完成上拉加载
        this.scroll.on("pullingUp",() => {
            console.log("完成上拉加载","Scroll");
            this.$emit("pullingUp");
        });
        // 重新刷新
        this.scroll.refresh();
    },
    methods:{
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time);
        },
        finishPullUp(){
            this.scroll.finishPullUp();
        },
        refresh (){
            this.scroll && this.scroll.refresh();
        }
    }
}
</script>

<style scoped>

</style>