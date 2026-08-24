<template>
  <section id="sub_background" class="songs-section">
    <div class="container">
      <header class="section-header">
        <h2 class="songs-section__title">歌曲</h2>
        <p class="songs-section__description">我们发行的部分歌曲</p>
      </header>

      <div class="songs-section__player-shell">
        <AlbumPlayer
          source-url="https://api.eqad.fun/ncm/playlist/13980548342"
          show-lyrics
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.songs-section {
  padding: 80px 0;
  overflow: hidden;
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("/assets/img/sub_background.jpg") fixed center / cover;
}

.songs-section__title {
  margin: 0 0 20px;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
}

.songs-section__description {
  margin: 0 0 30px;
  color: #fff;
}

.songs-section__player-shell {
  width: min(100%, 650px);
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .songs-section {
    background-attachment: scroll;
  }
}

@media (max-width: 575px) {
  .songs-section {
    padding: 64px 0;
  }
}
</style>
