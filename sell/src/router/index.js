import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/index.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/',
        redirect: 'sales'
      },
      {
        path: '/sales',
        name: 'Sales',
        component: () => import('../views/salesManagement/sales.vue')
      },
      {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('../views/Statistics/statistics.vue')
      }
    ]
  },
  {
    // 添加销售记录
    path: '/addRecord',
    name: 'addRecord',
    component: () => import('@/views/salesManagement/addRecord.vue')
  },
  {
    // 销售记录明细
    path: '/saleDetail',
    name: 'saleDetail',
    component: () => import('@/views/salesManagement/saleDetail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
