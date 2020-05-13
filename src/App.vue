<template>
  <div>
    <div class="bg-white h-screen flex flex-col">
      <Nav></Nav>
      <div class="flex">
        <portal-target name="dropdown" slim />
        <div class="pl-6 bg-gray-200 w-48 max-h-full border-r-2 border-gray-400">
          <nav class="pt-4 my-4 h-screen">
            <div class="items-center p-1 p-2 w-full my-2">
              <MainMenu />
            </div>
          </nav>
        </div>
        <div class="bg-white w-full h-full">
          <router-view />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import Nav from "./components/Nav";
import MainMenu from "./components/MainMenu";
// import Dropdown from "@/Shared/Dropdown";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Nav,
    Footer,
    MainMenu
  },
  data() {
    return {
      form: {
        rol: "Todos"
      }
    };
  },
  computed: {
    ...mapGetters(["isLogged", "user"])
  }
};
</script>
