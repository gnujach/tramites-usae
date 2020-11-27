<template>
  <div class="bg-gray-100 m-4 border rounded">
    <h1 class="m-4 font-bold text-3xl">Agrega Tareas al Trámites</h1>
    <div class="mb-6 flex justify-between items-center w-full">
      <div
        class="bg-orange-300 border-l-4 border-orange-200 text-orange-700 p-4 w-full m-4"
        role="alert"
      >
        <p class="font-bold">Atención</p>
        <p>
          Una tarea es una actividad finita que debes realizar de manera
          secuencial para dar atención al trámite
        </p>
      </div>
    </div>
    <spinner v-if="loading"></spinner>
    <div v-else>
      <div class="mb-6 flex justify-between items-center w-full">
        <div class="w-1/4 m-2 font-semibold">
          Nombre de Trámite: {{ tramite.nombre }}
        </div>
        <div class="w-1/4 m-2 font-semibold">
          Objetivo de Trámite: {{ tramite.objetivo }}
        </div>
        <div class="w-1/4 m-2 font-semibold">
          Departamento de Trámite: {{ tramite.departamento }}
        </div>
        <div class="w-1/4 m-2 font-semibold">
          Tipo de usuarios: {{ tramite.usuario }}
        </div>
      </div>
      <div class="flex w-full justify-center items-center">
        <form class="w-full flex justify-center">
          <label class="text-xl font-bold ml-8 mr-4">Tarea </label>
          <div class="ml-2 relative w-1/2">
            <div class="absolute text-gray-700">
              <icon name="search" />
            </div>
            <input
              type="text"
              class="pl-8 p-1 rounded-full border-orange-500 border w-full text-lg appearance-none focus:outline-none bg-white focus: border-orange-600"
              placeholder="Tarea"
            />
          </div>
          <input
            type="submit"
            value="Agregar"
            class="p-2 bg-orange-500 text-white rounded ml-2 hover:bg-white hover:text-orange-500 hover:border-orange-500 hover:border"
          />
        </form>
      </div>
      <div
        class="flex flex-1 justify-end items-center w-3/3 items-center justify-center bg-white m-8 border border-orange-500 rounded"
      >
        <ul class="w-full">
          <li class="w-full">
            <div
              class="flex flex-row items-start justify-start w-full border-b-2"
            >
              <div class="w-2/3 block break-words">
                <p class="ml-2">1.- Revisar cumplimiento de requisitos</p>
              </div>
              <div class="flex justify-end items-end w-1/3">
                <button class="bg-white rounded m-4">
                  <icon
                    name="minus"
                    class="w-4 h-4 mr-2 space-y-2 space-x-2 fill-white group-hover:fill-white"
                  />
                </button>
              </div>
            </div>
          </li>
          <li class="w-full">
            <div
              class="flex flex-row items-start justify-start w-full border-b-2"
            >
              <div class="w-2/3 block break-words">
                <p class="ml-2">2.- Buscar usuario en plataforma</p>
              </div>
              <div class="flex justify-end items-end w-1/3">
                <button class="bg-white rounded m-4">
                  <icon
                    name="minus"
                    class="w-4 h-4 mr-2 space-y-2 space-x-2 fill-white group-hover:fill-white"
                  />
                </button>
              </div>
            </div>
          </li>
          <li class="w-full">
            <div
              class="flex flex-row items-start justify-start w-full border-b-2"
            >
              <div class="w-2/3 block break-words">
                <p class="ml-2">3.- Cambiar contraseña en plataforma</p>
              </div>
              <div class="flex justify-end items-end w-1/3">
                <button class="bg-white rounded m-4">
                  <icon
                    name="minus"
                    class="w-4 h-4 mr-2 space-y-2 space-x-2 fill-white group-hover:fill-white"
                  />
                </button>
              </div>
            </div>
          </li>
          <li class="w-full">
            <div
              class="flex flex-row items-start justify-start w-full border-b-2"
            >
              <div class="w-2/3 block break-words">
                <p class="ml-2">4.- Generar reporte</p>
              </div>
              <div class="flex justify-end items-end w-1/3">
                <button class="bg-white rounded m-4">
                  <icon
                    name="minus"
                    class="w-4 h-4 mr-2 space-y-2 space-x-2 fill-white group-hover:fill-white"
                  />
                </button>
              </div>
            </div>
          </li>
          <li class="w-full">
            <div
              class="flex flex-row items-start justify-start w-full border-b-2"
            >
              <div class="w-2/3 block break-words">
                <p class="ml-2">5.- Enviar reporte a usuario</p>
              </div>
              <div class="flex justify-end items-end w-1/3">
                <button class="bg-white rounded m-4">
                  <icon
                    name="minus"
                    class="w-4 h-4 mr-2 space-y-2 space-x-2 fill-white group-hover:fill-white"
                  />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../components/Spinner";
import Icon from "@/Shared/Icon";
export default {
  components: {
    Spinner,
    Icon,
  },
  data() {
    return {
      loading: false,
      tramite: {
        nombre: null,
        objetivo: null,
        departamento: null,
        usuario: null,
      },
    };
  },
  methods: {
    getTramite() {
      const _this = this;
      _this.loading = true;
      axios
        .get("/tramites/" + _this.$route.params.id)
        .then((res) => {
          _this.loading = false;
          _this.data = res.data.data;
          _this.tramite.nombre = _this.data.attributes.nombre;
          _this.tramite.objetivo = _this.data.attributes.objetivo;
          _this.tramite.departamento =
            _this.data.departamento.data.attributes.nombre_departamento;
          _this.tramite.usuario = _this.data.tipousuario.data.attributes.nombre;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    addTarea() {
      console.log("Add Tarea");
    },
  },
  created() {
    this.getTramite();
  },
};
</script>

<style lang="scss" scoped></style>
