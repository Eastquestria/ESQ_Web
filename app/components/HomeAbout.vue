<template>
  <section id="about" class="about-section">
    <div class="container">
      <header class="section-header">
        <h2 class="section-title">关于我们</h2>
        <p class="section-description">
          Eastquestria东方小马国，简称ESQ，是中国彩虹小马同人音乐社团<br>
          我们旨在为中国同人音乐创作者们提供最便利、最快速的音乐发行服务
        </p>
      </header>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 80px 0;
  overflow: hidden;
  background: #121212;
}

@media (max-width: 575px) {
  .about-section {
    padding: 64px 0;
  }

  .section-description br {
    display: none;
  }
}
</style>
