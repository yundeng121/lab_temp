import Vue from 'vue'
import VueRouter from 'vue-router'
import Tabbar from "../components/tabbar/Tabbar";
import User from "../views/user";
import home from "../views/home";
import goods_detail from "../views/goods_detail";
import search from "../views/search";
import order_list from "../views/order_lists";
import login from "../views/login"
import WechatLogin from "../components/user/WechatLogin";
import WechatConfirm from "../views/wechat_confirm";
import bill from "../views/bill_lists" 
import store from '@/store'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: home,
        tabbar: Tabbar
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        default: User,
        tabbar: Tabbar
      },
      meta: {
        keepAlive: true,
        requireLogin:true,
      }
    },
    {
      path: '/goods/:platform/:id',
      name: 'goods_detail',
      component: goods_detail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: order_list,
      meta: {
        requireLogin:true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/wechat_login',
      name: 'wechat_login',
      component: WechatLogin
    },
    {
      path: '/wechat_confirm',
      name: 'wechat_confirm',
      component: WechatConfirm
    },
    {
      path: '/bill',
      name: 'bill',
      component: bill
    }]
});

router.beforeEach((to, from, next) => {
  let ua = navigator.userAgent.toLowerCase();
  if (to.meta.requireLogin && !store.getters.getToken) {
    if (ua.match(/MicroMessenger/i)) {
      next({
        path:'/wechat_confirm'
      })
    } else {
      next(/*{
        path:'/login'}*/
        location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4b847b5fbbaaeda6&redirect_uri=https%3A%2F%2Fcoupon.talentyou.cn%2Fapi%2Fv1%2Fwechat_login&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
      )
    }
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

// eslint-disable-next-line no-unused-vars
router.afterEach(transition => {
});

export default router
