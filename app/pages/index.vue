<script setup lang="ts">
useSeoMeta({
  title: 'Eastquestria - 东方小马国',
  description: 'Eastquestria 东方小马国是中国彩虹小马同人音乐社团，致力于为同人音乐创作者提供音乐发行服务。',
  ogTitle: 'Eastquestria - 东方小马国',
  ogDescription: '中国彩虹小马同人音乐社团。',
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
