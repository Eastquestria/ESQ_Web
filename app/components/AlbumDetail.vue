<script setup lang="ts">
import type { Album } from '~/data/albums'

const props = defineProps<{
  album: Album
}>()

const neteaseUrl = computed(() => `https://music.163.com/album?id=${props.album.neteaseAlbumId}`)
const playlistUrl = computed(() => `https://api.eqad.fun/ncm/album/${props.album.neteaseAlbumId}`)
</script>

<template>
  <div class="album-detail-page">
    <section
      class="album-banner"
      :style="{ backgroundImage: `url(${album.background})` }"
      :aria-label="album.title"
    >
      <h1 v-if="album.titleImage" class="album-banner__image-heading">
        <img
          :src="album.titleImage"
          :alt="album.title"
          class="album-banner__title-image"
        >
      </h1>
      <h1 v-else class="album-banner__title">{{ album.title }}</h1>
    </section>

    <main id="main">
      <nav class="album-breadcrumbs" aria-label="面包屑导航">
        <div class="container album-breadcrumbs__inner">
          <h2>{{ album.title }}</h2>
          <ol>
            <li><NuxtLink to="/">主页</NuxtLink></li>
            <li><NuxtLink to="/album">专辑</NuxtLink></li>
            <li aria-current="page">{{ album.title }}</li>
          </ol>
        </div>
      </nav>

      <section id="portfolio-details" class="album-details">
        <div class="container album-details__grid">
          <div class="album-details__artwork">
            <img
              :src="album.cover"
              :alt="`${album.title}专辑封面`"
              width="600"
              height="600"
            >
          </div>

          <aside class="album-details__info">
            <h2>{{ album.title }}</h2>
            <dl class="album-details__metadata">
              <div>
                <dt>发行时间</dt>
                <dd>{{ album.releasedAt }}</dd>
              </div>
              <div>
                <dt>投稿数</dt>
                <dd>{{ album.submissions }}</dd>
              </div>
            </dl>

            <ul class="album-details__links">
              <li>
                <a :href="neteaseUrl" target="_blank" rel="noreferrer">
                  前往网易云专辑页
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16 8m-6 0h6v6" /></svg>
                </a>
              </li>
              <li>
                <a :href="album.memoryUrl" target="_blank" rel="noreferrer">
                  前往马国记忆资源贴
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16 8m-6 0h6v6" /></svg>
                </a>
              </li>
              <li>
                <a :href="album.downloadUrl" target="_blank" rel="noreferrer">
                  前往 Pudding 资源站下载
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16 8m-6 0h6v6" /></svg>
                </a>
              </li>
            </ul>

            <AlbumPlayer
              :key="album.slug"
              :source-url="playlistUrl"
              :cover="album.cover"
            />
          </aside>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.album-banner {
  position: relative;
  display: flex;
  width: 100%;
  height: 30vh;
  min-height: 240px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.album-banner::before {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.18);
  content: "";
}

.album-banner__image-heading,
.album-banner__title {
  position: relative;
  z-index: 1;
}

.album-banner__image-heading {
  margin: 0;
}

.album-banner__title-image {
  width: auto;
  max-width: min(350px, 74vw);
  max-height: 92px;
  object-fit: contain;
}

.album-banner__title {
  margin: 0;
  color: #fff;
  font-size: clamp(2.25rem, 6vw, 4rem);
  font-weight: 700;
  text-align: center;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.55);
}

.album-breadcrumbs {
  min-height: 70px;
  padding: 20px 0;
  background: #1e1e1e;
}

.album-breadcrumbs__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.album-breadcrumbs h2 {
  margin: 0;
  color: #e0e0e0;
  font-size: 22px;
  font-weight: 300;
}

.album-breadcrumbs ol {
  display: flex;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  list-style: none;
  font-size: 14px;
}

.album-breadcrumbs li + li {
  padding-left: 10px;
}

.album-breadcrumbs li + li::before {
  padding-right: 10px;
  color: #6c757d;
  content: "/";
}

.album-details {
  padding: 54px 0 80px;
  background: #121212;
}

.album-details__grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  align-items: start;
  gap: 32px;
}

.album-details__artwork {
  width: min(100%, 600px);
  margin: 0 auto;
}

.album-details__artwork img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.album-details__info {
  padding: 28px;
  background: #1a1a1a;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}

.album-details__info h2 {
  padding-bottom: 20px;
  margin: 0 0 20px;
  border-bottom: 1px solid #333;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
}

.album-details__metadata {
  margin: 0 0 20px;
}

.album-details__metadata > div {
  display: grid;
  padding: 7px 0;
  grid-template-columns: 90px 1fr;
  gap: 12px;
}

.album-details__metadata dt {
  color: #aaa;
  font-weight: 700;
}

.album-details__metadata dd {
  margin: 0;
  color: #e0e0e0;
  font-variant-numeric: tabular-nums;
}

.album-details__links {
  padding: 0;
  margin: 0 0 24px;
  list-style: none;
}

.album-details__links li + li {
  margin-top: 5px;
}

.album-details__links a {
  display: flex;
  padding: 8px 0;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #ccc;
  font-size: 14px;
  font-weight: 700;
}

.album-details__links a:hover,
.album-details__links a:focus-visible {
  color: #fff;
}

.album-details__links svg {
  width: 19px;
  height: 19px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

@media (max-width: 991px) {
  .album-details__grid {
    grid-template-columns: 1fr;
  }

  .album-details__info {
    width: min(100%, 600px);
    margin: 0 auto;
  }
}

@media (max-width: 767px) {
  .album-banner {
    height: 24vh;
    min-height: 200px;
  }

  .album-breadcrumbs__inner {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .album-details {
    padding: 40px 0 64px;
  }
}

@media (max-width: 575px) {
  .album-details__info {
    padding: 22px 18px;
  }
}
</style>
