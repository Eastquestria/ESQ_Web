<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'zh-CN',
  },
  title: 'Eastquestria - 东方小马国',
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/img/favicon.png' },
  ],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
