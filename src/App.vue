<template>
  <div class="flex flex-col flex-1 h-screen">
    <Nav></Nav>
    <router-view />
  </div>
</template>
<script>
import Nav from "./components/Nav";
export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>
