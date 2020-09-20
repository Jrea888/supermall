<template> 
    <div> 
      <nav-tab class="home_nav"><div slot="center">个人商城</div></nav-tab>

      <div class="proTop"> 
        <div class="one">
            <img src="../../assets/image/profile/me.jpg" alt="">
        </div>
        <div class="two">
          <p class="login">
            <a href="#">登录/注册</a>
          </p>
          <div class="phone"> 
            <span>暂无绑定手机号</span>
          </div>
        </div>
        <div class="three mui-navigate-right"> </div>
      </div>

      <div class="typeNum clear-fix">
        <div class="flexCenter">
            <span>0.00</span>元
            <div>我的余额</div>
        </div>
        <div class="flexCenter">
            <span>0</span>个
            <div>我的优惠</div>
        </div>
        <div class="flexCenter">
            <span>2020</span>分
            <div>我的积分</div>
        </div>
      </div> 

      <div class="mui-card">
				<ul class="mui-table-view smallImg">
					<li class="mui-table-view-cell"> 
            <span class="mui-icon icon-wodexiaoxi"></span>
						<a class="mui-navigate-right">我的消息</a>
					</li>
					<li class="mui-table-view-cell">
            <span class="mui-icon icon-jifenshangcheng"></span>
						<a class="mui-navigate-right">积分商城</a>
					</li>
					<li class="mui-table-view-cell">
            <span class="mui-icon icon-membership-card_icon"></span>
						<a class="mui-navigate-right">会员卡</a>
					</li>
          <li class="mui-table-view-cell">
            <span class="mui-icon icon-gouwuche"></span>
						<a class="mui-navigate-right">我的购物车</a>
					</li>
					<li class="mui-table-view-cell">
            <span class="mui-icon icon-download"></span>
						<a class="mui-navigate-right">下载购物APP</a>
					</li> 
				</ul>
			</div>

    </div>
</template>

<script>
import NavTab from '../../components/common/navbar/NavTab'
  export default {
    name: 'Profile',
    components:{
      NavTab
    }
  }
</script>

<style scoped> 
@import '../../assets/vendor/mui/dist/css/mui.css'; 
.smallImg li span { 
  width: 30px; 
  vertical-align: middle;
  margin-right: 10px;
}
.mui-table-view-cell>a:not(.mui-btn) {
  display: inline;
}

.home_nav {
  background-color: var(--color-tint);
  color: #fff;
}
.proTop{ 
  display: flex;
  background-color: #ff8ea3;
  height: 80px; 
}
.one{
  flex: 1;    
  padding: 8px 0 0 10px;
}
.one img{ 
  width: 100%;
  height: 65px;
  border-radius: 50%;
}
.two{
  flex: 3;
  padding: 28px 0 0 10px;
}
.three{
  flex: 1;
  text-align: right;
  position: relative;
}
.mui-navigate-right:after, .mui-push-right:after { 
  color: white;
}
.login {
  margin-bottom: 2px;
}
.login a{
  color: white;
}
.phone span{
  font-size: 12px;
}

.typeNum {
  height: 80px; 
}
.typeNum div:nth-child(2){
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.flexCenter {
  float: left;
  height: 100%;
  width: 33.33333%; 
  text-align: center; 
  padding-top: 20px;
}
.flexCenter span{ 
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
} 

</style>
