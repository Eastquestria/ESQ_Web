<script setup lang="ts">
interface HeroSlide {
  title: string
  subtitle?: string
  description: string
  background: string
  cover: string
  titleImage?: string
  link: string
  linkLabel: string
  external?: boolean
}

const slides: HeroSlide[] = [
  {
    title: '东方小马国 Vol.4 随想曲',
    description: '齐聚元旦，团圆东方小马国！我们于2026年的元旦发行了由15位创作者参与的15支原创小马同人音乐作品！',
    background: '/assets/img/album/album-5-bg.png',
    cover: '/assets/img/album/album-5.jpg',
    titleImage: '/assets/img/album/album-5-title.png',
    link: '/album/album-5.html',
    linkLabel: '查看详情',
  },
  {
    title: '10kmoonz',
    subtitle: '独立于 Vol.4 Caprice 随想曲',
    description: '本专辑为MKAO Ind.为大家带来的先锋专辑"10kmoonz"，采用Hyperpop高能流行风格，为听众带来高能体验，就好比一万个月亮！',
    background: '/assets/img/album/indie/1-bg.webp',
    cover: '/assets/img/album/indie/1.webp',
    link: 'https://music.163.com/#/album/355427546',
    linkLabel: '在网易云收听',
    external: true,
  },
  {
    title: '众生为爱而生',
    subtitle: '独立于 Vol.4 Caprice 随想曲',
    description: '本专辑为安亓然啊为大家带来的先锋专辑《众生为爱而生》，一曲嘻哈说唱讲述了多个角色交织之时这故事的展开。由衷感谢forgeey的图画。',
    background: '/assets/img/album/indie/2-bg.webp',
    cover: '/assets/img/album/indie/2.webp',
    link: 'https://music.163.com/#/album/355430585',
    linkLabel: '在网易云收听',
    external: true,
  },
  {
    title: '落雪',
    description: '中国小马音乐厂牌Eastquestria发布的小马落雪专项专辑',
    background: '/assets/img/album/album-tb-1-bg.png',
    cover: '/assets/img/album/album-tb-1.jpg',
    titleImage: '/assets/img/album/album-tb-1-title.png',
    link: '/album/album-tb-1.html',
    linkLabel: '查看详情',
  },
  {
    title: '东方小马国 Vol.3',
    description: '国内首个综合性小马同人音乐厂牌的第三张专辑',
    background: '/assets/img/album/album-4-bg.png',
    cover: '/assets/img/album/album-4.jpg',
    titleImage: '/assets/img/album/album-4-title.png',
    link: '/album/album-4.html',
    linkLabel: '查看详情',
  },
]

const currentSlide = ref(0)
const selectedSlide = computed(() => slides[currentSlide.value]!)
let autoplayTimer: number | undefined

function stopAutoplay() {
  if (autoplayTimer) {
    window.clearInterval(autoplayTimer)
    autoplayTimer = undefined
  }
}

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
}

function selectSlide(index: number) {
  currentSlide.value = index
  startAutoplay()
}

onMounted(startAutoplay)
onBeforeUnmount(stopAutoplay)
</script>

<template>
  <section
    id="hero"
    class="hero"
    aria-label="精选专辑"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @focusin="stopAutoplay"
    @focusout="startAutoplay"
  >
    <div class="hero__backgrounds" aria-hidden="true">
      <div
        v-for="(slide, index) in slides"
        :key="slide.background"
        class="hero__background"
        :class="{ 'hero__background--active': index === currentSlide }"
        :style="{ backgroundImage: `url(${slide.background})` }"
      />
    </div>

    <Transition name="hero-content" mode="out-in">
      <article :key="currentSlide" class="hero__content container">
        <div class="hero__cover">
          <img :src="selectedSlide.cover" :alt="`${selectedSlide.title}专辑封面`">
        </div>

        <div class="hero__info">
          <img
            v-if="selectedSlide.titleImage"
            :src="selectedSlide.titleImage"
            :alt="selectedSlide.title"
            class="hero__title-image"
          >
          <h1 v-else class="hero__title">{{ selectedSlide.title }}</h1>
          <p v-if="selectedSlide.subtitle" class="hero__subtitle">{{ selectedSlide.subtitle }}</p>
          <p class="hero__description">{{ selectedSlide.description }}</p>
          <a
            :href="selectedSlide.link"
            class="hero__button"
            :target="selectedSlide.external ? '_blank' : undefined"
            :rel="selectedSlide.external ? 'noreferrer' : undefined"
          >{{ selectedSlide.linkLabel }}</a>
        </div>
      </article>
    </Transition>

    <div class="hero__pagination" aria-label="选择精选专辑">
      <button
        v-for="(slide, index) in slides"
        :key="slide.title"
        type="button"
        class="hero__pagination-button"
        :class="{ 'hero__pagination-button--active': index === currentSlide }"
        :aria-current="index === currentSlide ? 'true' : undefined"
        :aria-label="`显示第 ${index + 1} 张专辑：${slide.title}`"
        @click="selectSlide(index)"
      />
    </div>
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

.hero__backgrounds,
.hero__background,
.hero__background::before {
  position: absolute;
  inset: 0;
}

.hero__background {
  background-position: center;
  background-size: cover;
  opacity: 0;
  transform: scale(1.015);
  transition: opacity 1s ease, transform 5s ease;
}

.hero__background::before {
  background: rgba(0, 0, 0, 0.5);
  content: "";
}

.hero__background--active {
  opacity: 1;
  transform: scale(1);
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

.hero__pagination {
  position: absolute;
  right: 0;
  bottom: 28px;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.hero__pagination-button {
  width: 20px;
  height: 4px;
  padding: 0;
  border: 0;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: width 0.5s ease, background-color 0.3s ease;
}

.hero__pagination-button:hover,
.hero__pagination-button:focus-visible,
.hero__pagination-button--active {
  width: 30px;
  background: #fff;
}

.hero-content-enter-active,
.hero-content-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.hero-content-enter-from {
  opacity: 0;
  transform: translateX(18px);
}

.hero-content-leave-to {
  opacity: 0;
  transform: translateX(-18px);
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
