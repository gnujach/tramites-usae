<template>
  <div>
    Bienvenido
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";

axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;
export default {
  data() {
    return {
      userms: null
    };
  },
  created() {
    let tokenuser = this.$route.query.usertoken;
    var userms = null;
    var token = null;
    // console.log(tokenuser);
    axios.defaults.headers.common.Authorization = `Bearer ${tokenuser}`;
    axios
      .post("/auth/loginwithms", tokenuser)
      .then(res => {
        token = res.data.token;
        userms = res.data.user;
        console.log("Data de server userms: ", userms);
        this.$store
          .dispatch("loginwithms", { user: userms, token: token })
          .then(() => {
            console.log("Go!!");
            //     this.$router.push({ name: "Me" });
          })
          .catch(err => {
            console.log(err);
          });
        // localStorage.setItem("user", JSON.stringify(res.data));
        // this.$router.push({ name: "Me" });
      })
      .catch(err => {
        console.log(err);
      });
    // this.$store
    //   .dispatch("loginwithms", userms)
    //   .then(() => {
    //     console.log("Go!!");
    //     //     this.$router.push({ name: "Me" });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  computed: {
    ...mapGetters(["isLogged", "user"])
  }
};
</script>
