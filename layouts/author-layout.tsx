import clsx from 'clsx'
import type { Author } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { CareerTimeline } from '~/components/author/career'
import { SocialAccounts } from '~/components/author/social-accounts'
import { ProfileCard } from '~/components/cards/profile'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Image } from '~/components/ui/image'
import { PageHeader } from '~/components/ui/page-header'
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
            I'm <strong>Tuan Anh Huynh</strong> (alias <strong>Leo</strong> at work), a software
            engineer from <strong>Vietnam</strong>. I have a passion for all things{' '}
            <strong>Javascript</strong>. I enjoy building eCommerce software and stuff related to
            web dev. I work mainly with <strong>Typescript</strong>, <strong>React</strong>,{' '}
            <strong>NodeJS</strong>, <strong>Remix</strong>, and <strong>TailwindCSS</strong>.
          </p>
          <p>
            This blog serves as a journal for documenting and sharing the insights and knowledge
            I've gained as a software engineer. Building, writing, and sharing things is a great way
            for me to solidify my understanding of new concepts and ideas.
          </p>
          <p>
            I would greatly appreciate any comments and thoughts on my posts{' '}
            <Twemoji emoji="clinking-beer-mugs" />.
          </p>
        </div>
      </div>

      <div className="md:col-span-2 md:pl-12 xl:pl-16">
        <div className="prose prose-lg dark:prose-invert">
          <div>
            <h3>Legacy versions</h3>
            <p>I started this blog since 2019 and up until now it has 2 legacy versions:</p>
            <ul>
              <li>
                <code>v1</code> built with <strong>NextJS v13</strong> using Page router:{' '}
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
          <div>
            <h2>Support</h2>
            <p>If you appreciate my work, consider supporting me:</p>
            <div className="flex flex-col gap-4">
              <a
                href={SITE_METADATA.support.buyMeACoffee}
                target="_blank"
                className="[&_.image-container]:mx-0"
              >
                <Image
                  src="/static/images/bmc-button.png"
                  alt="Buy Me A Coffee"
                  width={213.7}
                  height={60}
                  style={{ height: 60 }}
                />
              </a>
              <a
                href={SITE_METADATA.support.paypal}
                target="_blank"
                className="flex h-15 w-[214px] items-center rounded-lg bg-[#009cde]/70 p-1"
              >
                <Image
                  src="/static/images/paypal-logo.png"
                  alt="Donate via PayPal"
                  width={225.88}
                  height={60}
                  style={{ height: 30, width: 'auto' }}
                />
              </a>
              <a
                href={SITE_METADATA.support.kofi}
                target="_blank"
                className="[&_.image-container]:mx-0"
              >
                <Image
                  src="/static/images/kofi.png"
                  alt="Support me on Ko-fi"
                  width={297}
                  height={60}
                  style={{ height: 60, width: 'auto' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
