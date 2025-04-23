import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from '~/components/ui/link'

export const FACTION: {
  label: string
  value: FactionType
}[] = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'Advent',
    value: 'Advent',
  },
  {
    label: 'Ascension',
    value: 'Ascension',
  },
  {
    label: 'Green',
    value: 'Green',
  },
  {
    label: 'Blue',
    value: 'Blue',
  },
  {
    label: 'Red',
    value: 'Red',
  },
]

export type FactionType = 'all' | 'Advent' | 'Ascension' | 'Green' | 'Blue' | 'Red'
export function FactionSelect({ faction }: { faction: FactionType }) {
  let { label, value: selectedValue } = FACTION.find(({ value }) => value === faction) || FACTION[0]

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          aria-label="More links"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 font-medium dark:border-gray-700"
          data-umami-event="movies-rate-filter"
        >
          <span>{label}</span>
          <ChevronDown strokeWidth={1.5} size={20} />
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className={clsx([
              'absolute right-0 z-50',
              'mt-2 w-32 origin-top-right rounded-md text-right shadow-lg',
              'bg-white dark:bg-black',
              'ring-1 ring-black ring-opacity-5 focus:outline-none',
            ])}
          >
            <div className="space-y-1 p-1">
              {FACTION.map(({ label, value }) => (
                <MenuItem key={value} as="div">
                  {({ close }) => (
                    <Link
                      className={clsx([
                        'flex w-full items-center gap-2 rounded-md px-2 py-1.5',
                        value === selectedValue
                          ? 'bg-gray-200 dark:bg-gray-800'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-800',
                      ])}
                      href={`/heroes?faction=${value}`}
                      onClick={close}
                    >
                      <span data-umami-event="books-shelf-select">{label}</span>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
