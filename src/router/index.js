import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/admin",
    name: "dashboard",
    component: DashboardView,
    children: [
      {
        path: "products",
        name: "products",
        component: () => import("../views/ProductsView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "order_list",
        name: "orderList",
        component: () => import("../views/OrderList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "coupon",
        name: "couponView",
        component: () => import("../views/CouponView.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/",
    component: DashboardView,
    children: [
      {
        path: "customer_order",
        name: "customerOrder",
        component: () => import("../views/CustomerOrder.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
