<script setup lang="ts">
const isScrolled = ref(false)
const isMenuOpen = ref(false)
const isLinksOpen = ref(false)
const isPageReady = ref(false)
const route = useRoute()

const isHomeRoute = computed(() => route.path === '/')
const isAlbumRoute = computed(() => route.path === '/album' || route.path.startsWith('/album/'))
const isAlbumIndexRoute = computed(() => route.path === '/album' || route.path === '/album/')
const hasSolidHeader = computed(() => isScrolled.value || isAlbumIndexRoute.value)

const scrollingText = Array.from(
  { length: 12 },
  () => 'Eastquestria · 東方小馬國 ·',
).join(' ')

let readyTimer: number | undefined

function updateScrollState() {
  isScrolled.value = window.scrollY > 100
}

function closeNavigation() {
  isMenuOpen.value = false
  isLinksOpen.value = false
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  closeNavigation()
}

watch(() => route.fullPath, closeNavigation)

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  readyTimer = window.setTimeout(() => {
    isPageReady.value = true
  }, 500)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)

  if (readyTimer) {
    window.clearTimeout(readyTimer)
  }
})
</script>

<template>
  <Transition name="loader-fade">
    <div
      v-if="!isPageReady"
      class="page-loader"
      role="status"
      aria-label="页面加载中"
    >
      <img src="/assets/img/favicon.png" alt="" class="page-loader__mark">
    </div>
  </Transition>

  <header
    id="header"
    class="site-header"
    :class="{
      'site-header--solid': hasSolidHeader,
      'site-header--scrolled': isScrolled,
    }"
  >
    <div class="container site-header__inner">
      <NuxtLink to="/" class="site-logo" aria-label="Eastquestria 首页" @click="closeNavigation">
        <img src="/assets/img/favicon.png" alt="" width="40" height="40">
      </NuxtLink>

      <nav
        id="site-navigation"
        class="site-navigation"
        :class="{ 'site-navigation--open': isMenuOpen }"
        aria-label="主导航"
      >
        <ul class="site-navigation__list">
          <li>
            <NuxtLink
              to="/#hero"
              class="site-navigation__link"
              :class="{ 'is-active': isHomeRoute }"
              @click="closeNavigation"
            >主页</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/album"
              class="site-navigation__link"
              :class="{ 'is-active': isAlbumRoute }"
              @click="closeNavigation"
            >专辑</NuxtLink>
          </li>
          <li class="site-navigation__dropdown" :class="{ 'is-open': isLinksOpen }">
            <button
              type="button"
              class="site-navigation__link site-navigation__dropdown-trigger"
              :aria-expanded="isLinksOpen"
              @click="isLinksOpen = !isLinksOpen"
            >
              其他链接
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m3.5 6 4.5 4 4.5-4" />
              </svg>
            </button>
            <ul class="site-navigation__dropdown-menu">
              <li><a href="https://space.bilibili.com/1625041793" target="_blank" rel="noreferrer">B站</a></li>
              <li><a href="https://music.163.com/#/artist?id=53643668" target="_blank" rel="noreferrer">网易云</a></li>
              <li><a href="https://eqmemory.cn/author/2334" target="_blank" rel="noreferrer">马国记忆</a></li>
              <li><a href="https://qm.qq.com/q/6EmhGWXtg6" target="_blank" rel="noreferrer">加入 QQ 群聊</a></li>
            </ul>
          </li>
          <li>
            <a class="site-navigation__link" href="/english" @click="closeNavigation"><strong>EN</strong></a>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        class="menu-toggle"
        :class="{ 'menu-toggle--open': isMenuOpen }"
        :aria-expanded="isMenuOpen"
        aria-controls="site-navigation"
        aria-label="切换导航菜单"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  </header>

  <slot />

  <footer id="footer" class="site-footer">
    <div class="site-footer__marquee" aria-hidden="true">
      <div class="site-footer__marquee-text">{{ scrollingText }}</div>
    </div>

    <div class="container site-footer__content">
      <img
        src="/assets/img/favicon.png"
        class="site-footer__logo"
        alt="Eastquestria"
        width="40"
        height="40"
      >
      <p class="site-footer__label">友情外链</p>
      <p class="site-footer__links">
        <a href="https://eqmemory.cn/" target="_blank" rel="noreferrer">马国记忆</a>
        <span aria-hidden="true"> - </span>
        <a href="https://voltexpixel.com/" target="_blank" rel="noreferrer">Voltex Pixel</a>
        <span aria-hidden="true"> - </span>
        <a href="https://www.equestriacn.com/" target="_blank" rel="noreferrer">小马中国</a>
        <span aria-hidden="true"> - </span>
        <a href="https://mlp.puudding.top/" target="_blank" rel="noreferrer">Pudding</a>
      </p>
      <a
        class="site-footer__copyright"
        href="https://github.com/Eastquestria/ESQ_Web/"
        target="_blank"
        rel="noreferrer"
      >© Copyright Eastquestria</a>
    </div>
  </footer>

  <button
    type="button"
    class="back-to-top"
    :class="{ 'back-to-top--visible': isScrolled }"
    aria-label="返回顶部"
    @click="scrollToTop"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 15 6-6 6 6" />
    </svg>
  </button>
</template>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: #121212;
}

.page-loader__mark {
  width: 60px;
  height: 60px;
  object-fit: contain;
  opacity: 0.2;
}

