import {request} from './request'

export function getHomeBannerInfo() {
    return request({
        url:'/home/multidata'
    });
}

export function getHomeListData(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    });
}