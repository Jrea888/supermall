<template>
    <div class="title"> 
        <nav-bar>
            <div slot="left" @click="imageReturn"><img src="~assets/image/common/back.svg" alt=""></div>
            <div slot="center" class="title_list">
                <div class="title_content" v-for="(item,index) in titles" 
                     :class="{active: index === currentIndex}"
                     @click="changeActive(index)">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavTab'
    export default {
        name:'DetailNav',
        data(){
            return {
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        created(){
            this.iid = this.$route.params.iid
        },
        components:{
            NavBar
        },
        methods:{
            changeActive(index){
                this.currentIndex = index
            },
            imageReturn(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
.title {    
    box-shadow: 0px 5px 10px rgba(150,150,150,.08);
}
.title img {    
    margin-top: 12px;
    width: 40px;
    height: 25px;
}
.title {    
    box-shadow: 0px 5px 10px rgba(150,150,150,.08);
}
.title_list{
    display: flex
}
.title_content {
    flex: 1;
}
.active {
    color: red;
}
</style>