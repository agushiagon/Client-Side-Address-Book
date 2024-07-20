<template>
  <v-app-bar elevation="1" height="80">
    <template #prepend>
      <v-img
        alt="StarLabs Logo"
        class="ml-4"
        src="/src/assets/logo.png"
        :width="62"
      />
    </template>
    <v-app-bar-title class="text-center">
      <span class="font-weight-bold text-subtitle-1">
        {{ $route.meta.pageTitle }}
      </span>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">

</script>
<style lang="scss" scoped>
</style>
