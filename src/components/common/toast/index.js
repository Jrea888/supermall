import Toast from './Toast.vue'
const obj = {}

obj.install = function (Vue){ 
    // document.body.appendChild(Toast.$el);
    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    // 2.new 组件构造器 创建出一个组件对象
    const toast = new toastContrustor();
    // 3.将组件对象手动挂载到某个元素上
    toast.$mount(document.createElement('div'));
    // 4.添加到DOM结构上
    document.body.appendChild(toast.$el);
    
    Vue.prototype.$toast = toast
}

export default obj;