.loader-fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.loader-fade-leave-to {
  opacity: 0;
}

.site-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 997;
  height: var(--header-height);
  background: transparent;
  transition: height 0.5s ease, background-color 0.5s ease, backdrop-filter 0.5s ease;
}

.site-header--solid {
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
}

.site-header--scrolled {
  height: 70px;
}

.site-header__inner {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.site-logo {
  display: inline-flex;
  flex: 0 0 auto;
}

.site-logo img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.site-navigation__list,
.site-navigation__dropdown-menu {
  padding: 0;
  margin: 0;
  list-style: none;
}

.site-navigation__list {
  display: flex;
  align-items: center;
}

.site-navigation__list > li {
  position: relative;
  padding: 10px 0 10px 24px;
  white-space: nowrap;
}

.site-navigation__link {
  position: relative;
  display: flex;
  padding: 0 4px;
  border: 0;
  align-items: center;
  gap: 6px;
  background: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0.4px;
  line-height: 1.5;
  text-transform: uppercase;
}

.site-navigation__link::before {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  content: "";
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.site-navigation__link:hover::before,
.site-navigation__link:focus-visible::before,
.site-navigation__link.is-active::before {
  transform: scaleX(1);
}

.site-navigation__dropdown-trigger svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.75;
  transition: transform 0.25s ease;
}

.site-navigation__dropdown-menu {
  position: absolute;
  top: calc(100% + 30px);
  left: 24px;
  z-index: 99;
  min-width: 200px;
  padding: 10px 0;
  background: #1e1e1e;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
  transition: top 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
}

.site-navigation__dropdown-menu a {
  display: block;
  padding: 10px 20px;
  color: #e0e0e0;
  font-size: 14px;
}

.site-navigation__dropdown-menu a:hover,
.site-navigation__dropdown-menu a:focus-visible {
  color: #fff;
  background: #2c2c2c;
}

.site-navigation__dropdown:hover .site-navigation__dropdown-menu,
.site-navigation__dropdown:focus-within .site-navigation__dropdown-menu,
.site-navigation__dropdown.is-open .site-navigation__dropdown-menu {
  top: 100%;
  opacity: 1;
  visibility: visible;
}

.site-navigation__dropdown.is-open .site-navigation__dropdown-trigger svg {
  transform: rotate(180deg);
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  padding: 8px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  margin: 5px 0;
  background: #fff;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.menu-toggle--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle--open span:nth-child(2) {
  opacity: 0;
}

.menu-toggle--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.site-footer {
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding: 30px 0;
  background: #161616;
  color: #fff;
  font-size: 14px;
}

.site-footer__marquee {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  height: 120px;
  overflow: hidden;
}

.site-footer__marquee-text {
  position: absolute;
  bottom: 30px;
  width: max-content;
  color: rgba(255, 255, 255, 0.03);
  font-size: 120px;
  font-weight: 900;
  line-height: 0;
  white-space: nowrap;
  user-select: none;
  animation: footer-marquee 600s linear infinite;
}

.site-footer__content {
  text-align: center;
}

.site-footer__logo {
  width: 40px;
  height: 40px;
  margin: 0 auto 15px;
  object-fit: contain;
  opacity: 0.5;
}

.site-footer__label,
.site-footer__links {
  margin: 0;
}

.site-footer__label {
  color: #7e7e7e;
  font-weight: 700;
}

.site-footer__links {
  padding-top: 4px;
}

.site-footer__copyright {
  display: inline-block;
  margin-top: 18px;
  font-weight: 700;
}

.back-to-top {
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 996;
  display: grid;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  place-items: center;
  background: #535353;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: background-color 0.3s ease, opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
}

.back-to-top:hover,
.back-to-top:focus-visible {
  background: #b6b6b6;
}

.back-to-top--visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top svg {
  width: 28px;
  height: 28px;
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

@keyframes footer-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-90%);
  }
}

@media (max-width: 991px) {
  .menu-toggle {
    position: relative;
    z-index: 1001;
    display: block;
  }

  .site-navigation {
    position: fixed;
    inset: 0;
    z-index: 999;
    padding: 55px 15px 15px;
    background: rgba(0, 0, 0, 0.9);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .site-navigation--open {
    opacity: 1;
    visibility: visible;
  }

  .site-navigation__list {
    display: block;
    height: 100%;
    padding: 10px 0;
    overflow-y: auto;
    background: #1e1e1e;
  }

  .site-navigation__list > li {
    padding: 0;
  }

  .site-navigation__link {
    width: 100%;
    padding: 12px 20px;
    color: #e0e0e0;
    font-size: 15px;
    text-align: left;
  }

  .site-navigation__link::before {
    display: none;
  }

  .site-navigation__dropdown-trigger {
    justify-content: space-between;
  }

  .site-navigation__dropdown-menu {
    position: static;
    display: none;
    min-width: 0;
    margin: 8px 20px 12px;
    background: #2c2c2c;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
  }

  .site-navigation__dropdown:hover .site-navigation__dropdown-menu,
  .site-navigation__dropdown:focus-within .site-navigation__dropdown-menu {
    display: none;
  }

  .site-navigation__dropdown.is-open .site-navigation__dropdown-menu {
    display: block;
  }
}

@media (max-width: 768px) {
  .site-footer__marquee {
    display: none;
  }
}
</style>
