import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    // addCart(state,payload){
    //     /**
    //      * 1.判断cartList中是否存在已有商品，若含有则再将商品count数量加1
    //      * 2.若carList中没有添加的商品，则给payload对象创建一个count计数的键，
    //      * 将其赋值为1，并且把改商品对象添加到cartList中
    //      */
    //     // let oldProduct = null;
    //     // for(let item of state.cartList){
    //     //     if(item.iid === payload.iid){
    //     //         oldProduct = item
    //     //     }
    //     // }
    // }
    [ADD_COUNTER](state,payload){
        payload.count++;
    },
    [ADD_TO_CART](state,payload){
        state.cartList.push(payload);
    }
}