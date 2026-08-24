export type AlbumCategory = 'regular' | 'special'

export interface Album {
  slug: string
  title: string
  listTitle: string
  description: string
  category: AlbumCategory
  cover: string
  background: string
  titleImage?: string
  releasedAt: string
  submissions: number
  neteaseAlbumId: string
  memoryUrl: string
  downloadUrl: string
}

export const albums: readonly Album[] = [
  {
    slug: 'album-5',
    title: 'Eastquestria Vol.4 Caprice',
    listTitle: 'Special - Eastquestria Vol.4 Caprice',
    description: '齐聚元旦，团圆东方小马国！我们于2026年的元旦发行了由15位创作者参与的15支原创小马同人音乐作品！',
    category: 'special',
    cover: '/assets/img/album/album-5.jpg',
    background: '/assets/img/album/album-5-bg.png',
    titleImage: '/assets/img/album/album-5-title.png',
    releasedAt: '2026/1/1',
    submissions: 15,
    neteaseAlbumId: '356829569',
    memoryUrl: 'https://eqmemory.cn/71214.html',
    downloadUrl: 'https://mlp.puudding.top/G4/%E5%90%8C%E4%BA%BA%E6%AD%8C%E6%9B%B2/Eastquestria/Vol.4%20Caprice',
  },
  {
    slug: 'album-tb-3',
    title: '辐射小马国',
    listTitle: 'Special - Fallout equestria',
    description: '辐射小马国特别专辑',
    category: 'special',
    cover: '/assets/img/album/album-tb-3.jpg',
    background: '/assets/img/album/album-tb-3-bg.png',
    titleImage: '/assets/img/album/album-tb-3-title.png',
    releasedAt: '2025/02/04',
    submissions: 9,
    neteaseAlbumId: '261854732',
    memoryUrl: 'https://eqmemory.cn/68883.html',
    downloadUrl: 'https://mlp.puudding.top/G4/%E5%90%8C%E4%BA%BA%E6%AD%8C%E6%9B%B2/Eastquestria/[Special]%20%E8%BE%90%E5%B0%84%E5%B0%8F%E9%A9%AC%E5%9B%BD',
  },
  {
    slug: 'album-tb-2',
    title: 'FPR 001',
    listTitle: 'Special - FPR 001',
    description: 'For Pony Raver “FPR”是由MKAO Ind.，Rinne，NSXWAVE，Chess Singularity等一众小马音乐人发起的小马同人电子舞曲企划',
    category: 'special',
    cover: '/assets/img/album/album-tb-2.jpg',
    background: '/assets/img/album/album-tb-2-bg.png',
    releasedAt: '2024/10/05',
    submissions: 6,
    neteaseAlbumId: '249875372',
    memoryUrl: 'https://eqmemory.cn/68684.html',
    downloadUrl: 'https://mlp.puudding.top/G4/%E5%90%8C%E4%BA%BA%E6%AD%8C%E6%9B%B2/Eastquestria/[Special]%20FPR001',
  },
  {
    slug: 'album-4',
    title: 'Eastquestria Vol.3 Rhapsody',
    listTitle: 'Eastquestria Vol.3 Rhapsody',
    description: '国内首个综合性小马同人音乐厂牌的第三张专辑',
    category: 'regular',
    cover: '/assets/img/album/album-4.jpg',
    background: '/assets/img/album/album-4-bg.png',
    titleImage: '/assets/img/album/album-4-title.png',
    releasedAt: '2024/03/01',
    submissions: 19,
    neteaseAlbumId: '187450612',
    memoryUrl: 'https://eqmemory.cn/68657.html',
    downloadUrl: 'https://mlp.puudding.top/G4/%E5%90%8C%E4%BA%BA%E6%AD%8C%E6%9B%B2/Eastquestria/Vol.3%20Rhapsody',
  },
  {
    slug: 'album-tb-1',
    title: 'Snowdrop(落雪)',
    listTitle: 'Special - Snowdrop',
    description: '中国小马音乐厂牌Eastquestria发布的小马落雪专项专辑',
    category: 'special',
    cover: '/assets/img/album/album-tb-1.jpg',
    background: '/assets/img/album/album-tb-1-bg.png',
    titleImage: '/assets/img/album/album-tb-1-title.png',
    releasedAt: '2023/06/22',
    submissions: 8,
    neteaseAlbumId: '167964145',
    memoryUrl: 'https://eqmemory.cn/68649.html',
    downloadUrl: 'https://mlp.puudding.top/G4/%E5%90%8C%E4%BA%BA%E6%AD%8C%E6%9B%B2/Eastquestria/[Special]%20Snowdrop',
  },
  {
    slug: 'album-3',
    title: 'Eastquestria Vol.2 Legato',
    listTitle: 'Eastquestria Vol.2 Legato',
    description: '国内首个综合性小马同人音乐厂牌的第二张专辑',
    category: 'regular',
    cover: '/assets/img/album/album-3.jpg',
    background: '/assets/img/album/album-3-bg.png',
    titleImage: '/assets/img/album/album-3-title.png',
    releasedAt: '2023/02/13',
    submissions: 11,
    neteaseAlbumId: '159349327',
    memoryUrl: 'https://eqmemory.cn/68629.html',
    downloadUrl: 'https://mlp.puudding.top/G4/%E5%90%8C%E4%BA%BA%E6%AD%8C%E6%9B%B2/Eastquestria/Vol.2%20Legato',
  },
  {
    slug: 'album-2',
    title: 'Eastquestria Vol.1 Prelude Disc B',
    listTitle: 'Eastquestria Vol.1 Prelude Disc B',
    description: '国内首个综合性小马同人音乐专辑',
    category: 'regular',
    cover: '/assets/img/album/album-2.jpg',
    background: '/assets/img/album/album-2-bg.png',
    titleImage: '/assets/img/album/album-1~2-title.png',
    releasedAt: '2022/09/10',
    submissions: 18,
    neteaseAlbumId: '151306699',
    memoryUrl: 'https://eqmemory.cn/68613.html',
    downloadUrl: 'https://mlp.puudding.top/G4/%E5%90%8C%E4%BA%BA%E6%AD%8C%E6%9B%B2/Eastquestria/Vol.1%20Prelude%20Disc%20B',
  },
  {
    slug: 'album-1',
    title: 'Eastquestria Vol.1 Prelude Disc A',
    listTitle: 'Eastquestria Vol.1 Prelude Disc A',
    description: '国内首个综合性小马同人音乐专辑',
    category: 'regular',
    cover: '/assets/img/album/album-1.jpg',
    background: '/assets/img/album/album-1-bg.png',
    titleImage: '/assets/img/album/album-1~2-title.png',
    releasedAt: '2022/08/14',
    submissions: 19,
    neteaseAlbumId: '149670092',
    memoryUrl: 'https://eqmemory.cn/68592.html',
    downloadUrl: 'https://mlp.puudding.top/G4/%E5%90%8C%E4%BA%BA%E6%AD%8C%E6%9B%B2/Eastquestria/Vol.1%20Prelude%20Disc%20A',
  },
]

export function getAlbumBySlug(slug: string) {
  return albums.find(album => album.slug === slug)
}
