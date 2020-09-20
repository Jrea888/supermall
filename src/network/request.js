import axios from 'axios'

export function request(config){ 
    // 1.创建对象
    const instance = axios.create({
        baseURL:'http://152.136.185.210:8000/api/z8',
        timeout:5000
    });

    // 2.axios 拦截器  拦截请求  
    instance.interceptors.request.use(config => { 
        // 1.config 里面的信息不符合服务器的要求

        // 2.发送网络请求时，希望界面显示一个图片

        // 3.网络请求 登录token必须携带一些特殊的信息
        return config;
    },error => {
        console.error(error,"请求错误信息！");
    });
    // 拦截响应
    instance.interceptors.response.use(res => {
        console.log(res,"拦截响应结果");
        return res.data
    },error => {
        console.error(error,"请求错误信息！");
    });

    // 3.发送真正的网络请求 返回 Axiospromise
    return instance(config);
}

// export function request(config){
//     return new Promise((resolve,reject) => {
//         // 1.创建对象
//         const instance = axios.create({
//             baseURL:'http://123.207.32.32:8000',
//             timeout:5000
//         });
//         // 发送真正的网络请求
//         instance(config)
//         .then(res => {
//             resolve(res);
//         }).catch(error => {
//             reject(error);
//         });
//     });
// }

// export function request(config){
//     // 1.创建对象
//     const instance = axios.create({
//         baseURL:'http://123.207.32.32:8000',
//         timeout:5000
//     });
//     // 发送真正的网络请求
//     instance(config.baseConfig)
//     .then(res => {
//         config.success(res);
//     }).catch(error => {
//         config.failure(error);
//     });
// }



/* 
export function request(config,success,failure){
    // 1.创建对象
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    });
    // 发送真正的网络请求
    instance(config).then(res => {
        success(res);
    }).catch(error => {
        failure(error);
    });
} */