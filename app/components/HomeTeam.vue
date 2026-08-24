<script setup lang="ts">
const { t } = useI18n()

const members = [
  {
    id: 'jrtos',
    image: '/assets/img/team/Jrtos.jpg',
  },
  {
    id: 'cory',
    image: '/assets/img/team/Cory.jpg',
  },
  {
    id: 'kirin',
    image: '/assets/img/team/麒麟.jpg',
  },
  {
    id: 'fengqi',
    image: '/assets/img/team/凤奇宇洛.jpg',
  },
]
</script>

<template>
  <section id="team" class="team-section">
    <div class="container">
      <header class="section-header">
        <h2 class="section-title">{{ t('home.team.title') }}</h2>
        <p class="section-description">{{ t('home.team.description') }}</p>
      </header>

      <div class="team-section__grid">
        <article v-for="member in members" :key="member.id" class="team-member">
          <div class="team-member__portrait">
            <img
              :src="member.image"
              :alt="t(`home.team.members.${member.id}.name`)"
              width="260"
              height="260"
              loading="lazy"
            >
          </div>
          <h3>{{ t(`home.team.members.${member.id}.name`) }}</h3>
          <p>{{ t(`home.team.members.${member.id}.role`) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 80px 0 60px;
  overflow: hidden;
  background: #121212;
}

.team-section__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.team-member {
  min-width: 0;
  margin-bottom: 20px;
  text-align: center;
}

.team-member__portrait {
  aspect-ratio: 1;
  margin-bottom: 15px;
  overflow: hidden;
  background: #1a1a1a;
}

.team-member__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-member:hover .team-member__portrait img {
  transform: scale(1.03);
}

.team-member h3 {
  margin: 0 0 2px;
  color: #e0e0e0;
  font-size: 18px;
  font-weight: 700;
}

.team-member p {
  margin: 0;
  color: #e0e0e0;
  font-size: 13px;
  font-style: italic;
}

@media (max-width: 991px) {
  .team-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 575px) {
  .team-section {
    padding: 64px 0 44px;
  }

  .team-section__grid {
    grid-template-columns: 1fr;
  }

  .team-member {
    width: min(100%, 320px);
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
