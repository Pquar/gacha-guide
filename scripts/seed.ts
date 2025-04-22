import csv from 'csv-parser'
import fs, { writeFileSync } from 'fs'
import path from 'path'
import Parser from 'rss-parser'
import { SITE_METADATA } from '~/data/site-metadata'
import type { Heroes } from '~/types/data'
interface HeroCustomFields {
  id: string
  title: string
  name: string
  link: string
  launch_date: string
  faction: string
  ability: string
  hero_image_url: string
  hero_small_image_url: string
  hero_medium_image_url: string
  hero_large_image_url: string
  hero_description: string
  rating: string
  tier: string
  review: string
  hero_published: string
}
type HeroRSSFeed = {
  [key: string]: any
  items: Heroes[]
}

let parser = new Parser<HeroRSSFeed, HeroCustomFields>({
  customFields: {
    item: [
      'id',
      'title',
      'name',
      'link',
      'launch_date',
      'faction',
      'ability',
      'hero_image_url',
      'hero_small_image_url',
      'hero_medium_image_url',
      'hero_large_image_url',
      'hero_description',
      'rating',
      'tier',
      'review',
      'hero_published',
    ] as (keyof HeroCustomFields)[], // Esta é a parte crucial que resolve o erro
  },
})

// Process CSV data if using CSV files
async function processHeroesCSV(filePath: string): Promise<Heroes[]> {
  const results: Heroes[] = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject)
  })
}

