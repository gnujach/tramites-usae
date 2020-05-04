import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;

export default new Vuex.Store({
  state: {
    user: null,
  },
  actions: {
    login({ commit }, credentials) {
      return axios.post("/login", credentials).then(({ data }) => {
        commit("setUserData", data);
      });
    },

    logout({ commit }, credentials) {
      return axios.post("/logout", credentials).then(() => {
        commit("clearUserData");
      });
    },
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    },
    clearUserData() {
      localStorage.removeItem("user");
      location.reload();
    },
  },

  getters: {
    isLogged: (state) => !!state.user,
    user: (state) => state.user.user,
  },
  modules: {},
});
