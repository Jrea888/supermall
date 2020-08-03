import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false;
// Vue 实例可以作为事件总线
Vue.prototype.$bus = new Vue();
// 安装toast
Vue.use(toast);
FastClick.attach(document.body);

// 图片懒加载安装
Vue.use(VueLazyLoad,{
  loading:require('./assets/image/common/placeholder.png')
});

new Vue({
  render: h => h(App),
  router,
  store, 
}).$mount('#app')




