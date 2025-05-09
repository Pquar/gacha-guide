import { Description } from '@headlessui/react'

export const SITE_METADATA = {
  title: `Contendo sobre Gachas`,
  author: 'Pquar',
  headerTitle: `Gacha.clonm.com`,
  description:
    '"Welcome! Share top-tier builds, resource strategies, and conquer challenges together. Found an issue or have suggestions? Ping me on Discord: @pquar feedback keeps this site growing!"',
  language: 'en',
  headerLink: 'https://gacha.clonm.com/',
  heroesFeedUrl: 'https://gacha.clonm.com/',
  theme: 'system', // system, dark or light
  siteUrl: 'https://gacha.clonm.com',
  siteRepo: 'https://github.com/pquar/',
  siteTitle: 'Reals of Guide',
  CharBanner: {
    faction: 'adventure',
    name: 'Tomoe',
    title: 'Learner | Builder',
    Description:
      'dps character, with the ability to buff the team regardless of the faction, and area damage with defense break',
    faction_image: '/static/images/faction/adventure.webp',
    char_image: "/static/images/catalog/tomoe-850x750.png",
    imageAlt: 'Tomoe',
  },
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.jpeg`,
  email: 'pquar@hotmail.com',
  github: 'https://github.com/pquar',
  x: 'https://x.com/fkquar',
  youtube: 'https://www.youtube.com/@pquar',
  locale: 'pt-BR',
  stickyNav: true,
  comments: {
    giscusConfigs: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO!,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID!,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY!,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!,
      mapping: 'title', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
  support: {
    buyMeACoffee: 'https://www.buymeacoffee.com/leohuynh.dev',
    paypal: 'https://paypal.me/hta218?country.x=VN&locale.x=en_US',
    kofi: 'https://ko-fi.com/hta218',
  },
}
