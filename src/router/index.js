import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Blogs from "../components/Blogs";
import BlogDetail from "../components/BlogDetail";
import BlogEdit from "../components/BlogEdit";


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: {name: "Blogs"}
    }, {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/blog/add',
      name: 'BlogEdit',
      component: BlogEdit
    }, {
      path: '/blog/:blogId',
      name: 'BlogDetail',
      component: BlogDetail
    }, {
      path: '/blog/:blogId/edit',
      name: 'BlogEdit',
      component: BlogEdit
    }
  ]
})
