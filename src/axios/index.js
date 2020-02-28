import axios from 'axios'
import router from '../router'
import store from '../store'
import {Toast} from 'vant'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({easing: 'ease', speed: 500});


// 请求的默认域名
/*axios.defaults.baseURL = 'https://coupon.talentyou.cn/api/v1'*/

//axios请求实例
let instance = axios.create({
  baseURL: 'https://coupon.talentyou.cn/api/v1',
  timeout: 1000 * 10
})

const toLogin = () => {
  localStorage.clear();
  router.replace({
    path: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  }).then()
}

const errorHandle = (status, message) => {
  switch (status) {
    case 401:
      toLogin();
      break;
    case 403:
      toLogin();
      break;
    case 404:
      Toast('404');
      break;
    default:
      Toast(message);
  }
};

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
      NProgress.start();

      //获取token
      const token = store.getters.getToken;
      //请求头中加入token信息
      token && (config.headers.Authorization = token);
      return config
    },
    error => Promise.error(error)
)


// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => {
      NProgress.done();
      if (res.status === 200) {
        if (res.headers.authorization) {
          store.commit('setToken', res.headers.authorization)
        }
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    },


    // 请求失败
    error => {
      NProgress.done();
      const {response} = error;
      if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response.status, response.data.message)
        return Promise.reject(response);
      } else {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        if (!window.navigator.onLine) {
          store.commit('changeNetwork', false)
        } else {
          return Promise.reject(error)
        }
      }
    });

export default instance

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//   router.replace({
//     path: '/login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   });
// }
