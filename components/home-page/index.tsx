import type {
  Blog,
  Snippet,
} from "~/.contentlayer/generated";
import { Container } from "~/components/ui/container";
import type { CoreContent } from "~/types/data";
import { Greeting } from "./greeting";
import { LatestPosts } from "./latest-posts";
import { BlogLinks } from "./links";

export function Home({
  posts,
  snippets,
}: {
  posts: CoreContent<Blog>[];
  snippets: CoreContent<Snippet>[];
}) {
  return (
    <Container
      as="div"
      className="pt-4 lg:pt-12"
    >
      <div className="py-6 md:pb-8 xl:grid xl:grid-cols-3">
        <div className="space-y-4 md:space-y-6 md:pr-8 xl:col-span-2">
          <Greeting />
          <div className="text-base leading-7 text-gray-600 dark:text-gray-400 md:text-lg md:leading-8">
            <div className="mb-6 mt-4 md:mb-8">
              <p>
                Here you’ll
                find guides to
                discover the
                most efficient
                builds, learn
                how to invest
                your resources
                wisely, and
                explore the
                game's
                features and
                challenges
                with detailed
                strategies
              </p>
            </div>
            <BlogLinks />
          </div>
        </div>
      </div>
      <LatestPosts
        posts={posts}
        snippets={snippets}
      />
      {/* {SITE_METADATA.newsletter?.provider && (
        <div className="flex items-center justify-center py-4 lg:py-10">
        <NewsletterForm />
        </div>
        )} */}
    </Container>
  );
}
