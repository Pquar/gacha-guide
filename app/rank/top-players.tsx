'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type Player = {
  id: number
  name: string
  image: string
  date_rated: string
  server: number
  vip: number
  'vip-exp': number
  power: number
  'max-hero': number
  'max-attack': number
  'max-def': number
  'max-hp': number
  'max-speed': number
}

type SortField = keyof Omit<Player, 'id' | 'name' | 'image' | 'date_rated'>

export function TopPlayers({ players }: { players: Player[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>('power')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [serverFilter, setServerFilter] = useState<number | 'all'>('all')
  const [vipFilter, setVipFilter] = useState<number | 'all'>('all')

  const itemsPerPage = 30

  // Filter and sort players
  const processedPlayers = players
    .filter((player) => serverFilter === 'all' || player.server === serverFilter)
    .filter((player) => vipFilter === 'all' || player.vip === vipFilter)
    .sort((a, b) => {
      const aValue = a[sortField] as number
      const bValue = b[sortField] as number
      return sortDirection === 'desc' ? bValue - aValue : aValue - bValue
    })

  // Pagination
  const totalPages = Math.ceil(processedPlayers.length / itemsPerPage)
  const paginatedPlayers = processedPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [sortField, sortDirection, serverFilter, vipFilter])

  // Get unique servers and VIP levels for filters
  const uniqueServers = [...new Set(players.map((p) => p.server))].sort((a, b) => a - b)
  const uniqueVips = [...new Set(players.map((p) => p.vip))].sort((a, b) => a - b)

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <div>
          <label className="mb-1 block text-sm font-medium">Sort by</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            className="rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="power">Power</option>
            <option value="max-hero">Hero Power</option>
            <option value="max-attack">Attack</option>
            <option value="max-def">Defense</option>
            <option value="max-hp">HP</option>
            <option value="max-speed">Speed</option>
            <option value="vip">VIP Level</option>
            <option value="server">Server</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Order</label>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
            className="rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Server</label>
          <select
            value={serverFilter}
            onChange={(e) =>
              setServerFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="all">All Servers</option>
            {uniqueServers.map((server) => (
              <option key={server} value={server}>
                Server {server}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">VIP Level</label>
          <select
            value={vipFilter}
            onChange={(e) =>
              setVipFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="all">All VIP</option>
            {uniqueVips.map((vip) => (
              <option key={vip} value={vip}>
                VIP {vip}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Players Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Server
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                VIP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Power
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Best Status Hero
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {paginatedPlayers.map((player, index) => (
              <tr key={player.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="">
                  <div className='flex items-center space-x-3 whitespace-nowrap px-6 py-4 text-sm justify-start'>
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <span>{player.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">S{player.server}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">VIP {player.vip}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {player.power.toLocaleString()}
                </td>
                <td className="grid whitespace-nowrap px-6 py-4 text-sm">
                  <span>Power: {player['max-hero'].toLocaleString()}</span>
                  <span>ATK: {player['max-attack'].toLocaleString()}</span>
                  <span>DEF: {player['max-def'].toLocaleString()}</span>
                  <span>HP: {player['max-hp'].toLocaleString()}</span>
                  <span>SPD: {player['max-speed'].toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, processedPlayers.length)} of{' '}
          {processedPlayers.length} players
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={clsx(
              'rounded border px-3 py-1 text-sm',
              currentPage === 1
                ? 'cursor-not-allowed border-gray-300 text-gray-400 dark:border-gray-600 dark:text-gray-500'
                : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
            )}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={clsx(
              'rounded border px-3 py-1 text-sm',
              currentPage === totalPages
                ? 'cursor-not-allowed border-gray-300 text-gray-400 dark:border-gray-600 dark:text-gray-500'
                : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
