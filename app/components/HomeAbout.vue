<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      <header class="section-header">
        <h2 class="section-title">{{ t('home.about.title') }}</h2>
        <p class="section-description">
          {{ t('home.about.line1') }}<br>
          {{ t('home.about.line2') }}
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
