import { clsx } from 'clsx'

export type TierType = 'all' | 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C'

export function Tier({ tier, className }: { tier: TierType; className?: string }) {
  if (!tier) return null

  const tierGradients = {
    SSS: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-red-400 via-rose-500 to-red-600',
    SS: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-purple-400 via-indigo-500 to-purple-600',
    S: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-400 via-sky-500 to-blue-600',
    A: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-teal-400 via-emerald-500 to-teal-600',
    B: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-lime-400 via-green-500 to-lime-600',
    C: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-300 via-amber-400 to-yellow-500',
    all: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-300 via-gray-400 to-gray-500',
  }

  const darkGradients = {
    SSS: 'dark:bg-gradient-to-l dark:from-rose-700 dark:to-red-800',
    SS: 'dark:bg-gradient-to-l dark:from-indigo-700 dark:to-purple-800',
    S: 'dark:bg-gradient-to-l dark:from-sky-700 dark:to-blue-800',
    A: 'dark:bg-gradient-to-l dark:from-emerald-700 dark:to-teal-800',
    B: 'dark:bg-gradient-to-l dark:from-green-700 dark:to-lime-800',
    C: 'dark:bg-gradient-to-l dark:from-amber-700 dark:to-yellow-800',
    all: 'dark:bg-gradient-to-l dark:from-gray-600 dark:to-gray-700',
  }

  return (
    <span
      className={clsx([
        'text-base',
        'shrink-0 items-center gap-1',
        'rounded-full px-3 py-0.5',
        'font-medium text-gray-700 dark:text-gray-100',
        tierGradients[tier],
        darkGradients[tier],
        className,
      ])}
    >
      <span>{tier}</span>
    </span>
  )
}
