import {request} from './request'

export function getHomeBannerInfo() {
    return request({
        url:'/home/multidata'
    });
}