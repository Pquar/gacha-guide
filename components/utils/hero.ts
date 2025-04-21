import heroesData from '~/json/hero.json' assert { type: 'json' }

// Define types
const heroIds = [...new Set(heroesData.map((hero) => hero.id))] as const

export type HeroNumberType = 'all' | (typeof heroIds)[number]


export const HERO_OPTIONS = [
  { value: 'all', label: 'All Heroes' },
  ...heroesData.map((hero) => ({
    value: hero.id,
    label: hero.name,
  })),
]