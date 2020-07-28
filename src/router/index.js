import Vue from 'vue'
import VueRouter from 'vue-router'


// 懒加载方式导入路由组件
const Home = ()=> import('../views/home/Home.vue'); 
const Category = ()=> import('../views/category/Category.vue'); 
const Cart = ()=> import('../views/cart/Cart.vue'); 
const Profile = ()=> import('../views/profile/Profile.vue'); 
const Detial = ()=> import('../views/detail/Detail.vue');

// 1.安装
Vue.use(VueRouter);


const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/category',
        component:Category
    },
    {
        path:'/cart',
        component:Cart
    },
    {
        path:'/profile',
        component:Profile
    },
    {
        path:'/detail/:iid',
        component:Detial
    }
] 
// 2.创建对象
const router = new VueRouter({
    routes,
    mode:"history"
});

export default router