import {request} from './request';

// 获取分类左边导航栏
export function getCateLeft(){
    return request({
        url:'/category'
    })
}

// 获取对应分类列表数据
export function getCateListData(maitKey){
    return request({
        url:'/subcategory',
        params:{ 
            maitKey,
        }
    });
}
