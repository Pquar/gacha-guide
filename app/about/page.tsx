import { genPageMetadata } from 'app/seo'
import type { Author } from 'contentlayer/generated'
import { allAuthors } from 'contentlayer/generated'
import { AuthorLayout } from '~/layouts/author-layout'
import { coreContent } from '~/utils/contentlayer'

export let metadata = genPageMetadata({ title: 'About' })

export default function AboutPage() {
  let author = allAuthors.find((p) => p.slug === 'default') as Author
  let mainContent = coreContent(author)

  return (
    <AuthorLayout content={mainContent}>
    </AuthorLayout>
  )
}
