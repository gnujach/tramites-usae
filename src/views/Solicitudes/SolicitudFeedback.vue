<template>
  <div>
    <div class="w-full flex flex-1">
      <h1 class="m-8 font-bold text-3xl">Nueva Solicitud</h1>
    </div>
    <form
      name="request-from"
      @submit.prevent="submit"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
      class="flex flex-wrap -mb-4"
      v-if="!success"
    >
      <div class="flex w-full ml-8 mt-2">
        <div class="w-1/2 mx-2">
          <p class="hidden">
            <label>
              Don’t fill this out if you're human:
              <input name="bot-field" />
            </label>
          </p>
          <t-input-group label="Nombre" feedback="Solo letras">
            <t-input
              v-model="form.nombre_usuario"
              type="text"
              autofocus
              maxlength="32"
              required
              placeholder="Juan Perez..."
              v-bind:class="{ 'border-red-300': errors }"
            />
          </t-input-group>
          <t-input-group label="Clave de Centro de Trabajo">
            <t-input
              v-model="form.cct"
              type="text"
              autofocus
              maxlength="32"
              required
              placeholder="11dpr1390p"
            />
          </t-input-group>
          <div class="w-1/6 h-12 text-center mt-6">
            <input
              type="submit"
              class="py-2 px-4 text-green-700 border text-lg mr-5 hover:border-green-700 rounded"
              value="Guardar"
              v-if="!loading"
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
  name: "SolicitudFeedback",
  components: {},
  data() {
    return {
      form: {
        nombre_usuario: "",
        cct: ""
      },
      loading: false,
      success: false,
      errors: []
    };
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        await axios.post("/departamentos", this.data);
        this.success = true;
      } catch (error) {
        this.loading = false;
        this.success = false;
        this.errors = error;
      }
    }
  }
};
</script>
