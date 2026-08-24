<script setup lang="ts">
interface PlaylistSong {
  title: string
  author: string
  url: string
  pic: string
  lrc?: string
}

interface APlayerList {
  clear: () => void
  add: (song: {
    name: string
    artist: string
    url: string
    cover: string
    lrc?: string
  }) => void
}

interface APlayerInstance {
  list: APlayerList
  destroy?: () => void
}

interface APlayerOptions {
  container: HTMLElement
  showlrc: boolean
  lrcType: number
  audio: never[]
}

type APlayerConstructor = new (options: APlayerOptions) => APlayerInstance
type WindowWithAPlayer = Window & { APlayer?: APlayerConstructor }

const props = withDefaults(defineProps<{
  sourceUrl: string
  cover?: string
  showLyrics?: boolean
}>(), {
  showLyrics: false,
})

const { t } = useI18n()

useHead({
  link: [
    { rel: 'stylesheet', href: '/vendor/aplayer/APlayer.min.css' },
  ],
})

const playerContainer = ref<HTMLElement | null>(null)
const playerStatus = ref<'loading' | 'error' | null>('loading')
const hasError = ref(false)

let player: APlayerInstance | undefined
let requestController: AbortController | undefined

function isPlaylistSong(value: unknown): value is PlaylistSong {
  if (!value || typeof value !== 'object') {
    return false
  }

  const song = value as Partial<PlaylistSong>
  return typeof song.title === 'string'
    && typeof song.author === 'string'
    && typeof song.url === 'string'
    && typeof song.pic === 'string'
}

function loadAPlayer(): Promise<APlayerConstructor> {
  const browserWindow = window as WindowWithAPlayer

  if (browserWindow.APlayer) {
    return Promise.resolve(browserWindow.APlayer)
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-esq-aplayer]')
    const script = existingScript ?? document.createElement('script')

    const handleLoad = () => {
      if (browserWindow.APlayer) {
        resolve(browserWindow.APlayer)
      } else {
        reject(new Error('APlayer loaded without exposing its constructor.'))
      }
    }

    const handleError = () => reject(new Error('Unable to load APlayer.'))

    script.addEventListener('load', handleLoad, { once: true })
    script.addEventListener('error', handleError, { once: true })

    if (!existingScript) {
      script.src = '/vendor/aplayer/APlayer.min.js'
      script.dataset.esqAplayer = 'true'
      script.defer = true
      document.head.append(script)
    }
  })
}

onMounted(async () => {
  requestController = new AbortController()

  try {
    const APlayer = await loadAPlayer()

    if (!playerContainer.value) {
      return
    }

    player = new APlayer({
      container: playerContainer.value,
      showlrc: props.showLyrics,
      lrcType: props.showLyrics ? 3 : 0,
      audio: [],
    })

    const response = await fetch(props.sourceUrl, {
      signal: requestController.signal,
    })

    if (!response.ok) {
      throw new Error(`Playlist request failed with status ${response.status}.`)
    }

    const payload: unknown = await response.json()
    const songs = Array.isArray(payload) ? payload.filter(isPlaylistSong) : []

    if (songs.length === 0) {
      throw new Error('The playlist did not contain any playable songs.')
    }

    player.list.clear()
    songs.forEach((song) => {
      player?.list.add({
        name: song.title,
        artist: song.author,
        url: song.url,
        cover: props.cover ?? song.pic,
        lrc: props.showLyrics ? song.lrc : undefined,
      })
    })

    playerStatus.value = null
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return
    }

    hasError.value = true
    playerStatus.value = 'error'
    console.error(error)
  }
})

onBeforeUnmount(() => {
  requestController?.abort()
  player?.destroy?.()
})
</script>

<template>
  <div class="album-player">
    <div ref="playerContainer" class="album-player__mount" />
    <p
      v-if="playerStatus"
      class="album-player__status"
      :class="{ 'album-player__status--error': hasError }"
      aria-live="polite"
    >{{ t(`player.${playerStatus}`) }}</p>
  </div>
</template>

<style scoped>
.album-player {
  width: 100%;
  min-height: 90px;
}

.album-player__status {
  display: grid;
  min-height: 90px;
  padding: 20px;
  margin: 0;
  border: 1px solid #333;
  border-radius: 10px;
  place-items: center;
  background: #1e1e1e;
  color: #aaa;
  text-align: center;
}

.album-player__status--error {
  color: #ddd;
}

:deep(.aplayer) {
  width: 100%;
  margin: 0;
  border: 1px solid #333 !important;
  border-radius: 10px !important;
  background: #1e1e1e !important;
  box-shadow: none !important;
  color: #e0e0e0;
}

:deep(.aplayer.aplayer-withlist .aplayer-info),
:deep(.aplayer.aplayer-fixed .aplayer-info) {
  border-color: #333 !important;
}

:deep(.aplayer .aplayer-pic) {
  border-radius: 10px 0 0 10px !important;
}

:deep(.aplayer .aplayer-title),
:deep(.aplayer .aplayer-list-title) {
  color: #e0e0e0 !important;
}

:deep(.aplayer .aplayer-author),
:deep(.aplayer .aplayer-time),
:deep(.aplayer .aplayer-list-author),
:deep(.aplayer .aplayer-list-index) {
  color: #aaa !important;
}

:deep(.aplayer .aplayer-bar),
:deep(.aplayer .aplayer-volume-bar) {
  background: #333 !important;
}

:deep(.aplayer .aplayer-loaded) {
  background: #555 !important;
}

:deep(.aplayer .aplayer-list ol li) {
  border-color: #333 !important;
}

:deep(.aplayer .aplayer-list ol li:hover),
:deep(.aplayer .aplayer-list ol li.aplayer-list-light) {
  background: #2c2c2c !important;
}

:deep(.aplayer .aplayer-lrc p) {
  color: #aaa !important;
}

:deep(.aplayer .aplayer-lrc p.aplayer-lrc-current) {
  color: #e0e0e0 !important;
}
</style>
