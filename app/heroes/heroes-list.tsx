'use client'

import { useSearchParams } from 'next/navigation'
import { HeroesCard } from '~/components/cards/hero'
import type { Heroes } from '~/types/data'
import { FACTION, FactionSelect, type FactionType } from './faction-select'
import { HeroSelect } from './hero-select'
import { type HeroNumberType } from '~/components/utils/hero'

interface HeroListProps {
  heroes: Heroes[]
}

export function HeroesList({ heroes }: HeroListProps) {
  const searchParams = useSearchParams()
  const faction = (searchParams.get('faction') as FactionType) || 'all'
  const heroNumber = (searchParams.get('heroNumber') as HeroNumberType) || '1'

  // Get current faction label
  const { label } = FACTION.find(({ value }) => value === faction) || FACTION[0]

  // Filter heroes based on selected faction
  const filteredHeroes =
    faction === 'all' ? heroes : heroes.filter((hero) => hero.faction.includes(faction))

  // Further filter by hero number if needed
  const displayHeroes = filteredHeroes.filter(
    (hero) => heroNumber === 'all' || hero.id === heroNumber
  )

  return (
    <div className="py-5 md:py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="text-xl font-bold leading-9 tracking-tight md:text-2xl">
          <span className="mr-1 capitalize">{label}</span>
          <span className="font-normal">({displayHeroes.length})</span>
        </span>
        <div className="flex items-center gap-2 md:gap-2">
          <span>Hero: </span>
          <HeroSelect heroNumber={heroNumber} />
          <span>Faction: </span>
          <FactionSelect faction={faction} />
        </div>
      </div>
      {displayHeroes.length > 0 ? (
        <div className="space-y-10">
          {displayHeroes.map((hero) => (
            <HeroesCard key={hero.hero_id} hero={hero} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No heroes found for the selected filters
          </p>
        </div>
      )}
    </div>
  )
}
