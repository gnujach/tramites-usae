<template>
  <div class="pt-8">
    <h1>Ok, This is an about page</h1>
    <button
      v-if="isLogged"
      type="button"
      @click="logout()"
      class="rounded py-2 px-3 text-blue-800 text-left bg-gray-300 uppercase font-bold"
    >Logout</button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "About",
  methods: {
    logout() {
      this.$store.dispatch("logout", { id: this.user.id });
    }
  },
  computed: {
    ...mapGetters(["isLogged", "user"])
  }
};
</script>