export async function fetchHeroes() {
  // Option 1: Fetch from RSS feed
  if (SITE_METADATA.heroesFeedUrl) {
    try {
      const data = await parser.parseURL(SITE_METADATA.heroesFeedUrl)
      const processedHeroes = data.items.map((hero) => ({
        ...hero,
        hero_description: cleanDescription(hero.hero_description),
        tier: hero.tier?.toUpperCase() || 'A', // Default tier if not specified
      }))

      writeFileSync('./json/heroes.json', JSON.stringify(processedHeroes))
      console.log('🦸 Heroes data seeded from RSS feed.')
    } catch (error) {
      console.error(`Error fetching heroes RSS feed: ${error.message}`)
    }
  }
  // Option 2: Load from CSV file
  else if (fs.existsSync('./data/heroes.csv')) {
    try {
      const heroes = await processHeroesCSV('./data/heroes.csv')
      writeFileSync('./json/heroes.json', JSON.stringify(heroes))
      console.log('🦸 Heroes data seeded from CSV file.')
    } catch (error) {
      console.error(`Error processing heroes CSV: ${error.message}`)
    }
  }
  // Fallback: Create sample data
  else {
    const sampleHeroes: Heroes[] = [
      {
        id: '1',
        title: 'Muteki Shin',
        name: 'Tomoe',
        link: '/heroes?heroNumber=1',
        role: 'DPS | Buffer',
        launch_date: '21/03/2025',
        faction: 'Advent',
        hero_image_url: '/static/images/heroes/tomoe/full.png',
        hero_small_image_url: '/static/images/heroes/tomoe/full.png',
        hero_medium_image_url: '/static/images/heroes/tomoe/full.png',
        hero_large_image_url: '/static/images/heroes/tomoe/full.png',
        hero_description:
          'Top-tier hero viable from 5★, scaling steadily. \n\n Peaks: Support (8★), DPS (11★). No awakening dependency.',
        rerun: '0',
        rating: 100,
        tier: 'SSS',
        hero_id: 'Mon, 16 Dec 2024 08:02:43 -0800',
        review: '',
        hero_published: '2025',
        content: '',
        contentSnippet: '',
        abilities: [
          {
            name: 'Draconic Maw',
            type: 'Single Unit / Burst',
            icon: 'swords',
            description: 'Deals massive physical damage to highest ATK enemy',
            image: '/static/images/heroes/tomoe/hab-0.png',
            levels: [
              {
                name: 'Level 1',
                description:
                  "Deals 298% of her ATK as PDMG to the enemy with the highest ATK. Additionally, there's 60% chance to reduce 10 rage from the target up to 5 times. ith each reduction checked separately.",
              },
              {
                name: 'Level 2',
                description:
                  "DMG increased to 357%. and there's a 60% chance to reduce fury from the target up to 6 times.",
              },
              {
                name: 'Level 3',
                description:
                  "DMG increased to 417%. and there's a 60% chance to reduce fury from the target up to 7 times.",
              },
              {
                name: 'Awakened',
                description:
                  "DMG increased to 447%. and there's a 60% chance to reduce fury from the target up to 8 times.",
              },
            ],
          },
          {
            name: 'Blade Radiance',
            type: 'Single / Combo',
            icon: 'swords',
            description: 'Normal attacks prioritize highest ATK',
            image: '/static/images/heroes/tomoe/hab-1.png',
            levels: [
              {
                name: 'Level 1',
                description:
                  'Normal attacks prioritize the enemy with the highest ATK, dealing 75% of her ATK as PDMG and adding 3% of her ATK as True DMG. After attacking, there is a 55% chance to trigger a combo, attacking the same target again. A maximum of 2 combos can be triggered per turn.',
              },
              {
                name: 'Level 2',
                description:
                  'Combo trigger chance increases to 65%, combo DMG increases to 80%, and adds 4% of her ATK as True DMG.',
              },
              {
                name: 'Level 3',
                description:
                  'Combo trigger chance increases to 75%, combo DMG increases to 85%, and adds 5% of her ATK as True DMG. A maximum of 3 combos can be triggered per turn.',
              },
              {
                name: 'Awakened',
                description:
                  'Combo trigger chance increases to 90%, combo DMG increases to 100%, and adds 5% of her ATK as True DMG.',
              },
            ],
          },
          {
            name: 'Mirage Mist',
            type: 'Self / Buff',
            icon: 'swords',
            description: 'Normal attacks prioritize highest ATK',
            image: '/static/images/heroes/tomoe/hab-2.png',
            levels: [
              {
                name: 'Level 1',
                description:
                  'ATK +20%. Max HP +15%. CRIT +5%. In battle, grants a 10% DMG Boost to all allies.',
              },
              {
                name: 'Level 2',
                description:
                  'ATK +35%. Max HP +20%. CRIT +10%. In battle, grants a 15% DMG Boost to all allies.',
              },
              {
                name: 'Level 3',
                description:
                  'ATK +45%. Max HP +25%. CRIT +15%. In battle, grants a 20% DMG Boost to all allies.',
              },
            ],
          },
          {
            name: 'Crescent Moon',
            type: 'Buff / DMG',
            icon: 'swords',
            description: 'Normal attacks prioritize highest ATK',
            image: '/static/images/heroes/tomoe/hab-3.png',
            levels: [
              {
                name: 'Level 1',
                description:
                  "After performing a direct attack, gain 1 [Fury Surge] stack. At the start of each turn, unleash [Draw Slash], dealing 150% + 10% * the number of [Fury Surge] stacks as PDMG to all enemies, with a 50% chance to reduce the target's DEF by 25%. It can only be used once per turn.",
              },
              {
                name: 'Level 2',
                description:
                  "[Draw Slash]'s DMG increases to 160% + 20% * the number of [Fury Surge] stacks, with a 60% chance to reduce the target's DEF by 25%.",
              },
              {
                name: 'Level 3',
                description:
                  "[Draw Slash]'s DMG increases to 170% + 30% * the number of [Fury Surge] stacks, with a 70% chance to reduce the target's DEF by 25%.",
              },
              {
                name: 'Awakened',
                description:
                  "[Draw Slash]'s DMG increases to 180% + 40% * the number of [Fury Surge] stacks, with an 80% chance to reduce the target's DEF by 25%.",
              },
              {
                name: 'Fury Surge',
                description: 'SPD +5% and DMG +5% for 2 turns. stacking up to 5 times.',
              },
            ],
          },
        ],

        equip: {
          name: 'Equip',
          description: 'Atk set',
          recommended: [
            {
              name: 'Judgment',
              image: 'atk-head.png',
            },
            {
              name: 'Glory',
              image: 'atk-clothes.png',
            },
            {
              name: 'Loyalty',
              image: 'atk-gloves.png',
            },
            {
              name: 'Punishment',
              image: 'atk-shoes.png',
            },
          ],
        },
        startmark: {
          name: 'Starmark & Moon Badge',
          description: '',
          recommended: [
            {
              name: 'crit',
              image: 'crit.png',
              type: 'Must Have',
            },
            {
              name: 'Sharp Blade',
              image: 'sharp-blade.png',
              type: 'Must Have',
            },
            {
              name: 'phantom',
              image: 'phantom.png',
              type: 'Recommend',
            },
            {
              name: 'pierce',
              image: 'pierce.png',
              type: 'Recommend',
            },
            {
              name: 'Awaken',
              image: 'awaken.png',
              type: 'Recommend',
            },
            {
              name: 'pursue',
              image: 'pursue.png',
              type: 'Opc.',
            },
            {
              name: 'uplifting',
              image: 'uplifting.png',
              type: 'Opc.',
            },
          ],
        },
        artefact: {
          name: 'Sacred Artifact',
          description: '',
          recommended: [
            {
              name: 'Evernight Candle',
              image: 'evernight-candle.png',
            },
            {
              name: 'Crimson eyes',
              image: 'crimson-eyes.png',
            },
            {
              name: 'Illusion Fruit',
              image: 'illusion-fruit.png',
            },
            {
              name: 'Twisted Truth',
              image: 'twisted-truth.png',
            },
          ],
        },
      },
    ]
    writeFileSync('./json/heroes.json', JSON.stringify(sampleHeroes))
    console.log('🦸 No heroes source found - created sample data.')
  }
}

// Helper function to clean descriptions
function cleanDescription(desc: string): string {
  return desc
    .replace(/<[^>]*(>|$)/g, '') // Remove HTML tags
    .replace(/\s\s+/g, ' ') // Collapse multiple spaces
    .trim()
}

export async function seed() {
  await fetchHeroes()
}

// Run the seed function
seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
