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
      <v-breadcrumbs class="text-subtitle-2" :items="breadcrumbs">
        <template #title="{ item }">
          <v-breadcrumbs-item
            color="primary"
            density="compact"
            :title="item.title"
            :to="item.to"
          />
        </template>
      </v-breadcrumbs>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { BreadcrumbItem } from '@/types/index'
  const route = useRoute()

  const breadcrumbs = computed(() => {
    return route.meta.breadcrumbs as BreadcrumbItem[]
  })
</script>
<style lang="scss" scoped>
</style>
