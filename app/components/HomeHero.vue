<script setup lang="ts">
import type { Swiper as SwiperInstance } from 'swiper'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/pagination'

interface HeroSlide {
  id: string
  hasSubtitle?: boolean
  background: string
  cover: string
  titleImage?: string
  link: string
  external?: boolean
}

const { t } = useI18n()
const localePath = useLocalePath()
const activeSlideIndex = ref(0)
const swiperModules = [A11y, Autoplay, Pagination]
const swiperA11y = computed(() => ({
  enabled: true,
  containerMessage: t('home.hero.label'),
  paginationBulletMessage: t('home.hero.goToSlide', { number: '{{index}}' }),
}))

const slides: HeroSlide[] = [
  {
    id: 'album5',
    background: '/assets/img/album/album-5-bg.png',
    cover: '/assets/img/album/album-5.jpg',
    titleImage: '/assets/img/album/album-5-title.png',
    link: '/album/album-5',
  },
  {
    id: 'indie1',
    hasSubtitle: true,
    background: '/assets/img/album/indie/1-bg.webp',
    cover: '/assets/img/album/indie/1.webp',
    link: 'https://music.163.com/#/album/355427546',
    external: true,
  },
  {
    id: 'indie2',
    hasSubtitle: true,
    background: '/assets/img/album/indie/2-bg.webp',
    cover: '/assets/img/album/indie/2.webp',
    link: 'https://music.163.com/#/album/355430585',
    external: true,
  },
  {
    id: 'snowdrop',
    background: '/assets/img/album/album-tb-1-bg.png',
    cover: '/assets/img/album/album-tb-1.jpg',
    titleImage: '/assets/img/album/album-tb-1-title.png',
    link: '/album/album-tb-1',
  },
  {
    id: 'album4',
    background: '/assets/img/album/album-4-bg.png',
    cover: '/assets/img/album/album-4.jpg',
    titleImage: '/assets/img/album/album-4-title.png',
    link: '/album/album-4',
  },
]

function updateActiveSlide(swiper: SwiperInstance) {
  activeSlideIndex.value = swiper.realIndex
}
</script>

<template>
  <section id="hero" class="hero" :aria-label="t('home.hero.label')">
    <div class="hero__backgrounds" aria-hidden="true">
      <div
        v-for="(slide, index) in slides"
        :key="`${slide.id}-background`"
        class="hero__background"
        :class="{ 'hero__background--active': index === activeSlideIndex }"
        :style="{ backgroundImage: `url(${slide.background})` }"
      />
    </div>

    <Swiper
      class="hero__swiper"
      :modules="swiperModules"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      effect="slide"
      :speed="1000"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :pagination="{ clickable: true }"
      :a11y="swiperA11y"
      :grab-cursor="true"
      @real-index-change="updateActiveSlide"
    >
      <SwiperSlide
        v-for="slide in slides"
        :key="slide.id"
        class="hero__slide"
      >
        <article class="hero__content container">
          <div class="hero__cover">
            <img
              :src="slide.cover"
              :alt="t('common.albumCover', { title: t(`home.hero.slides.${slide.id}.title`) })"
            >
          </div>

          <div class="hero__info">
            <img
              v-if="slide.titleImage"
              :src="slide.titleImage"
              :alt="t(`home.hero.slides.${slide.id}.title`)"
              class="hero__title-image"
            >
            <h1 v-else class="hero__title">{{ t(`home.hero.slides.${slide.id}.title`) }}</h1>
            <p v-if="slide.hasSubtitle" class="hero__subtitle">
              {{ t(`home.hero.slides.${slide.id}.subtitle`) }}
            </p>
            <p class="hero__description">{{ t(`home.hero.slides.${slide.id}.description`) }}</p>
            <a
              v-if="slide.external"
              :href="slide.link"
              class="hero__button"
              target="_blank"
              rel="noreferrer"
            >{{ t('common.listenOnNetease') }}</a>
            <NuxtLink
              v-else
              :to="localePath(slide.link)"
              class="hero__button"
            >{{ t('common.viewDetails') }}</NuxtLink>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 680px;
  overflow: hidden;
  background: #080808;
}

