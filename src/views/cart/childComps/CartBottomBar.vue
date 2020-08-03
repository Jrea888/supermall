<template>
    <div class="bottom_bar">
        <div class="checkcontent" @click="AllClick">
            <CheckButton class="checkAll" :is-checked="isSelected"></CheckButton>
            <div>全选</div> 
        </div>
        <div class="counter">
            合计：{{totalPrice}}
        </div>  
        <div class="NumberCart">
            去计算({{AllCheckedGoods}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'
import {mapGetters} from 'vuex';
export default {
    name:'CartBottomBar',
    components:{
        CheckButton
    },
    computed:{
        ...mapGetters(['cartList']),
        totalPrice(){
            return this.cartList.filter(item => {
                return item.checked;
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count;
            },0).toFixed(2);
        },
        AllCheckedGoods(){
            return this.cartList.filter(item => {
                return item.checked
            }).length
        },
        isSelected(){
            if(this.cartList.length === 0) return false;
            // 1.使用 filter 
            /**
             * 过滤没有选中的，如果有一个没有选中，全选就为false，如果全部选中，全选就为true
             * 如果有一个没有选中，取反后为true，长度为1，对数字1取反为false，
             * 如果没有一个选中，取反后为false，长度为0，对数字0取反为true； 
             */ 
            // return !this.cartList.filter(item => {
            //     return !item.checked
            // }).length;

            // 2.使用find  
            /**
             * 如果查找到 有一个没有选中，返回为true（查找到了）；
             * 如果查找 没有一个选中，返回为false （没有查找到）；
             */ 
            // return !this.cartList.find(item => !item.checked);

            // 3.for循环
            for(let item of this.cartList){
                if(!item.checked){
                    // 如果有一个没有选中，返回值为false 全选为不选中状态
                    return false;
                }
            }
            return true;

        }
    },
    methods:{
        AllClick(){
            if(this.isSelected){// 全部选中
                this.cartList.forEach(item => item.checked = false);
            }else{
                this.cartList.forEach(item => item.checked = true);
            }
        }
    }
}
</script>

<style scoped>
.bottom_bar{
    display: flex;
    position: relative;
    height: 45px; 
    line-height: 45px;
    background:#eee;
}
.checkcontent{
    display: flex;
    align-items: center;
    width: 100px;
}
.checkAll{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 20px;
    margin-right: 5px;
}
.counter{
    flex: 1;
    margin-left: 10px;
}
.NumberCart {
    width: 100px;
    background: red;
    color: white;
    text-align: center;
}
</style>