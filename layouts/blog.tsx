import Image from 'next/image';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { PropsWithChildren, Suspense } from 'react';

import Container from 'components/Container';
import Subscribe from 'components/Subscribe';
import ViewCounter from 'components/ViewCounter';
import { Post } from 'lib/types';
import { urlForImage } from 'lib/sanity';

export default function BlogLayout({
  children,
  post
}: PropsWithChildren<{ post: Post }>) {
  return (
    <Container
      title={`${post.title} – Dev Prakash Sharma`}
      description={post.excerpt}
      image={urlForImage(post.coverImage)?.url()}
      date={new Date(post.date).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Dev Prakash Sharma"
              height={24}
              width={24}
              sizes="20vw"
              src="/codewithdev.jpg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {'Dev Prakash Sharma / '}
              {format(parseISO(post.date), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readingTime}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <Suspense fallback={null}>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            {children}
          </div>
          <div className="mt-8">
            <Subscribe />
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <Link
              href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
                `https://codewithdev.vercel.app/blog/${post.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition"
            >
              {'Discuss on Twitter'}
            </Link>
            {` • `}
            <Link
              href="https://github.com/codewithdev/codewithdev.vercel.app/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition"
            >
              {'Suggest Change'}
            </Link>
          </div>
        </Suspense>
      </article>
    </Container>
  );
}
