<script setup lang="ts">
import { albums, type AlbumCategory } from '~/data/albums'

type AlbumFilter = 'all' | AlbumCategory

const filters: { value: AlbumFilter, key: string }[] = [
  { value: 'all', key: 'all' },
  { value: 'regular', key: 'regular' },
  { value: 'special', key: 'special' },
]

const { t } = useI18n()
const localePath = useLocalePath()
const activeFilter = ref<AlbumFilter>('all')
const filteredAlbums = computed(() => activeFilter.value === 'all'
  ? albums
  : albums.filter(album => album.category === activeFilter.value))

useSeoMeta({
  title: () => t('seo.albumsTitle'),
  description: () => t('seo.albumsDescription'),
  ogTitle: () => t('seo.albumsTitle'),
  ogDescription: () => t('seo.albumsOgDescription'),
  ogImage: albums[0]?.cover,
})
</script>

<template>
  <main id="main" class="album-archive-page">
    <nav class="archive-breadcrumbs" :aria-label="t('common.breadcrumbs')">
      <div class="container archive-breadcrumbs__inner">
        <span aria-hidden="true" />
        <ol>
          <li><NuxtLink :to="localePath('/')">{{ t('common.home') }}</NuxtLink></li>
          <li aria-current="page">{{ t('common.albums') }}</li>
        </ol>
      </div>
    </nav>

    <section id="portfolio" class="album-archive">
      <div class="container">
        <header class="section-header">
          <h1 class="section-title">{{ t('albums.archive.title') }}</h1>
          <p class="section-description">{{ t('albums.archive.description') }}</p>
        </header>

        <div class="album-filters" :aria-label="t('albums.archive.filterLabel')">
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            :class="{ 'is-active': activeFilter === filter.value }"
            :aria-pressed="activeFilter === filter.value"
            @click="activeFilter = filter.value"
          >{{ t(`albums.archive.${filter.key}`) }}</button>
        </div>

        <TransitionGroup name="album-grid" tag="div" class="album-grid">
          <AlbumCard
            v-for="album in filteredAlbums"
            :key="album.slug"
            :album="album"
          />
        </TransitionGroup>
      </div>
    </section>
  </main>
</template>

<style scoped>
.album-archive-page {
  min-height: 100vh;
  background: #121212;
}

.archive-breadcrumbs {
  min-height: 70px;
  padding: 20px 0;
  margin-top: var(--header-height);
  background: #1e1e1e;
}

.archive-breadcrumbs__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.archive-breadcrumbs ol {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 14px;
}

.archive-breadcrumbs li + li {
  padding-left: 10px;
}

.archive-breadcrumbs li + li::before {
  padding-right: 10px;
  color: #6c757d;
  content: "/";
}

.album-archive {
  padding: 80px 0;
  overflow: hidden;
  background: #121212;
}

.album-filters {
  display: flex;
  margin: 0 auto 30px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.album-filters button {
  padding: 12px 18px 14px;
  border: 0;
  border-radius: 4px;
  background: #1e1e1e;
  color: #e0e0e0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.album-filters button:hover,
.album-filters button:focus-visible,
.album-filters button.is-active {
  background: #949494;
  color: #fff;
}

.album-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.album-grid-enter-active,
.album-grid-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.album-grid-enter-from,
.album-grid-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (max-width: 991px) {
  .album-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 575px) {
  .archive-breadcrumbs {
    min-height: 60px;
  }

  .album-archive {
    padding: 64px 0;
  }

  .album-grid {
    grid-template-columns: 1fr;
  }
}
</style>
