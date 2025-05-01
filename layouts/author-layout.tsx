import type { Author } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { SocialAccounts } from '~/components/author/social-accounts'
import { Container } from '~/components/ui/container'
import { Twemoji } from '~/components/ui/twemoji'
import { SITE_METADATA } from '~/data/site-metadata'

interface Props {
  children?: ReactNode
  content: Omit<Author, '_id' | '_raw' | 'body'>
}

export function AuthorLayout({ children }: Props) {
  return (
    <Container className="pt-4 lg:pt-12">
      <div className="space-y-2 py-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Hi there <Twemoji emoji="waving-hand" />
        </h1>
        <div className="text-gray-600 dark:text-gray-400 md:text-lg md:leading-7">
          <p>
            I'm Pquar. I created this blog to have a dedicated space for content related to the
            game, and also to practice my English, since my main language is Portuguese. If you’d
            like to contribute, suggest improvements, or even write a post, feel free to contact me
            on Discord <strong>Pquar</strong>, by email, in-game, on Twitter—anywhere that works for
            you.
          </p>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="prose prose-lg dark:prose-invert">
          <div>
            <h3>Add contents</h3>
            <ul>
            <li>
                <code>2025-05-01</code> Reals Of Pixel: <strong>Adicionado videos e resumo de heróis em Portuguese</strong>
              </li>
              <li>
                <code>2025-04-27</code> Reals Of Pixel: <strong>All hero's from Tw, vehicle and mech Snippets</strong>
              </li>
              <li>
                <code>2025-04-21</code> built of <strong>2025-04-21 - Tomoe</strong>
              </li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              Reach out to me at <a href={`mailto:${SITE_METADATA.email}`}>{SITE_METADATA.email}</a>{' '}
              or find me on social media:
            </p>
            <SocialAccounts />
          </div>
        </div>
      </div>
    </Container>
  )
}
