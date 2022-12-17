import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import labOne from "@/views/labOne.vue";
import labTwo from "@/views/labTwo.vue";
import labThree from "@/views/labThree.vue";
import labFour from "@/views/labFour.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/labOne",
    name: "labOne",
    component: labOne,
  },
  {
    path: "/labTwo",
    name: "labTwo",
    component: labTwo,
  },
  {
    path: "/labThree",
    name: "labThree",
    component: labThree,
  },
  {
    path: "/labFour",
    name: "labFour",
    component: labFour,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
