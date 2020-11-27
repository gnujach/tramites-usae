<template>
  <div class="bg-gray-100 m-4 border rounded">
    <h1 class="m-8 font-bold text-3xl">Requisitos</h1>
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
      <router-link class="btn-indigo mr-2" to="/requisitos/add">
        <span>Agregar -</span>
        <span class="hidden md:inline">&nbsp;Requisito</span>
      </router-link>
    </div>
    <spinner v-if="loading"></spinner>
    <div v-else>
      <div class="bg-white rounded shadow overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <tr class="text-left font-bold">
            <th class="px-6 pt-6 pb-4">Nombre</th>
            <th class="px-6 pt-6 pb-4">Tipo</th>
            <th class="px-6 pt-6 pb-4">Creado</th>
            <th class="px-6 pt-6 pb-4">Actualizado</th>
          </tr>
          <tr
            v-for="requisito in requisitos.data"
            :key="requisito.data.id"
            class="hover:bg-gray-100 focus-within:bg-gray-100"
          >
            <td class="border-t">
              <p class="pl-4 font-bold uppercase">
                {{ requisito.data.attributes.nombre }}
              </p>
            </td>
            <td class="border-t">
              <p class="pl-4 font-bold uppercase">
                {{ requisito.data.attributes.tipo }}
              </p>
            </td>
            <td class="border-t">
              <p class="pl-4 font-bold uppercase">
                {{ requisito.data.attributes.created_at }}
              </p>
            </td>
            <td class="border-t">
              <p class="pl-4 font-bold uppercase">
                {{ requisito.data.attributes.updated_at }}
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../../components/Spinner";
import SearchFilter from "@/Shared/SearchFilter";
import mapValues from "lodash/mapValues";
import pickBy from "lodash/pickBy";
import debounce from "lodash/debounce";
import axios from "axios";
// import Icon from "@/Shared/Icon";
export default {
  name: "Requisitos",
  components: {
    Spinner,
    // Icon,
    SearchFilter
    // Pagination
  },
  data() {
    return {
      pagination: {},
      url: "",
      loading: true,
      query: null,
      tramites: [],
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
  methods: {
    loadRequisitos() {
      let _this = this;
      _this.loading = true;
      let current_page = _this.pagination.current_page;
      let pageNum = current_page ? current_page : 1;
      axios
        .get(`/requisitos?page=${pageNum}`)
        .then(res => {
          _this.requisitos = res.data;
          _this.loading = false;
          // _this.consultas = res.data.consultas;
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
        // .get(`/tramites/?q=${query.search}`)
        .get("/requisitos", {
          params: query
        })
        .then(res => {
          _this.tramites = res.data;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.loadRequisitos();
  }
};
</script>

<style lang="scss" scoped></style>
