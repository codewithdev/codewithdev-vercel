import { NextSeo } from 'next-seo';

import Container from 'components/Container';
import Tweet from 'components/Tweet';
import { getTweets } from 'lib/twitter';

const url = 'https://localhost:3000/tweets';
const title = 'Tweets – Dev Prakash Sharma';
const description =
  'A collection of tweets that inspire me and help me explore the world.';

export default function Tweets({ tweets }) {
  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Tweets
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
        Here's the collection of tweets that inspire me and help me know about what's going around the world. I don't tweet a lot, but you could find some interesting things here.
        </p>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const tweets = await getTweets([
    '1551991126160052224',
    '1550944731663781888',
    '1540994552261070848',
    '1539356994162806785',
    '1538947101123817472',
    '1535923571096436736',
    '1530185865250476032',
    '1528381317171548160'
  ]);
  return { props: { tweets } };
}
