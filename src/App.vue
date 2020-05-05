<template>
  <div>
    <div class="flex flex-col flex-1 h-screen">
      <Nav></Nav>
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import Nav from "./components/Nav";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    Nav,
    Footer
  }
};
</script>
