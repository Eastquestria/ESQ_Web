<script setup lang="ts">
const { t } = useI18n()
const localeHead = useLocaleHead({ seo: true })

useHead(() => {
  return {
    htmlAttrs: localeHead.value.htmlAttrs,
    title: t('seo.siteTitle'),
    meta: localeHead.value.meta,
    link: [
      ...localeHead.value.link,
      { rel: 'icon', type: 'image/png', href: '/assets/img/favicon.png' },
    ],
  }
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
