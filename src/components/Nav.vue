/* eslint-disable prettier/prettier */
<template>
  <div
    class="bg-white h-12 p-2 flex items-center border-b border-gray-400 shadow-sm h-screen"
  >
    <div class="w-1/3 sm:w-full">
      <div class="flex">
        <router-link to="/">
          <img alt="Gto logo" src="../assets/escudo.jpg" class="w-10" />
        </router-link>
        <div class="ml-2 relative">
          <div class="absolute text-gray-700">
            <icon name="search" />
          </div>
          <input
            type="text"
            name="search"
            class="rounded-full w-48 bg-gray-200 h-8 focus:outline-none focus:shadow-outline text-sm pl-8 w-56"
            placeholder="Buscar"
          />
        </div>
      </div>
    </div>
    <div class="w-1/3 flex justify-center items-center h-12 sm:w-full">
      <router-link
        to="/about"
        class="px-6 border-b-2 border-blue-500 h-full flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-current w-5 h-5"
        >
          <path
            d="M22.6 11l-9.9-9c-.4-.4-1.1-.4-1.5 0l-9.9 9c-.3.3-.5.8-.3 1.2.2.5.6.8 1.1.8h1.6v9c0 .4.3.6.6.6h5.4c.4 0 .6-.3.6-.6v-5.5h3.2V22c0 .4.3.6.6.6h5.4c.4 0 .6-.3.6-.6v-9h1.6c.5 0 .9-.3 1.1-.7.3-.5.2-1-.2-1.3zm-2.5-8h-4.3l5 4.5V3.6c0-.3-.3-.6-.7-.6z"
          />
        </svg>
      </router-link>
      <router-link
        to="/login"
        v-if="isLogged"
        class="px-6 h-full flex items-center"
      >
        <ShowPictureProfile />
      </router-link>
    </div>
    <div class="w-1/3 flex justify-end sm:w-full">
      <dropdown class="mt-1" placement="bottom-end">
        <div class="flex items-center cursor-pointer select-none group">
          <div
            class="text-gray-700 group-hover:text-indigo-600 focus:text-indigo-600 mr-1 whitespace-no-wrap"
          >
            <icon
              name="config"
              class="w-4 h-4 mr-2 fill-gray-800 hover:fill-white"
            />
          </div>
        </div>
        <div
          slot="dropdown"
          class="mt-2 py-2 shadow-xl bg-white rounded text-sm"
        >
          <router-link
            class="block px-6 py-2 hover:bg-indigo-500 hover:text-white"
            to="/user/profile"
            >Mi Perfil</router-link
          >
          <router-link
            class="block px-6 py-2 hover:bg-indigo-500 hover:text-white"
            to="/user/profile"
          ></router-link>
          <button
            class="block px-6 py-2 hover:bg-indigo-500 hover:text-white"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Icon from "@/Shared/Icon";
import Dropdown from "@/Shared/Dropdown";
import ShowPictureProfile from "./ShowPictureProfile";

export default {
  name: "Nav",
  computed: {
    ...mapGetters(["isLogged", "user"]),
  },
  components: {
    Icon,
    Dropdown,
    ShowPictureProfile,
  },
  methods: {
    logout() {
      // console.log(this.user.data.user_id);
      this.$store.dispatch("logout", { id: this.user.data.user_id });
    },
  },
};
</script>
