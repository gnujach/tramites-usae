<template>
  <div class="bg-gray-100 m-4 border rounded">
    <h1 class="m-8 font-bold text-3xl">Trámites</h1>
    <div class="mb-6 flex justify-between items-center">
      <search-filter
        v-model="form.search"
        class="ml-4 w-full max-w-md mr-4"
        @reset="reset"
      >
        <select v-model="form.rol" class="mt-1 w-full form-select">
          <option :value="null" />
          <option value="todos">Todos</option>
        </select>
      </search-filter>
      <router-link class="btn-indigo mr-2" to="/tramites/add">
        <span>Agregar -</span>
        <span class="hidden md:inline">&nbsp;Trámite</span>
      </router-link>
    </div>
    <spinner v-if="loading"></spinner>
    <div v-else>
      <div class="bg-white rounded shadow overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <tr class="text-left font-bold">
            <th class="px-6 pt-6 pb-4">Nombre</th>
            <th class="px-6 pt-6 pb-4">Departamento</th>
            <th class="px-6 pt-6 pb-4">Dependencia</th>
            <th class="px-6 pt-6 pb-4">Tipo de Usuario</th>
            <th class="px-6 pt-6 pb-4">Requisitos</th>
            <th class="px-6 pt-6 pb-4">Tareas</th>
            <th class="px-6 pt-6 pb-4">Formatos</th>
          </tr>
          <tr
            v-for="tramite in tramites.data"
            :key="tramite.data.id"
            class="hover:bg-gray-100 focus-within:bg-gray-100"
          >
            <td class="border-t">
              <p
                class="pl-4 font-bold uppercase text-left whitespace-pre-wrap italic"
              >
                {{ tramite.data.attributes.nombre }}
              </p>
            </td>
            <td class="border-t">
              <p class="font-bold uppercase text-left whitespace-pre-wrap">
                {{
                  tramite.data.departamento.data.attributes.nombre_departamento
                }}
              </p>
            </td>
            <td class="border-t">
              <p class="pl-4 font-bold uppercase">
                {{ tramite.data.dependencia.data.attributes.alias }}
              </p>
            </td>
            <td class="border-t">
              <p class="pl-4 font-bold uppercase">
                {{ tramite.data.tipousuario.data.attributes.nombre }}
              </p>
            </td>
            <td class="border-t w-px">
              <router-link
                :to="'/requisitos/AddReqtoTramite/' + tramite.data.tramite_id"
                class="flex items-center justify-center p-4"
              >
                <icon
                  name="dashboard"
                  class="block w-6 h-6 fill-gray-400 text-center"
                />
              </router-link>
            </td>
            <td class="border-t w-px text-center">
              <router-link
                :to="'/tramites/' + tramite.data.tramite_id + '/edit'"
                class="flex justify-center p-4"
              >
                <icon name="config" class="block w-6 h-6 fill-gray-400" />
              </router-link>
            </td>
            <td class="border-t w-px">
              <router-link
                :to="'/tramites/' + tramite.data.tramite_id + '/edit'"
                class="flex justify-center p-4"
              >
                <icon
                  name="book"
                  class="block w-6 h-6 fill-gray-400 text-center"
                />
              </router-link>
            </td>
            <td class="border-t w-px">
              <router-link
                :to="'/tramites/' + tramite.data.tramite_id + '/edit'"
                class="flex items-center justify-center p-4"
              >
                <icon
                  name="cheveron-right"
                  class="block w-6 h-6 fill-gray-400"
                />
              </router-link>
            </td>
          </tr>
        </table>
      </div>
      <div class="w-full mt-4">
        <Pagination
          :pagination="pagination"
          @paginate="loadTramites"
          :offset="4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import SearchFilter from "@/Shared/SearchFilter";
import mapValues from "lodash/mapValues";
import pickBy from "lodash/pickBy";
import debounce from "lodash/debounce";
import axios from "axios";
import Icon from "@/Shared/Icon";
export default {
  components: {
    Spinner,
    Icon,
    SearchFilter,
    Pagination,
  },
  data() {
    return {
      title: "Tramites",
      pagination: {},
      url: "",
      loading: true,
      query: null,
      tramites: [],
      contacts: Object,
      filters: Object,
      form: {
        search: "",
        rol: "",
      },
    };
  },
  watch: {
    form: {
      handler: debounce(function () {
        let query = pickBy(this.form);
        // console.log(query);
        this.findFilter(
          Object.keys(query).length ? query : { remember: "forget" }
        );
      }, 500),
      deep: true,
    },
  },
  created() {
    this.loadTramites();
  },

  methods: {
    loadTramites() {
      let _this = this;
      _this.loading = true;
      let current_page = _this.pagination.current_page;
      let pageNum = current_page ? current_page : 1;
      axios
        .get(`/tramites?page=${pageNum}`)
        .then((res) => {
          _this.tramites = res.data;
          _this.loading = false;
          // _this.consultas = res.data.consultas;
          _this.pagination = res.data.pagination;
          _this.url = res.data.next_page_url;
        })
        .catch((err) => console.log(err));
    },
    reset() {
      this.form = mapValues(this.form, () => null);
    },
    findFilter(query) {
      console.log(query);
      let _this = this;
      axios
        // .get(`/tramites/?q=${query.search}`)
        .get("/tramites", {
          params: query,
        })
        .then((res) => {
          _this.tramites = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
