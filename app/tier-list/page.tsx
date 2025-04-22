import { Suspense } from 'react'
import { genPageMetadata } from '~/app/seo'
import { Container } from '~/components/ui/container'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { PageHeader } from '~/components/ui/page-header'
import Image from 'next/image'
import type { Heroes } from '~/types/data'
import clsx from 'clsx'
import heroesData from '~/json/hero.json' assert { type: 'json' }


export let metadata = genPageMetadata({ title: 'Heroes' })

export type TierType = 'all' | 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C'

const TierList = ({ heroes }: { heroes: Heroes[] }) => {
  // Group heroes by tier
  const tierGroups: Record<TierType, Heroes[]> = {
    'all': [],
    'SSS': [],
    'SS': [],
    'S': [],
    'A': [],
    'B': [],
    'C': []
  }

  heroes.forEach(hero => {
    if (hero.tier && tierGroups[hero.tier as TierType]) {
      tierGroups[hero.tier as TierType].push(hero)
    }
  })

  Object.keys(tierGroups).forEach(tier => {
    tierGroups[tier as TierType].sort((a, b) => (b.rating || 0) - (a.rating || 0))
  })

  const displayTiers = (Object.keys(tierGroups) as TierType[]).filter(tier => tier !== 'all' && tierGroups[tier].length > 0)

  return (
    <div className="mt-8 overflow-x-auto">
      <div className="min-w-[800px]">
        {displayTiers.map(tier => (
          <div key={tier} className="mb-8">
            <h3 className="mb-4 text-2xl font-bold">
              <span className={clsx(
                'px-3 py-1 rounded-md',
                {
                  'bg-purple-600 text-white': tier === 'SSS',
                  'bg-red-500 text-white': tier === 'SS',
                  'bg-orange-500 text-white': tier === 'S',
                  'bg-blue-500 text-white': tier === 'A',
                  'bg-green-500 text-white': tier === 'B',
                  'bg-gray-500 text-white': tier === 'C',
                }
              )}>
                {tier}
              </span>
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({tierGroups[tier].length} heroes)
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {tierGroups[tier].map(hero => (
                <div key={hero.id} className="flex items-center space-x-4 rounded-lg border p-3 dark:border-gray-700">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-600">
                    <Image
                      src={hero.hero_image_url}
                      alt={hero.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <Link href={hero.link} className="font-medium">{hero.name}</Link>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm capitalize text-gray-600 dark:text-gray-400">
                        {hero.role}
                      </span>
                      <span className="text-sm font-semibold text-blue-500">
                        {hero.rating}/100
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function TierListPage() {
  // Fetch your heroes data here
  const heroes: Heroes[] = heroesData as unknown as Heroes[]

  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="TierList"
        description={
          <>
            <p>
              Our comprehensive tier list ranks all heroes based on their current performance in the meta.
              <br />
              This is a quick guide on what to focus on and upgrade for each hero in Realms of Pixel.
            </p>
            <p className="mt-3 italic">
              <Link href={'/blog/tier-list'} className="font-medium">
                <GrowingUnderline className="text-blue-500">Learn how we rank heroes</GrowingUnderline>
              </Link>
            </p>
          </>
        }
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <Suspense fallback={<div className="mt-8 text-center">Loading tier list...</div>}>
        <TierList heroes={heroes} />
      </Suspense>
    </Container>
  )
}