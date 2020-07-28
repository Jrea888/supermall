<template>
    <swiper>
        <swiper-item v-for="item in banners">
            <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoadHeight">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
    name:"HomeSwiper",    
    components:{ 
        Swiper,
        SwiperItem
    },
    props:{
        banners:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
            isLoad:false
        }
    },
    methods:{
        imageLoadHeight(){
            // 只获取一次值
            if (!this.isLoad) {
                this.$emit("swiperImageLoad");
                this.isLoad = true
            } 
        }

    }
}
</script>