.hero__swiper,
.hero__slide {
  width: 100%;
  height: 100%;
}

.hero__swiper {
  position: relative;
  z-index: 1;
}

.hero__slide {
  position: relative;
  overflow: hidden;
}

.hero__backgrounds,
.hero__background,
.hero__background::before {
  position: absolute;
  inset: 0;
}

.hero__backgrounds {
  pointer-events: none;
}

.hero__background {
  background-position: center;
  background-size: cover;
  opacity: 0;
  transform: scale(1.015);
  transition: opacity 1s ease, transform 5s ease;
}

.hero__background--active {
  opacity: 1;
  transform: scale(1);
}

.hero__background::before {
  background: rgba(0, 0, 0, 0.5);
  content: "";
}

.hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  padding-top: 90px;
  align-items: center;
  justify-content: center;
  gap: clamp(36px, 5vw, 60px);
}

.hero__cover {
  width: clamp(320px, 34vw, 400px);
  aspect-ratio: 1;
  flex: 0 0 auto;
}

.hero__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero__info {
  width: min(100%, 500px);
  color: #fff;
  user-select: none;
}

.hero__title {
  margin: 0 0 20px;
  color: #fff;
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
}

.hero__title-image {
  width: auto;
  max-width: min(100%, 420px);
  height: 50px;
  margin-bottom: 30px;
  object-fit: contain;
  object-position: left center;
}

.hero__subtitle {
  margin: -10px 0 18px;
  color: #aaa;
  font-size: 14px;
}

.hero__description {
  margin: 0;
  font-size: 18px;
  line-height: 1.8;
}

.hero__button {
  display: inline-block;
  padding: 10px 27px;
  margin-top: 22px;
  border: 3px solid #fff;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.hero__button:hover,
.hero__button:focus-visible {
  background: #fff;
  color: #000;
}

.hero :deep(.swiper-pagination) {
  bottom: 28px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.hero :deep(.swiper-pagination-bullet) {
  width: 20px;
  height: 4px;
  margin: 0 !important;
  border-radius: 0;
  background: #fff;
  opacity: 0.5;
  transition: width 0.5s ease, opacity 0.3s ease;
}

.hero :deep(.swiper-pagination-bullet:hover),
.hero :deep(.swiper-pagination-bullet:focus-visible),
.hero :deep(.swiper-pagination-bullet-active) {
  width: 30px;
  opacity: 1;
}

@media (max-width: 991px) {
  .hero {
    min-height: 760px;
  }

  .hero__content {
    padding-top: 110px;
    padding-bottom: 70px;
    flex-direction: column;
    gap: 30px;
    text-align: center;
  }

  .hero__cover {
    width: min(48vh, 300px, 78vw);
  }

  .hero__info {
    width: min(100%, 620px);
  }

  .hero__title-image {
    max-width: min(100%, 360px);
    margin-right: auto;
    margin-bottom: 20px;
    margin-left: auto;
    object-position: center;
  }

  .hero__description {
    font-size: 16px;
    line-height: 1.7;
  }
}

@media (max-width: 575px) {
  .hero {
    min-height: 700px;
  }

  .hero__content {
    padding-top: 96px;
    gap: 24px;
  }

  .hero__cover {
    width: min(68vw, 270px);
  }

  .hero__title {
    margin-bottom: 12px;
    font-size: 2rem;
  }

  .hero__title-image {
    height: 40px;
    margin-bottom: 16px;
  }

  .hero__description {
    font-size: 14px;
  }

  .hero__button {
    padding: 8px 22px;
    margin-top: 16px;
    font-size: 14px;
  }
}
</style>
