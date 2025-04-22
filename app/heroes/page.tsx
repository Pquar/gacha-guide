import { Suspense } from 'react'
import { genPageMetadata } from '~/app/seo'
import { Container } from '~/components/ui/container'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { PageHeader } from '~/components/ui/page-header'
import heroes from '~/json/hero.json' assert { type: 'json' }
import type { Heroes } from '~/types/data'
import { HeroesList } from './heroes-list'

export let metadata = genPageMetadata({ title: 'Heroes' })

export default async function HeroesPage() {
  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="Heroes"
        description={
          <>
            <p>
              Quick Upgrade Guide
              <br />
              This is a quick guide on what to focus on and upgrade for each hero in Realms of
              Pixel.
            </p>
            <p className="mt-3 italic">
              <Link href={'/blog/tier-list'} className="font-medium">
                <GrowingUnderline className='text-blue-500'>Tier list</GrowingUnderline>
              </Link>
              .
            </p>
          </>
        }
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <Suspense>
        <HeroesList
          heroes={heroes.sort((a, b) => Number(b.rating) - Number(a.rating)) as unknown as Heroes[]}
        />
      </Suspense>
    </Container>
  )
}
