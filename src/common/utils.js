export function debounce(func,delay){// 事件监听相关方法
  let timer = null;
  return function(...args){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log("执行抖动函数");
      func.apply(this,args);
    },delay);
  }
}