<script setup lang="ts">
const stats = [
  { value: 6, key: 'albums' },
  { value: 81, key: 'songs' },
  { value: 114, key: 'plays' },
  { value: 514, key: 'gods' },
]

const { t } = useI18n()
const sectionElement = ref<HTMLElement | null>(null)
const displayedValues = ref(stats.map(({ value }) => value))

let observer: IntersectionObserver | undefined
let animationFrame: number | undefined
let hasAnimated = false

function animateValues() {
  if (hasAnimated) {
    return
  }

  hasAnimated = true
  displayedValues.value = stats.map(() => 0)
  const startedAt = performance.now()
  const duration = 1000

  const update = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1)
    const easedProgress = 1 - (1 - progress) ** 3

    displayedValues.value = stats.map(({ value }) => Math.round(value * easedProgress))

    if (progress < 1) {
      animationFrame = window.requestAnimationFrame(update)
    }
  }

  animationFrame = window.requestAnimationFrame(update)
}

onMounted(() => {
  if (!sectionElement.value || !('IntersectionObserver' in window)) {
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      animateValues()
      observer?.disconnect()
    }
  }, { threshold: 0.25 })

  observer.observe(sectionElement.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()

  if (animationFrame !== undefined) {
    window.cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <section id="facts" ref="sectionElement" class="stats-section">
    <div class="container">
      <header class="section-header">
        <h2 class="section-title">{{ t('home.stats.title') }}</h2>
        <p class="section-description">{{ t('home.stats.description') }}</p>
      </header>

      <dl class="stats-section__grid">
        <div v-for="(stat, index) in stats" :key="stat.key" class="stats-section__item">
          <dt>{{ t(`home.stats.${stat.key}`) }}</dt>
          <dd>{{ displayedValues[index] }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: 80px 0 60px;
  overflow: hidden;
  background: #1a1a1a;
}

.stats-section__grid {
  display: grid;
  padding: 0;
  margin: 0;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stats-section__item {
  display: flex;
  padding: 0 12px;
  flex-direction: column-reverse;
  text-align: center;
}

.stats-section__item dt {
  margin: 0 0 20px;
  color: #e0e0e0;
  font-size: 14px;
}

.stats-section__item dd {
  margin: 0;
  color: #949494;
  font-size: 48px;
  font-variant-numeric: tabular-nums;
  line-height: 1.35;
}

@media (max-width: 767px) {
  .stats-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 20px;
  }
}

@media (max-width: 575px) {
  .stats-section {
    padding: 64px 0 44px;
  }
}
</style>
