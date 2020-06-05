<template>
  <div class="w-full m-8">
    <div class="w-full">
      <h1 class="font-bold text-3xl">Perfil</h1>
    </div>
    <div class="w-full mb-8 flex">
      <div class="w-1/2 flex-col justify-between items-center">
        <p>Nombre: "Jach"</p>
        <p>Correo Electrónico: julian.abarca@gmail.com</p>
        <p>Puesto: "Subjefe de Informatica y Mejora de Procesos"</p>
        <p>Departamento: Sistemas</p>
      </div>
      <div class="w-1/2 flex justify-between items-center">
        <UploadImage image-location="profile" :user-image="imageProfile" />
      </div>
    </div>
  </div>
</template>
<script>
import UploadImage from "../../components/UploadImage";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  components: {
    UploadImage
  },
  computed: {
    ...mapGetters(["imageProfile"])
  }
};
</script>
