import RSS from 'rss';
import { sanityClient } from 'lib/sanity-server';
import { indexQuery } from 'lib/queries';
import { GetServerSideProps } from 'next';
import { Post } from 'lib/types';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = new RSS({
    title: 'Dev Prakash Sharma',
    site_url: 'https://codewithdev.vercel.app',
    feed_url: 'https://codewithdev.vercel.app/feed.xml'
  });

  const allPosts = await sanityClient.fetch<Post[]>(indexQuery);
  allPosts.forEach((post: Post) => {
    feed.item({
      title: post.title,
      url: `https://codewithdev.vercel.app/blog/${post.slug}`,
      date: post.date,
      description: post.excerpt
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {}
  };
};

export default function RSSFeed() {
  return null;
}
