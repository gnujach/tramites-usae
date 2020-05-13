<template>
  <div>
    <div class="mb-4">
      <router-link class="flex items-center group py-3" to="/departamentos">
        <icon name="office" class="w-4 h-4 mr-2 fill-indigo-400 group-hover:fill-white" />
        <div class="text-indigo-400 group-hover:text-white">Departamentos</div>
      </router-link>
    </div>
    <div class="mb-4">
      <router-link class="flex items-center group py-3" to="/">
        <icon name="users" class="w-4 h-4 mr-2 fill-indigo-400 group-hover:fill-white" />
        <div class="text-indigo-400 group-hover:text-white">Organizations</div>
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
