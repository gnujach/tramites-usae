<template>
  <div>
    <div class="mb-4">
      <router-link class="flex items-center group py-3" to="/departamentos">
        <icon name="office" class="w-4 h-4 mr-2 fill-indigo-400 group-hover:fill-white" />
        <div class="text-indigo-400 group-hover:text-white">Departamentos</div>
      </router-link>
    </div>
    <div class="mb-4">
      <router-link class="flex items-center group py-3" to="/solicitudes/add">
        <icon name="users" class="w-4 h-4 mr-2 fill-indigo-400 group-hover:fill-white" />
        <div class="text-indigo-400 group-hover:text-white">Solicitudes</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Icon from "@/Shared/Icon";

export default {
  components: {
    Icon
  }
};
</script>
