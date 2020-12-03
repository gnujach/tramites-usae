<template>
  <div class="bg-gray-100 m-4 border rounded">
    <h1 class="m-8 font-bold text-3xl">Agrega Requisitos al Trámites</h1>
    <div class="mb-6 flex justify-between items-center w-full">
      <div
        class="bg-orange-300 border-l-4 border-orange-200 text-orange-700 p-4 w-full m-4"
        role="alert"
      >
        <p class="font-bold">Atención</p>
        <p>
          Mueve los requisitos del catálogo hacia los requisitos del trámite.
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
      <div class="mb-6 flex justify-between items-start w-full">
        <div class="mb-6 flex justify-center items-center w-full">
          <div class="m-12">
            <draggable
              v-model="requisitos"
              group="name: 'req-tramites'"
              class="w-64 border border-gray-100 bg-white rounded overflow-y-scroll h-64"
            >
              <p slot="header" class="text-xl text-center bg-gray-400">
                Catálogo de Requisitos
              </p>
              <div
                v-for="element in requisitos"
                :key="element.id"
                class="border-gray-400 border-b-2 bg-white ml-2 hover:bg-gray-300"
              >
                {{ element.nombre }}
              </div>
            </draggable>
          </div>
          <div class="m-12">
            <icon
              name="switch-horizontal"
              class="w-8 h-8 mr-2 space-y-2 space-x-2 fill-white group-hover:fill-white"
            />
          </div>
          <div class="m-12">
            <draggable
              v-model="requisitos_tramite"
              group="name: 'req-tramites'"
              @change="log"
              class="w-64 border border-gray-100 bg-white rounded overflow-auto h-64"
            >
              <p slot="header" class="text-xl text-center bg-gray-400">
                Requisitos del Trámite
              </p>
              <div
                v-for="(req, index) in requisitos_tramite"
                :key="index"
                class="overscroll-auto border-gray-400 border-b-2 bg-white ml-2 hover:bg-gray-300"
              >
                {{ req.nombre }} {{ index + 1 }}
              </div>
              <div slot="footer">
                <button
                  class="rounded bg-green-800 text-white m-2 p-2"
                  v-if="requisitos_tramite.length > 0"
                  @click="saveRequisitos"
                >
                  Guardar
                </button>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import axios from "axios";
import Spinner from "../../components/Spinner";
import Icon from "@/Shared/Icon";
// import merge from "lodash/merge";
// import map from "lodash/map";
import _ from "lodash";
export default {
  components: {
    draggable,
    Spinner,
    Icon,
  },
  data() {
    return {
      tramite: {
        nombre: null,
        objetivo: null,
        departamento: null,
        usuario: null,
      },
      catrequisitos: [],
      requisitos: [],
      data: [],
      requisitos_tramite: [],
      saved: false,
      loading: false,
    };
  },
  methods: {
    getRequisitos() {
      const _this2 = this;
      _this2.loading = true;
      // let rem;
      axios
        .get("/getrequisitos")
        .then((res) => {
          _this2.loading = false;
          _this2.catrequisitos = res.data;
          _this2.requisitos = _.map(_this2.catrequisitos, (obk) => {
            return { id: obk.id, nombre: obk.nombre };
          });
          if (_this2.requisitos_tramite.length > 0) {
            _.map(_this2.requisitos_tramite, (item) => {
              _this2.requisitos.splice(
                _this2.requisitos.findIndex((i) => i.id === item.id),
                1
              );
              // _this2.requisitos.splice(rem, 1);
            });
          }
        })
        .catch((err) => console.log(err));
    },
    log(envt) {
      console.log(envt);
    },
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
          _this.requisitos_tramite = _.map(
            _this.data.requisitos.data,
            (obk) => {
              return { id: obk.id, nombre: obk.nombre };
            }
          );
          // Hacemos la peticion a catalogo
          _this.getRequisitos();
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    saveRequisitos() {
      const _this = this;
      console.log("Requisitos del tramite", _this.requisitos_tramite);
      const indexes = _this.requisitos_tramite.map((req) => {
        return req.id;
      });
      console.log("Valor de indexes", indexes);
      axios
        .post("/tramites/addreqtotramite/" + _this.$route.params.id, {
          requisitos: indexes,
        })
        .then(() => {
          _this.saved = true;
          _this.loading = false;
        })
        .catch((err) => {
          _this.errors = err.response.data.errors;
          _this.loading = false;
        });
    },
  },
  created() {
    this.getTramite();
    // this.getRequisitos();
  },
};
</script>
