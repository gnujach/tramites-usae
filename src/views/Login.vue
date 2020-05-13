<template>
  <div class="mx-auto h-full flex flex-1 justify-center items-center align-middle">
    <div class="w-96 bg-white rounded-lg overflow-hidden shadow-xl p-4">
      <logo class="block mx-auto w-full max-w-xs fill-white" height="50" />
      <h2 class="text-white text-3xl pt-8">Bienvenido</h2>
      <h2 class="text-blue-300">Ingresa sus credenciales</h2>
      <form @submit.prevent="login">
        <label
          for="email"
          class="uppercase text-blue-500 text-xs font-bold absolute pl-3 pt-2"
        >E-mail</label>
        <div class>
          <input
            type="email"
            name="email"
            v-model="email"
            class="pt-8 w-full rounded p-3 bg-blue-800 text-gray-300 outline-none focus:bg-blue-700"
            placeholder="you@email.com"
            autofocus
          />
        </div>
        <div class="relative pt-3">
          <label
            for="password"
            class="uppercase text-blue-500 text-xs font-bold absolute pl-3 pt-2"
          >Password</label>
          <div class>
            <input
              type="password"
              name="password"
              v-model="password"
              class="pt-8 w-full rounded p-3 bg-blue-800 text-gray-100 outline-none focus:bg-blue-700"
            />
          </div>
          <div class="pt-8">
            <button
              type="submit"
              class="rounded w-full py-2 px-3 text-blue-800 text-left bg-gray-300 uppercase font-bold"
            >Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from "@/Shared/Logo";
export default {
  data() {
    return {
      email: "admin@example.com",
      password: "1234"
    };
  },
  components: {
    Logo
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "About" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    const userInfo = localStorage.getItem("user");
    console.log(userInfo);
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      this.$store.commit("setUserData", userData);
      this.$router.push({ name: "About" });
    }
  }
};
</script>

<style></style>
