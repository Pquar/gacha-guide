'use client'

import { useSearchParams } from 'next/navigation'
import { BookCard } from '~/components/cards/book'
import type { Heroes } from '~/types/data'
import { SHELVES, ShelveSelect, type ShelfType } from './shelve-select'

interface HeroListProps {
  heroes: Heroes[]
}

export function BooksList({ heroes }: HeroListProps) {
  let searchParams = useSearchParams()
  let shelf = (searchParams.get('shelf') as ShelfType) || 'all'
  let displayBooks =
    shelf === 'all'
      ? heroes
      : heroes.filter((hero) => {
          if (shelf === 'read') {
            return hero.user_shelves === ''
          }
          return book.user_shelves.includes(shelf)
        })
  let { label } = SHELVES.find(({ value }) => value === shelf) || SHELVES[0]

  return (
    <div className="py-5 md:py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="text-xl font-bold leading-9 tracking-tight md:text-2xl">
          <span className="mr-1 capitalize">{label}</span>
          <span className="font-normal">({displayBooks.length})</span>
        </span>
        <div className="flex items-center gap-1 md:gap-2">
          <span>Shelve: </span>
          <ShelveSelect shelf={shelf} />
        </div>
      </div>
      <div className="space-y-10">
        {displayBooks.map((book) => (
          <BookCard key={book.guid} book={book} />
        ))}
      </div>
    </div>
  )
}
