'use client'

import { useState } from 'react'
import { Swords, Zap, Shield, BookOpen, Star } from 'lucide-react'
import clsx from 'clsx'
import Image from 'next/image'
import type { Heroes } from '~/types/data'

const iconMap = {
  swords: Swords,
  zap: Zap,
  shield: Shield,
  star: Star,
}

export function HeroDetails({ hero }: { hero: any }) {
  const [activeTab, setActiveTab] = useState<'summary' | number | 'recommended'>('summary')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <TabButton
          active={activeTab === 'summary'}
          onClick={() => setActiveTab('summary')}
          icon={BookOpen}
          label="Summary"
        />

        <TabButton
          active={activeTab === 'recommended'}
          onClick={() => setActiveTab('recommended')}
          icon={BookOpen}
          label="Recommended"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {hero.abilities.map((ability: any, index: number) => (
          <TabButton
            key={ability.name + index}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
            icon={iconMap[ability.icon as keyof typeof iconMap] || Star}
            label={ability.name}
          />
        ))}
      </div>

      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        {activeTab === 'summary' ? (
          <HeroSummary hero={hero} />
        ) : activeTab === 'recommended' ? (
          <HeroRecommended hero={hero} />
        ) : (
          <AbilityDetails ability={hero.abilities[activeTab]} />
        )}
      </div>
    </div>
  )
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
      )}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  )
}

function HeroSummary({ hero }: { hero: Heroes }) {
  return (
    <div className="space-y-2">
      {/* Hero Basic Info */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold">{hero.name}</h3>
        <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
          {hero.hero_description}
        </p>
      </div>

      {/* Hero Attributes Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Faction</h4>
          <p>{hero.faction}</p>
        </div>
        <div>
          <h4 className="font-semibold">Role</h4>
          <p>{hero.role}</p>
        </div>
        <div>
          <h4 className="font-semibold">Tier</h4>
          <p className="capitalize">{hero.tier}</p>
        </div>
        <div>
          <h4 className="font-semibold">Release Date</h4>
          <p>{hero.launch_date}</p>
        </div>
      </div>
    </div>
  )
}
function HeroRecommended({ hero }: { hero: Heroes }) {
  return (
    <div className="grid grid-cols-1 gap-1">
      {/* Equipment Sections */}
      {[hero.equip, hero.startmark, hero.artefact].map(
        (item, index) =>
          item && (
            <div key={index} className="space-y-3">
              <div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {item.recommended.map((rec, recIndex) => (
                  <div key={recIndex} className="group relative flex flex-col items-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border-2 border-gray-200 transition-all group-hover:border-blue-500 dark:border-gray-600">
                      <Image
                        src={'/static/images/equip/'+rec.image}
                        alt={rec.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                      {/* Build Type Badge */}
                      {rec.type && (
                        <span
                          className={clsx(
                            ' w-full text-center py-0.5 text-[10px] font-bold tracking-wide bottom-0',
                            {
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                                rec.type === 'Must Have',
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                                rec.type === 'Recommend',
                              'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300':
                                rec.type === 'Opc.',
                            }
                          )}
                        >
                          {rec.type}
                        </span>
                      )}
                    <span className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                      {rec.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  )
}

function AbilityDetails({ ability }: { ability: any }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
        {ability.image && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 border-gray-200 dark:border-gray-600">
            <Image
              src={ability.image}
              alt={ability.name}
              fill
              className="object-cover"
              sizes="64px"
              priority
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
              {ability.name}
            </h3>
            <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {ability.type}
            </span>
          </div>
          {ability.description && (
            <p className="mt-1 truncate text-sm text-gray-600 dark:text-gray-400">
              {ability.description}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {ability.levels.map((level: any, index: number) => (
          <div key={index} className="rounded-md bg-white p-3 shadow dark:bg-gray-700">
            <h4 className="font-medium">{level.name}</h4>
            <p className="text-gray-700 dark:text-gray-300">{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
