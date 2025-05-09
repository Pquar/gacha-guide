import type { MDXComponents } from 'mdx/types'
import { Image, Zoom, type ImageProps } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { CodeTitle } from './code-title'
import { Pre } from './pre'
import { TableWrapper } from './table-wrapper'
import { YouTubeModalPlayer } from '~/components/mdx/youtube-player'

export const MDX_COMPONENTS: MDXComponents = {
  Image: ({ alt, ...rest }: ImageProps) => {
    return (
      <Zoom>
        <Image alt={alt} {...rest} />
      </Zoom>
    )
  },
  Twemoji,
  CodeTitle,
  YouTubeModalPlayer,
  a: Link,
  pre: Pre,
  table: TableWrapper,
}
