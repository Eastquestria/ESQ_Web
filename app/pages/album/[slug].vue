<script setup lang="ts">
import { getAlbumBySlug } from '~/data/albums'

definePageMeta({
  key: route => route.fullPath,
})

const route = useRoute()
const { t } = useI18n()
const routeSlug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const album = getAlbumBySlug(routeSlug ?? '')

if (!album) {
  throw createError({
    statusCode: 404,
    statusMessage: t('albums.detail.notFound'),
  })
}

useSeoMeta({
  title: () => `Eastquestria - ${t(`albums.items.${album.slug}.title`)}`,
  description: () => t(`albums.items.${album.slug}.description`),
  ogTitle: () => t(`albums.items.${album.slug}.title`),
  ogDescription: () => t(`albums.items.${album.slug}.description`),
  ogImage: album.cover,
})
</script>

<template>
  <AlbumDetail :key="album.slug" :album="album" />
</template>
