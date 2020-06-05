<template>
  <div>
    <h1>Hello</h1>
    {{ me }}
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;

export default {
  name: "Me",
  data() {
    return {
      me: null
    };
  },
  created() {
    axios.get("/user").then(res => {
      this.me = res.data;
    });
  }
};
</script>

<style lang="scss" scoped></style>
