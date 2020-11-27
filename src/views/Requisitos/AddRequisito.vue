<template>
  <div class="bg-gray-100 m-4 border rounded">
    <div class="w-full flex flex-1">
      <h1 class="m-8 font-bold text-3xl">Nuevo Requsito</h1>
      <hr />
    </div>
    <div>
      <form
        @submit.prevent="submitForm"
        class="flex flex-wrap mb-4 "
        v-if="!saved"
      >
        <div class="flex w-full">
          <div class="flex-row w-1/2 ml-8 mt-2">
            <div class="flex mt-2">
              <div class="w-1/6 mx-2">
                <label
                  class="block text-gray-700 text-lg font-bold mb-2 mr-2 mt-2"
                  for="nombre"
                >
                  Nombre Requisito
                </label>
              </div>
              <div class="w-4/6 mx-2">
                <input
                  class="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  type="text"
                  placeholder="Nombre de trámite"
                  length="32"
                  v-model="form.nombre"
                />
              </div>
            </div>
            <div class="flex mt-2">
              <div class="w-1/6 mx-2">
                <label
                  class="block text-gray-700 text-lg font-bold mb-2 mr-2 mt-2"
                  for="tipo"
                >
                  Tipo
                </label>
              </div>
              <div class="w-4/6 mx-2">
                <input
                  class="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  list="tipo-requisito"
                  id="tipo"
                  length="32"
                  v-model="form.tipo"
                />
                <datalist id="tipo-requisito">
                  <option value="Original"> </option>
                  <option value="Digital"> </option>
                  <option value="Pre-requisito"> </option>
                </datalist>
              </div>
            </div>
          </div>
          <div class="flex-row w-1/2 ml-8 mt-2">
            <div class="flex mt-2">
              <div class="w-1/6 mx-4">
                <label
                  class="block text-gray-700 text-lg font-bold mb-2 mr-2 mt-2"
                  for="observaciones"
                >
                  Observaciones
                </label>
              </div>
              <div class="w-4/6 mx-4">
                <textarea
                  class="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="observaciones"
                  type="text"
                  placeholder="Observaciones"
                  length="32"
                  v-model="form.observaciones"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row w-full h-12 text-center mt-6 justify-center">
          <input
            type="reset"
            v-bind:disabled="loading"
            class="py-2 px-4 text-red-700 border text-lg mr-5 hover:border-red-700 rounded"
            value="Limpiar"
            @click="resetForm"
          />
          <input
            type="submit"
            v-bind:disabled="loading"
            class="py-2 px-4 text-green-700 border text-lg mr-5 hover:border-green-700 rounded"
            value="Guardar"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddRequisto",
  data() {
    return {
      requisito: [],
      form: {
        nombre: "",
        tipo: "",
        observaciones: "",
        activo: true
      },
      errors: {},
      loading: false,
      saved: false
    };
  },
  methods: {
    submitForm() {
      let _this = this;
      console.log(_this.form);
      axios
        .post("/requisitos", _this.form)
        .then(res => {
          _this.requisito = res.data;
        })
        .catch(err => console.log(err));
    },
    resetForm() {
      console.log("Limpiar");
      console.log("Limpiar");
    }
  }
};
</script>
