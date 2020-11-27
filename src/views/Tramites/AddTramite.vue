<template>
  <div class="bg-gray-100 m-4 border rounded">
    <div class="w-full flex flex-1">
      <h1 class="m-8 font-bold text-3xl">Nuevo Trámite</h1>
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
            <div class="flex mt-2 justify-start">
              <div class="w-1/5 ">
                <label class="block text-gray-700 text-lg font-bold m-2">
                  Trámite para
                </label>
              </div>
              <div class="w-3/5 ml-6">
                <multiselect
                  v-model="form.set_tipousuario"
                  :options="usuarios"
                  placeholder="Selecciona Usuario"
                  selectLabel="Clic para seleccionar"
                  deselectLabel="Se require usuario"
                  selectedLabel="Seleccionado"
                  track-by="id"
                  :multiple="false"
                  :close-on-select="true"
                  :preserve-search="false"
                  :showLabels="true"
                  :allow-empty="false"
                  :custom-label="customLabelusuarios"
                  openDirection="bottom"
                ></multiselect>
              </div>
            </div>
            <div class="flex mt-2 justify-start">
              <div class="w-1/5 ">
                <label class="block text-gray-700 text-lg font-bold m-2">
                  Selecciona Departamento
                </label>
              </div>
              <div class="w-3/5 ml-6">
                <multiselect
                  v-model="form.set_departamento"
                  :options="departamentos"
                  placeholder="Selecciona Departamento"
                  selectLabel="Clic para seleccionar"
                  deselectLabel="Se require departamento"
                  selectedLabel="Seleccionado"
                  track-by="id"
                  :multiple="false"
                  :close-on-select="true"
                  :preserve-search="false"
                  :showLabels="true"
                  :allow-empty="false"
                  :custom-label="customLabel"
                  openDirection="bottom"
                ></multiselect>
              </div>
            </div>
            <div class="flex mt-2">
              <div class="w-1/6 mx-2">
                <label
                  class="block text-gray-700 text-lg font-bold mb-2 mr-2 mt-2"
                  for="nombre"
                >
                  Nombre
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
                  for="objetivo"
                >
                  Objetivo
                </label>
              </div>
              <div class="w-4/6 mx-2">
                <input
                  class="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="objetivo"
                  type="text"
                  placeholder="Objetivo del trámite"
                  length="32"
                  v-model="form.objetivo"
                />
              </div>
            </div>
            <div class="flex mt-2">
              <div class="w-1/6 mx-2">
                <label
                  class="block text-gray-700 text-lg font-bold mb-2 mr-2 mt-2"
                  for="dobtenido"
                >
                  Documento Obtenido
                </label>
              </div>
              <div class="w-4/6 mx-2 mt-3">
                <input
                  class="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dobtenido"
                  type="text"
                  placeholder="Documento obtenido con el trámite"
                  length="32"
                  v-model="form.documento_obtenido"
                />
              </div>
            </div>
          </div>
          <div class="flex-row w-1/2 ml-8 mt-2">
            <div class="flex mt-2">
              <div class="w-1/6 mx-2">
                <label
                  class="block text-gray-700 text-lg font-bold mb-2 mr-2 mt-2"
                  for="d_inst"
                >
                  Datos Institucionales
                </label>
              </div>
              <div class="w-3/6 mx-4 mt-3">
                <input
                  class="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="d_inst"
                  type="text"
                  placeholder="Datos institucionales del trámite"
                  length="32"
                  v-model="form.datos_inst"
                />
              </div>
            </div>
            <div class="flex mt-2">
              <div class="w-1/6 mx-2">
                <label
                  class="block text-gray-700 text-lg font-bold mb-2 mr-2 mt-2"
                  for="plazo"
                >
                  Plazo de Respuesta
                </label>
              </div>
              <div class="w-2/6 ml-4 mx-2 mt-3">
                <input
                  class="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="plazo"
                  type="numeric"
                  placeholder="número de días para respuesta"
                  v-model="form.plazo"
                />
              </div>
              <div class="w-4/6 mx-2">
                <p class="m-4 appearance-none  text-gray-700 text-lg font-bold">
                  día
                </p>
              </div>
            </div>
            <div class="flex mt-2">
              <div class="w-1/6 mx-2">
                <label
                  class="block text-gray-700 text-lg font-bold mb-2 mr-2 mt-2"
                  for="url"
                >
                  URL del Proceso
                </label>
              </div>
              <div class="w-4/6 mx-2 mt-3">
                <input
                  class="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="url"
                  type="text"
                  length="32"
                  v-model="form.url"
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
import Multiselect from "vue-multiselect";
import axios from "axios";
export default {
  name: "AddTramite",
  components: {
    Multiselect
  },
  data() {
    return {
      departamentos: [],
      usuarios: [],
      form: {
        nombre: "",
        objetivo: "",
        documento_obtenido: "",
        datos_inst: "",
        plazo: 1,
        url: "",
        set_departamento: null,
        set_tipousuario: null
      },
      errors: {},
      loading: false,
      saved: false
    };
  },
  methods: {
    getUsuarios() {
      let _this = this;
      axios
        .get("/gettipousuarios")
        .then(res => {
          _this.usuarios = res.data;
        })
        .catch(err => console.log(err));
    },
    getDepartamentos() {
      let _this = this;
      axios
        .get("/getdepartamentos")
        .then(res => {
          _this.departamentos = res.data;
        })
        .catch(err => console.log(err));
    },
    customLabel({ nombre_departamento }) {
      return `${nombre_departamento}`;
    },
    customLabelusuarios({ nombre }) {
      return `${nombre}`;
    },
    submitForm() {
      let _this = this;
      axios
        .post("/tramites", _this.form)
        .then(res => {
          _this.departamentos = res.data;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.getDepartamentos();
    this.getUsuarios();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
