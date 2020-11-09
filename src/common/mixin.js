import BackTop from 'components/content/backTop/BackTop';
import {
  BACKTOP_DISTANCE
} from "common/const";
import {
  debounce
} from 'common/utils'

import {
  NEW,
  POP,
  SELL
} from "common/const";
/**
 * 返回顶部 
 */
export const backTopMinix = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    // 返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    // 监听 是否显示
    listenShowTop(position) {
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE;
    }
  }
}
/**
 * 图片监听
 */
export const itemListenerMixin = {
  components: {

  },
  data() {
    return {
      itemImageListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 防抖处理
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImageListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
  methods: {

  }
}

// Tab导航吸顶
export const TabCeiling = {
  data() {
    return {
      // 定义数据存储格式 
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      indexCurrent: POP,
      tabOffsetTop: 0,
      isTabFixed: false,
    }
  },
  methods: {
    // 自定义事件 Tab数据切换
    tabNavControl(index) {
      switch (index) {
        case 0:
          this.indexCurrent = POP;
          break;
        case 1:
          this.indexCurrent = NEW;
          break;
        case 2:
          this.indexCurrent = SELL;
          break;
      }
      // 当前tab切换实现同步
      this.$refs.tabControl1.tabControlIndex = index;
      this.$refs.tabControl2.tabControlIndex = index;
    },
    // 返回距离图表 是否 显示
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.listenShowTop(position);
      // 2.决定tabControl是否吸顶
      this.isTabFixed = (-position.y) >= this.tabOffsetTop;
    },
    // 获取轮播图第一个图片的高度
    swiperImageLoad() {
      // 获取 tabControl 的 offsetTop(向上滚动隐藏的距离)，所有的组件都有一个属性 $el:用于获取组件的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop - 50;
    },
  }
}
