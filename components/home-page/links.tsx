import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { SITE_METADATA } from '~/data/site-metadata'

const LINKS = [
  {
    title: `Heroes Builds`,
    href: `/heroes`,
    emoji: 'dna',
  },
  {
    title: `Quick Guides`,
    href: `/snippets`,
    emoji: 'man-technologist',
  },
  {
    title: `Events and more contents`,
    href: `/blog`,
    emoji: 'memo',
  },
  {
    title: `Tier List`,
    href: `/tier-list`,
    emoji: 'clinking-beer-mugs',
  },
  {
    title: `Rank Players`,
    href: `/rank`,
    emoji: 'smiling-face-with-sunglasses',
  },
]

export function BlogLinks() {
  return (
    <div className="flex flex-col gap-2.5 md:gap-3">
      {LINKS.map(({ title, href, emoji }) => (
        <Link key={title} href={href} className="flex items-center gap-1.5">
          <Twemoji emoji={emoji} />
          <GrowingUnderline className="leading-6">{title}</GrowingUnderline>
        </Link>
      ))}
    </div>
  )
}
