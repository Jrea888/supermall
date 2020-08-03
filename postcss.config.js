module.exports = {
    plugins:{
        autoprefixer:{},
        "postcss-px-to-viewport":{
            viewportWidth:357,// 视窗的宽度，对应是我们设计稿的宽度
            viewportHeight:667,// 视窗的高度
            unitPrecision:5,// 指定使用px转换为视窗单位的小数位数
            viewportUnit:'vw',// 指定需要转换的视窗单位 建议使用 vw
            selectorBlackList:['ignore','tab-bar','tar-bar-item'],//指定不需要转换的类型
            minPixeValue:1,// 小于或等于1px不转换为视窗单位
            mediaQuery:false, //允许在媒体查询中转换‘px’
            exclude:[/TabBar.vue$/], // 必须是正则，比配的是文件
        },
    }
}