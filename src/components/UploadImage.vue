<template>
  <div>
    <img
      :src="imageObject.data.attributes.path"
      alt="profile photo"
      ref="userImage"
      class="w-12 h-12 object-cover rounded-full"
    />
  </div>
</template>
<script>
import Dropzone from "dropzone";
import { mapGetters } from "vuex";
export default {
  name: "UploadImage",
  data() {
    return {
      dropzone: null,
      token: null,
      uploadedImage: null
    };
  },
  props: ["imageLocation", "userImage"],
  mounted() {
    const userInfo = localStorage.getItem("user");
    const userData = JSON.parse(userInfo);
    this.token = userData.token;
    this.dropzone = new Dropzone(this.$refs.userImage, this.settings);
  },
  computed: {
    ...mapGetters(["isLogged", "user"]),
    settings() {
      return {
        paramName: "image",
        url: process.env.VUE_APP_API_SERVER + "/user-images",
        acceptedFiles: "image/*",
        params: {
          width: "222",
          height: "222",
          // location: this.$attrs.imageLocation
          location: this.imageLocation
        },
        headers: {
          Authorization: "Bearer " + this.token
        },
        success: (e, res) => {
          // alert("uploaded");
          this.uploadedImage = res;
          this.$store.dispatch("loadImageProfile", {
            image: this.uploadedImage || this.userImage
          });
        },
        error: (file, msg) => {
          alert(msg);
        }
      };
    },
    imageObject() {
      return this.uploadedImage || this.userImage;
    }
  }
};
</script>
