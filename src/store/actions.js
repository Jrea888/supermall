import {
  ADD_COUNTER,
  ADD_TO_CART,
  SUB_COUNTER
} from './mutations-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      // 2.判断oldProduct
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve("添加到购物车+1");
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve("添加到购物车");
      }
    });
  },
  // 货物增加
  increment(context,payload){
    context.commit(ADD_COUNTER,payload)
  },
  // 货物减少
  decrement(context,payload){
    context.commit(SUB_COUNTER,payload)
  }
}
