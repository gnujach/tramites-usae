import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    meta: {
      auth: true,
    },
    component: () =>
      // @ts-ignore
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/departamentos",
    name: "Departamentos",
    meta: {
      auth: true,
    },
    component: () =>
      // @ts-ignore
      import(
        /* webpackChunkName: "about" */ "../views/Departamentos/Departamentos.vue"
      ),
  },
  {
    path: "/departamentos/add",
    name: "AddDepartamento",
    meta: {
      auth: true,
    },
    component: () =>
      // @ts-ignore
      import(
        /* webpackChunkName: "about" */ "../views/Departamentos/AddDepartamento"
      ),
  },
  {
    path: "/departamentos/:id/edit",
    name: "EditDepartamento",
    props: true,
    meta: {
      auth: true,
    },
    component: () =>
      // @ts-ignore
      import(
        /* webpackChunkName: "about" */ "../views/Departamentos/EditDepartamento"
      ),
  },
  {
    path: "/me",
    name: "Me",
    meta: {
      auth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Me.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/solicitudes/add",
    name: "SolicitudFeedback",
    meta: {
      auth: true,
    },
    component: () =>
      // @ts-ignore
      import(
        /* webpackChunkName: "about" */ "../views/Solicitudes/SolicitudFeedback"
      ),
  },
  {
    path: "/uploadimage",
    name: "uploadimage",
    meta: {
      auth: true,
    },
    component: () =>
      // @ts-ignore
      import(/* webpackChunkName: "about" */ "../components/UploadImage"),
  },
  {
    path: "/user/profile",
    name: "profile",
    meta: {
      auth: true,
    },
    component: () =>
      // @ts-ignorP
      import(/* webpackChunkName: "about" */ "../views/user/Profile"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  // si buscas el meta auth y no se encuentra
  if (to.matched.some((record) => record.meta.auth) && !loggedIn) {
    next("/login");
    return;
  }
  next();
});

export default router;
