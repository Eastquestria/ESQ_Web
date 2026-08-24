<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.homeTitle'),
  description: () => t('seo.homeDescription'),
  ogTitle: () => t('seo.homeTitle'),
  ogDescription: () => t('seo.homeOgDescription'),
  ogImage: '/assets/img/album/album-5-bg.png',
})
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <main id="main">
      <HomeAbout />
      <HomeSongs />
      <HomeTeam />
      <HomeStats />
    </main>
  </div>
</template>
