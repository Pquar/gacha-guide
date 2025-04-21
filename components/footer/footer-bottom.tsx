import { clsx } from 'clsx'

export function FooterBottom() {
  return (
    <div
      className={clsx([
        'pt-5 md:my-2',
        'flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-16',
        'border-t border-gray-200 dark:border-gray-700',
      ])}
    >
      <div className="text-center w-full">
        <span>© 2025 CloneM. This is an unofficial fan site. Not affiliated with Realms of Pixel developers.</span>
      </div>
    </div>
  )
}
