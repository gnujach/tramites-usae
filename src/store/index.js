import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;

export default new Vuex.Store({
  state: {
    user: null,
    userImageProfile: null,
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
    loadImageProfile({ commit }, payload) {
      commit("setImageProfile", payload);
    },
  },
  mutations: {
    setImageProfile(state, data) {
      state.userImageProfile = data.image;
    },
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
    imageProfile: (state) =>
      state.userImageProfile || state.user.user.data.attributes.profile_image,
  },
  modules: {},
});
