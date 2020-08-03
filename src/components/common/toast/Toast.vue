<template>
    <div class="toast_title" v-show="isShow">
        <span>{{message}}</span>
    </div>
</template>

<script>
export default {
    name:'Toast', 
    data(){
        return {
            message:"",
            isShow:false
        }
    },
    methods:{
        show(message,duration){
            // 取默认值
            // duration = duration || 2000
            this.isShow = true;
            this.message = message;

            setTimeout(() => {
                this.isShow = false;
                this.message = '';
            },duration);
        }
    }
}
</script>

<style scoped>
.toast_title{
    position: fixed;
    top: 50%;
    left: 50%;
    color: white;
    padding: 8px 10px;
    border-radius: 10px;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.6);
    z-index: 999;
}
</style>