import { clsx } from 'clsx'
import { GritBackground } from '~/components/ui/grit-background'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Image, Zoom } from '~/components/ui/image'
import { capitalize, kebabCaseToPlainText } from '~/utils/misc'

export function Banner({ banner, className }: { banner: string; className?: string }) {
  let [path, author] = banner.split('__')
  let handle = path.split('/').pop() || ''
  return (
    <div className={clsx('relative', className)}>
      <Credit
        author={author}
        className={clsx([
          'absolute right-4 top-4 z-10',
          'hidden rounded-xl px-3 py-0.5 lg:block',
          'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
        ])}
      />
      <Zoom>
        <Image
          src={banner}
          alt={capitalize(kebabCaseToPlainText(handle)) || 'Article banner photo'}
          width={1600}
          height={900}
          className="h-auto w-full rounded-lg"
        />
      </Zoom>
      <GritBackground className="inset-0 rounded-lg opacity-75" />
    </div>
  )
}

interface CreditProps {
  author: string
  className?: string
}

function Credit({ author, className }: CreditProps) {
  if (author) {
    return (
      <div className={clsx('text-sm italic', className)}>
        Photo by{' '}
          <GrowingUnderline data-umami-event="banner-author">@{author}</GrowingUnderline>
      </div>
    )
  }
  return null
}
