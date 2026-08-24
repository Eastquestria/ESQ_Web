<script setup lang="ts">
import { albums, type AlbumCategory } from '~/data/albums'

type AlbumFilter = 'all' | AlbumCategory

const filters: { value: AlbumFilter, label: string }[] = [
  { value: 'all', label: '全部专辑' },
  { value: 'regular', label: '常规专辑' },
  { value: 'special', label: '特别专辑' },
]

const activeFilter = ref<AlbumFilter>('all')
const filteredAlbums = computed(() => activeFilter.value === 'all'
  ? albums
  : albums.filter(album => album.category === activeFilter.value))

useSeoMeta({
  title: 'Eastquestria - 专辑',
  description: '浏览 Eastquestria 东方小马国迄今发行的所有常规专辑与特别专辑。',
  ogTitle: 'Eastquestria - 专辑',
  ogDescription: 'Eastquestria 东方小马国专辑目录。',
  ogImage: albums[0]?.cover,
})
</script>

<template>
  <main id="main" class="album-archive-page">
    <nav class="archive-breadcrumbs" aria-label="面包屑导航">
      <div class="container archive-breadcrumbs__inner">
        <span aria-hidden="true" />
        <ol>
          <li><NuxtLink to="/">主页</NuxtLink></li>
          <li aria-current="page">专辑</li>
        </ol>
      </div>
    </nav>

    <section id="portfolio" class="album-archive">
      <div class="container">
        <header class="section-header">
          <h1 class="section-title">专辑</h1>
          <p class="section-description">这是我们迄今为止发行的所有专辑</p>
        </header>

        <div class="album-filters" aria-label="专辑分类筛选">
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            :class="{ 'is-active': activeFilter === filter.value }"
            :aria-pressed="activeFilter === filter.value"
            @click="activeFilter = filter.value"
          >{{ filter.label }}</button>
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
