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
  background: transparent;
}

.album-card__link {
  display: grid;
  width: 100%;
  grid-template-columns: clamp(200px, 28vw, 300px) minmax(0, 1fr);
  align-items: center;
  gap: clamp(24px, 5vw, 56px);
  color: #fff;
}

.album-card__cover {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.album-card__info {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.album-card__info > div {
  min-width: 0;
}

.album-card__info h2 {
  margin: 0 0 14px;
  color: #fff;
  font-size: clamp(1.35rem, 2.5vw, 2rem);
  font-weight: 700;
  line-height: 1.3;
}

.album-card__info p {
  margin: 0;
  color: #aaa;
  font-size: 15px;
  line-height: 1.75;
}

.album-card__info svg {
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
  transition: transform 0.3s ease;
}

.album-card__link:hover .album-card__cover,
.album-card__link:focus-visible .album-card__cover {
  opacity: 0.78;
}

.album-card__link:hover .album-card__info svg,
.album-card__link:focus-visible .album-card__info svg {
  transform: translate(4px, -4px);
}

@media (max-width: 575px) {
  .album-card__link {
    grid-template-columns: 104px minmax(0, 1fr);
    align-items: start;
    gap: 16px;
  }

  .album-card__info {
    gap: 12px;
  }

  .album-card__info h2 {
    margin-bottom: 7px;
    font-size: 1rem;
  }

  .album-card__info p {
    display: -webkit-box;
    overflow: hidden;
    font-size: 12px;
    line-height: 1.5;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .album-card__info svg {
    width: 20px;
    height: 20px;
  }
}
</style>
