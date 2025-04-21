import { GradientBorder } from '~/components/ui/gradient-border'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'
import { Twemoji } from '~/components/ui/twemoji'
import type { Heroes } from '~/types/data'
import { HeroCover } from './hero-cover'
import { HeroDetails } from './hero-details'
import { Tier } from '~/components/ui/tier'

export function HeroesCard({ hero }: { hero: Heroes }) {
  return (
    <GradientBorder className="flex flex-col gap-8 rounded-2xl px-3 py-6 dark:bg-white/5 md:flex-row md:px-6">
      <TiltedGridBackground className="inset-0 z-[-1]" />
      <div id={hero.id} className="mx-auto flex w-60 shrink-0 items-center justify-center">
        <HeroCover image={hero.hero_large_image_url} alt={hero.title} />
      </div>
      <div className="flex grow flex-col justify-between gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-12 text-xl font-semibold md:text-2xl">
              {hero.link ? (
                <Link href={hero.link}>
                  <GrowingUnderline>{hero.title}</GrowingUnderline>
                </Link>
              ) : (
                <h3>{hero.title}</h3>
              )}
              <Tier tier={hero.tier} className="hidden md:inline-flex" />
            </div>
          </div>
          <HeroDetails hero={hero} />
        </div>
        <div className="flex items-center justify-between">
          <HeroMeta hero={hero} />
        </div>
      </div>
    </GradientBorder>
  )
}

function HeroMeta({ hero }: { hero: Heroes }) {
  return (
    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
      <div className="flex items-center gap-1">
      rerun: <span className="font-semibold">{hero.rerun}</span>
      </div>
    </div>
  )
}

/* function GoodreadsLink({ url, className }: { url?: string | null; className?: string }) {
  if (url) {
    return (
      <Link href={url} className={className}>
        <GoodreadsLogo className="h-5 text-goodreads dark:text-gray-100" />
      </Link>
    )
  }
  return null
} */

function getHeroUrl(content: string) {
  try {
    let url = content.match(/<a href="([^"]*)">/)?.[1]?.split('?')[0]
    return url
  } catch (error) {
    console.error('Error parsing book URL:', error)
    return null
  }
}
