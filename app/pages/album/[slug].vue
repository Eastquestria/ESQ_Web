<script setup lang="ts">
import { getAlbumBySlug } from '~/data/albums'

definePageMeta({
  key: route => route.fullPath,
})

const route = useRoute()
const routeSlug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const album = getAlbumBySlug(routeSlug ?? '')

if (!album) {
  throw createError({
    statusCode: 404,
    statusMessage: '未找到该专辑',
  })
}

useSeoMeta({
  title: `Eastquestria - ${album.title}`,
  description: album.description,
  ogTitle: album.title,
  ogDescription: album.description,
  ogImage: album.cover,
})
</script>

<template>
  <AlbumDetail :key="album.slug" :album="album" />
</template>
