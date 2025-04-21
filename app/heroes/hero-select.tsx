import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from '~/components/ui/link'
import { type HeroNumberType, HERO_OPTIONS } from '~/components/utils/hero'

export function HeroSelect({ heroNumber }: { heroNumber: HeroNumberType }) {
  // Find the selected hero or default to first option
  const selectedHero = HERO_OPTIONS.find((option) => option.value === heroNumber) || HERO_OPTIONS[0]

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          aria-label="Select hero"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          data-umami-event="hero-select"
        >
          <span>{selectedHero.label}</span>
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
            className={clsx(
              'absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-md shadow-lg',
              'bg-white dark:bg-gray-900',
              'ring-1 ring-black/5 focus:outline-none'
            )}
          >
            <div className="space-y-1 p-1">
              {HERO_OPTIONS.map((option) => (
                <MenuItem key={option.value} as={Fragment}>
                  {({ close }) => (
                    <Link
                      className={clsx(
                        'block w-full rounded-md px-2 py-1.5 text-right transition-colors',
                        option.value === heroNumber
                          ? 'bg-gray-200 font-medium dark:bg-gray-800'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                      href={`/heroes?heroNumber=${option.value}`}
                      onClick={close}
                      data-umami-event={`hero-select-${option.value}`}
                    >
                      {option.label}
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
