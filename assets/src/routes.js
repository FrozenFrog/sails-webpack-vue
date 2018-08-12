import Login from "./templates/User/Login.vue";
import Index from "./templates/index.vue";
import DisplayItems from "./templates/Items/DisplayItems.vue";
import Checkout from "./templates/Checkout/index.vue"
export const routes = [
  {
    path: "/login",
    component: Login,
    name: "login"
  },
  {
    path: "/checkout",
    component: Checkout,
    name: 'checkout',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/items",
    component: DisplayItems,
    name: "displayitem",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: "edit",
        path: 'edit/:id',
        meta: {
          requiresAdmin: true
        }
      },
      {
        name: "add",
        path: "add",
        meta: {
          requiresAdmin: true
        }
      },
      {
        name: "delete",
        path: "delete/:id",
        meta: {
          requiresAdmin: true
        }
      }
    ]
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
      Never redirect to index component, login component will check if localStorage has user object */
    path: "*", 
    redirect: 'index'
  }
];
