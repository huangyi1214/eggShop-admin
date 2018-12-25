import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/socket', component: () => import('@/views/socket/socket'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  base:'admin',
  routes: constantRouterMap
})
export const asyncRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: { title: '会员中心', icon: 'form' },//,roles:['']
    children: [
      {
        path: 'index',
        name: '客户端',
        component: () => import('@/views/customer/index'),
        meta: { title: '客户端', icon: 'form' ,roles:['user_customer']}
      },
      {
        path: 'index1',
        name: 'Form1',
        component: () => import('@/views/manager/manager'),
        meta: { title: '经理端', icon: 'form' ,roles:['user_manager']}
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    name: 'product',
    meta: { title: '产品中心', icon: 'form' },//,roles:['product_internal','product_proxy'] 
    children: [
      {
        path: 'immediate',
        name: '即时抢单产品',
        component: () => import('@/views/product/immediate'),
        meta: { title: '内部产品', icon: 'form' ,roles:['product_internal']}//,roles:['product_internal']
      },      {
        path: 'internal',
        name: '内部产品',
        component: () => import('@/views/product/internal'),
        meta: { title: '内部产品', icon: 'form' ,roles:['product_internal']}//,roles:['product_internal']
      },
      {
        path: 'proxy',
        name: '代理产品',
        component: () => import('@/views/product/proxy'),
        meta: { title: '代理产品', icon: 'form' ,roles:['product_proxy']}//,roles:['product_proxy']
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'order',
    meta: { title: '订单管理', icon: 'form' },
    children: [
      {
        path: 'immediate',
        name: '即时订单',
        component: () => import('@/views/order/immediate'),
        meta: { title: '即时订单', icon: 'form',roles:['order_immediate'] }
      },
      {
        path: 'internal',
        name: '内部订单',
        component: () => import('@/views/order/internal'),
        meta: { title: '内部订单', icon: 'form' ,roles:['order_internal']}
      },
      {
        path: 'proxy',
        name: '代理订单',
        component: () => import('@/views/order/proxy'),
        meta: { title: '代理订单', icon: 'form' ,roles:['order_proxy']}
      }
    ]
  },
  {
    path: '/control',
    component: Layout,
    name: 'control',
    meta: { title: '系统管理', icon: 'form' ,roles:['Permission_menu']},
    children: [
      {
        path: 'menu',
        name: '菜单管理',
        component: () => import('@/views/Permission/menu'),
        meta: { title: '菜单管理', icon: 'form' ,roles:['Permission_menu']}
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/Permission/role'),
        meta: { title: '角色管理', icon: 'form',roles:['Permission_role'] }//
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }]
