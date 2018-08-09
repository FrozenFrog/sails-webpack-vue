import Login from "./templates/User/Login.vue";
import Index from "./templates/index.vue";
import DisplayItems from "./templates/Items/DisplayItems.vue";
export const routes = [
  {
    path: "/login",
    component: Login,
    name: "login"
  },
  {
    path: "/items",
    component: DisplayItems,
    name: "displayitem",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    component: Index,
    name: "index",
    meta: {
      requiresAuth: true
    }
  },
  {
      /* Redirect to login page if cannot find valid URL
      I'm thinking that Login page will check if isLogin next to Index */
    path: "*", 
    redirect: 'login'
  }
];
