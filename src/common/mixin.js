import BackTop from 'components/content/backTop/BackTop';
import {BACKTOP_DISTANCE} from "common/const";

export const backTopMinix = {
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop:false
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0, 0, 300);
        },
        listenShowTop(position){
            // 1.判断backTop是否显示
            this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE;
        }
    }
}