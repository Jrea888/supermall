<template>
    <swiper class="detial-swiper">
        <swiper-item v-for="(item) in topImageInfo">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:'DetailSwipper',
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        topImageInfo:{
            type:Array,
            default(){ 
                return []
            }
        }
    }  
}
</script>

<style scoped> 
.detial-swiper{
    height: 300px;
    overflow: hidden;
}
</style>