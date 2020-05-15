<template>
  <div>
    <form @submit.prevent="submitForm" class="flex flex-wrap -mb-4" v-if="!saved">
      <div class="flex w-full">
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
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddDepartamento",
  data() {
    return {
      saved: false,
      errors: [],
      loading: false,
      departamento: {},
      form: {
        nombre_departamento: "",
        activo: true
      }
    };
  },
  methods: {
    submitForm() {
      let _this = this;
      axios
        .post("/departamentos/", _this.form)
        .then(res => {
          _this.departamento - res.data;
          _this.saved = true;
          _this.loading = false;
        })
        .catch(err => {
          _this.errors = err.response.data.errors;
          _this.loading = false;
        });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped></style>
