<script setup lang="ts">
import type { Album } from '~/data/albums'

defineProps<{
  album: Album
}>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <article class="album-card">
    <NuxtLink :to="localePath(`/album/${album.slug}`)" class="album-card__link">
      <img
        :src="album.cover"
        :alt="t('common.albumCover', { title: t(`albums.items.${album.slug}.title`) })"
        class="album-card__cover"
        width="600"
        height="600"
        loading="lazy"
      >
      <div class="album-card__info">
        <div>
          <h2>{{ t(`albums.items.${album.slug}.listTitle`) }}</h2>
          <p>{{ t(`albums.items.${album.slug}.description`) }}</p>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 16 16 8m-6 0h6v6" />
        </svg>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.album-card {
  position: relative;
  min-width: 0;
  aspect-ratio: 1;
  overflow: hidden;
  background: #1a1a1a;
}

.album-card__link {
  display: block;
  width: 100%;
  height: 100%;
  color: #fff;
}

.album-card__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.55s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.album-card__info {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  min-height: 118px;
  padding: 18px 20px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  background: rgba(25, 25, 25, 0.94);
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.album-card__info h2 {
  margin: 0 0 7px;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.35;
}

.album-card__info p {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: #ccc;
  font-size: 13px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.album-card__info svg {
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.album-card__link:hover .album-card__cover,
.album-card__link:focus-visible .album-card__cover {
  transform: translateY(-24px) scale(1.03);
}

.album-card__link:hover .album-card__info,
.album-card__link:focus-visible .album-card__info {
  opacity: 1;
  transform: translateY(0);
}

@media (hover: none) {
  .album-card__info {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
