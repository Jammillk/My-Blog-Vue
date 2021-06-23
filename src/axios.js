import axios from "axios";
import ElementUI from 'element-ui';
import store from './store'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';


// 以后访问会自动加上这个前缀
axios.defaults.baseURL = "http://localhost:9999"

// 前置拦截
axios.interceptors.request.use(config => {
  return config
})


// 后置拦截
axios.interceptors.response.use(response => {
    let res = response.data;
    console.log("=================")
    console.log(res)
    console.log("=================")

    if (res.code === 200) {
      // 正确，继续往下走
      return response
    } else {
      ElementUI.Message.error('错了哦，快点检查一下用户名或密码吧', {duration: 3 * 1000});
      // 拒绝访问
      return Promise.reject(response.data.message)
    }
  },
  error => {
    console.log(error)
    if (error.response.data){
      error.message = error.response.data.message
      console.log(error.message)
    }

    // 认证不了
    if (error.response.status === 401){
      // 再清空全局参数
      store.commit("REMOVE_INFO")
      // 跳转到登录页
      router.push("/login")
    }
    ElementUI.Message.error(error.message, {duration: 3 * 1000});
    return Promise.reject(error)

  })
