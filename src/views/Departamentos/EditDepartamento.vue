<template>
  <div>
    <div class="w-full flex flex-1">
      <h1 class="m-8 font-bold text-3xl">Editar Departamento</h1>
    </div>
    <spinner v-if="loading"></spinner>
    <form @submit.prevent="submitForm" class="flex flex-wrap -mb-4" v-else>
      <div class="flex w-full ml-8 mt-2">
        <div class="w-1/2 mx-2">
          <t-input-group label="Nombre" feedback="Solo letras">
            <t-input
              v-model="form.nombre_departamento"
              type="text"
              autofocus
              maxlength="32"
              required
              placeholder="Consulta gral"
              v-bind:class="{ 'border-red-300': errors.nombre_departamento }"
            />
          </t-input-group>
          <div class="invalid-feedback" v-if="errors.nombre_departamento">
            <p class="italic font-bold">{{ errors.nombre_departamento[0] }}</p>
          </div>
          <div class="w-1/6 h-12 text-center mt-6">
            <input
              type="submit"
              v-bind:disabled="loading"
              class="py-2 px-4 text-green-700 border text-lg mr-5 hover:border-green-700 rounded"
              value="Guardar"
            />
          </div>
        </div>
      </div>
      <div class="w-full flex flex-1" v-if="saved">
        <h1 class="m-8 font-bold text-3xl">Cambios Realizados</h1>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../components/Spinner";

export default {
  name: "EditDepartamento",
  data() {
    return {
      saved: false,
      errors: [],
      loading: true,
      departamento: {},
      data: [],
      form: {
        nombre_departamento: "",
        activo: false
      }
    };
  },
  components: {
    Spinner
  },
  methods: {
    submitForm() {
      let _this = this;
      axios
        .put("/departamentos/" + _this.$route.params.id, _this.form)
        .then(res => {
          _this.departamento - res.data;
          _this.saved = true;
          _this.loading = false;
        })
        .catch(err => {
          _this.errors = err.response.data.errors;
          _this.loading = false;
        });
    },
    getDepartamento() {
      let _this = this;
      axios
        .get("/departamentos/" + _this.$route.params.id + "/edit")
        .then(res => {
          _this.loading = false;
          _this.data = res.data.data;
          _this.form.nombre_departamento =
            _this.data.attributes.nombre_departamento;
          _this.form.activo = _this.data.attributes.activo;
        })
        .catch(() => {
          _this.loading = false;
        });
    }
  },
  created() {
    this.getDepartamento();
  }
};
</script>

<style lang="scss" scoped></style>
