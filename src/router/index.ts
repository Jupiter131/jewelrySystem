import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/cart.vue')
  },
  {
    path: '/wish_list',
    name: 'wish_list',
    component: () => import('@/views/wish_list/wish_list.vue')
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/accountSetting',
    component: () => import('@/views/user/user.vue'),
    children: [
      {
        path: 'accountSetting',
        name: 'accountSetting',
        component: () =>
          import('@/views/user/primary/account-setting/account-setting.vue')
      },
      {
        path: 'privacySetting',
        name: 'privacySetting',
        component: () =>
          import('@/views/user/primary/privacy-setting/privacy-setting.vue')
      },
      {
        path: 'addressManagement',
        name: 'addressManagement',
        component: () =>
          import('@/views/user/primary/address-management/address-management.vue')
      },
      {
        path: 'passwordModification',
        name: 'passwordModification',
        component: () =>
          import('@/views/user/primary/password-modification/password-modification.vue')
      },
      {
        path: 'orderMessage',
        name: 'orderMessage',
        redirect: '/user/orderMessage/wholeOrder',
        component: () =>
          import('@/views/user/primary/order-message/order-message.vue'),
        children:[
          {
            path:'wholeOrder',
            name:'wholeOrder',
            component: () =>
              import('@/views/user/primary/order-message/order-state/whole_order.vue')
          },
          {
            path:'unpaid',
            name:'unpaid',
            component: () =>
              import('@/views/user/primary/order-message/order-state/unpaid.vue')
          },
          {
            path:'unapproved',
            name:'unapproved',
            component: () =>
              import('@/views/user/primary/order-message/order-state/unapproved.vue')
          },
          {
            path:'approved',
            name:'approved',
            component: () =>
              import('@/views/user/primary/order-message/order-state/approved.vue')
          },
          {
            path:'paid',
            name:'paid',
            component: () =>
              import('@/views/user/primary/order-message/order-state/paid.vue')
          }
        ]
      },
      {
        path: 'trueLoveJourney',
        name: 'trueLoveJourney',
        component: () =>
          import('@/views/user/primary/true-love-journey/true-love-journey.vue')
      },
      {
        path: 'myAnniversary',
        name: 'myAnniversary',
        component: () =>
          import('@/views/user/primary/my-anniversary/my-anniversary.vue')
      },
      {
        path: 'customerService',
        name: 'customerService',
        component: () =>
          import('@/views/user/primary/customer-service/customer-service.vue')
      },
    ]
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/maincontent',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: 'brandstory',
        name: 'brandstory',
        component: () =>
          import('@/views/main/primary/brandstory/brandstory.vue'),
        children: []
      },
      {
        path: 'maincontent',
        name: 'maincontent',
        component: () =>
          import('@/views/main/primary/maincontent/maincontent.vue'),
        children: []
      },
      {
        path: 'goods/1',
        name: 'goods1',
        component: () => import('@/views/main/primary/goods1/goods1.vue'),
        children: []
      },
      {
        path: 'goods/2',
        name: 'goods2',
        component: () => import('@/views/main/primary/goods2/goods2.vue'),
        children: []
      },
      {
        path: 'goods/3',
        name: 'goods3',
        component: () => import('@/views/main/primary/goods3/goods3.vue'),
        children: []
      },
      {
        path: 'goods/detail/:id',
        name: 'goods_detail',
        component: () => import('@/views/goods-details/goods-details.vue'),
        children: []
      },
      {
        path: 'wedding',
        name: 'wedding',
        component: () => import('@/views/main/primary/wedding/wedding.vue'),
        children: []
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

//导航守卫
// router.beforeEach((to) => {
//   if (to.path !== '/login') {
//     const token = localCache.getCache('token')
//     if (!token) {
//       return '/login'
//     }
//   }
// })

export default router
