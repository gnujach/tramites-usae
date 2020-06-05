<template>
  <div>
    <img
      :src="imageProfile.data.attributes.path"
      alt="profile photo"
      ref="userImage"
      class="w-8 h-8 object-cover rounded-full"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShowPictureProfile",
  data() {
    return {
      key: null
    };
  },
  computed: {
    ...mapGetters(["imageProfile"])
  }
};
</script>

<style lang="scss" scoped></style>
