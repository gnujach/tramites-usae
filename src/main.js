import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./assets/tailwind.css";
import PortalVue from "portal-vue";
import VueTailwind from "vue-tailwind";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;
Vue.use(VueTailwind);
Vue.use(PortalVue);
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  VueTailwind,
  created() {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      this.$store.commit("setUserData", userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  render: (h) => h(App),
}).$mount("#app");
