import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import StarshipPage from "../views/StarshipPage.vue";

const routes = [
  {
    path: "/starship/:id",
    name: "Starship",
    component: StarshipPage,
    props: true,
    meta: { transition: "slide-away" },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { transition: "slide-in" },
  },
  { path: "/:pathMatch(.*)*", redirect: { name: "Home" } },
];

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? `/${process.env.VUE_APP_REP_NAME}` : null),
  routes,
});

//redirect handler for GitHub pages
router.beforeEach((to) => {
  if (to.fullPath.startsWith('/#/')) {
    return to.fullPath.slice(2);
  }
});

export default router;
