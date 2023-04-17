import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home_Page.vue";
import FS from "../views/File_System.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/filesystem", name: "FS", component: FS },
  ],
});

export default router;
