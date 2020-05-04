/* eslint-disable prettier/prettier */
<template>
  <div class="mb-2">
    <div class="w-full">
      <spinner v-if="loading"></spinner>
      <div v-else>
        <div v-if="departamentos.data.length === 0">
          <p>No se encuentran departamentos activos</p>
        </div>
        <div v-else>
          <div
            v-for="departamento in departamentos.data"
            :key="departamento.data.id"
          >
            <div
              class="flex items-baseline border-b border-gray-400 justify-between hover:bg-gray-200"
            >
              <router-link to="/login" class="flex items-center p-4">
                <p class="pl-4 font-bold uppercase">
                  {{ departamento.data.attributes.nombre_departamento }}
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Spinner from "../../components/Spinner";
import axios from "axios";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      title: "Departamentos",
      loading: true,
      departamentos: [],
    };
  },
  created() {
    axios
      .get("/departamentos")
      .then((res) => {
        this.departamentos = res.data;
        this.loading = false;
      })
      .catch((err) => console.log(err));
  },
};
</script>
