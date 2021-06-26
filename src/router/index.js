import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Blogs from "../components/Blogs";
import BlogDetail from "../components/BlogDetail";
import BlogEdit from "../components/BlogEdit";
import Register from "../components/Register";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      username: 'Index',
      redirect: {name: "Blogs"}
    }, {
      path: '/blogs',
      username: 'Blogs',
      component: Blogs
    }, {
      path: '/login',
      username: 'Login',
      component: Login
    }, {
      path: '/blog/add',
      username: 'BlogEdit',
      component: BlogEdit,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/blog/:blogId',
      username: 'BlogDetail',
      component: BlogDetail
    }, {
      path: '/blog/:blogId/edit',
      username: 'BlogEdit',
      component: BlogEdit,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/register',
      username: 'Register',
      component: Register
    }
  ]
})
