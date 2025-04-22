import { TopPlayers } from './top-players'
import playersData from '~/json/players.json' assert { type: 'json' }

export default async function HeroPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Top Players</h1>
      <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">Contact me on Discord<strong>(Pquar)</strong> if you want to appear on the list. </span>
      <TopPlayers players={playersData} />
    </div>
  )
}
