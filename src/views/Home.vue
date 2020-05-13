<template>
  <div class="m-2">
    <h1 class="mb-8 font-bold text-3xl">Dashboard</h1>
    <p class="mb-12 leading-normal">
      Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how
      works.
    </p>
    <div>
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
