/* eslint-disable prettier/prettier */
<template>
  <div class="w-full">
    <h1 class="m-8 font-bold text-3xl">Departamentos</h1>
    <div class="mb-6 flex justify-between items-center">
      <search-filter v-model="form.search" class="ml-4 w-full max-w-md mr-4" @reset="reset">
        <select v-model="form.rol" class="mt-1 w-full form-select">
          <option :value="null" />
          <option value="todos">Todos</option>
        </select>
      </search-filter>
      <router-link class="btn-indigo" to="/departamentos/add">
        <span>Agregar -</span>
        <span class="hidden md:inline">&nbsp;Departamento</span>
      </router-link>
    </div>
    <spinner v-if="loading"></spinner>
    <div v-else>
      <div class="bg-white rounded shadow overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <tr class="text-left font-bold">
            <th class="px-6 pt-6 pb-4">Nombre</th>
            <th class="px-6 pt-6 pb-4">Organización</th>
            <th class="px-6 pt-6 pb-4">Creación</th>
            <th class="px-6 pt-6 pb-4" colspan="2">Actualización</th>
          </tr>
          <tr
            v-for="departamento in departamentos.data"
            :key="departamento.data.id"
            class="hover:bg-gray-100 focus-within:bg-gray-100"
          >
            <td class="border-t">
              <p
                class="pl-4 font-bold uppercase"
              >{{ departamento.data.attributes.nombre_departamento }}</p>
            </td>
            <td class="border-t">
              <p class="pl-4 font-bold uppercase">SEG</p>
            </td>
            <td class="border-t">
              <p class="pl-4 font-bold italic">{{ departamento.data.attributes.created_at }}</p>
            </td>
            <td class="border-t">
              <p class="pl-4 font-bold italic">{{ departamento.data.attributes.updated_at }}</p>
            </td>

            <td class="border-t w-px">
              <router-link
                :to="
                  '/departamentos/' +
                    departamento.data.departamento_id +
                    '/edit'
                "
                class="flex items-center p-4"
              >
                <icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
              </router-link>
            </td>
          </tr>
          <tr v-if="departamentos.data.length === 0">
            <td class="border-t px-6 py-4" colspan="4">No se encontraron departamentos.</td>
          </tr>
        </table>
      </div>
      <div class="w-full mt-4">
        <Pagination :pagination="pagination" @paginate="loadDepartamentos" :offset="4" />
      </div>
    </div>
  </div>
</template>
<script>
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import Icon from "@/Shared/Icon";
import SearchFilter from "@/Shared/SearchFilter";
import mapValues from "lodash/mapValues";
import pickBy from "lodash/pickBy";
// import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
import axios from "axios";

export default {
  components: {
    Spinner,
    Icon,
    SearchFilter,
    Pagination
  },
  data() {
    return {
      title: "Departamentos",
      pagination: {},
      url: "",
      loading: true,
      query: null,
      departamentos: [],
      contacts: Object,
      filters: Object,
      form: {
        search: "",
        rol: ""
      }
    };
  },
  watch: {
    form: {
      handler: debounce(function() {
        let query = pickBy(this.form);
        // console.log(query);
        this.findFilter(
          Object.keys(query).length ? query : { remember: "forget" }
        );
      }, 500),
      deep: true
    }
  },
  created() {
    this.loadDepartamentos();
  },
  methods: {
    loadDepartamentos() {
      let _this = this;
      _this.loading = true;
      let current_page = _this.pagination.current_page;
      let pageNum = current_page ? current_page : 1;
      axios
        .get(`/departamentos?page=${pageNum}`)
        .then(res => {
          this.departamentos = res.data;
          this.loading = false;
          _this.consultas = res.data.consultas;
          _this.pagination = res.data.pagination;
          _this.url = res.data.next_page_url;
        })
        .catch(err => console.log(err));
    },
    reset() {
      this.form = mapValues(this.form, () => null);
    },
    findFilter(query) {
      console.log(query);
      let _this = this;
      axios
        // .get(`/departamentos/?q=${query.search}`)
        .get("/departamentos", {
          params: query
        })
        .then(res => {
          _this.departamentos = res.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
