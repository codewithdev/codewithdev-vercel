export const getTweets = async (ids: string[]) => {
  if (ids.length === 0) {
    return [];
  }

  const queryParams = new URLSearchParams({
    ids: ids.join(','),
    expansions:
      'author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id',
    'tweet.fields':
      'attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text',
    'user.fields': 'id,name,profile_image_url,protected,url,username,verified',
    'media.fields':
      'duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics'
  });

  const response = await fetch(
    `https://api.twitter.com/2/tweets?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_KEY}`
      }
    }
  );

  const tweets = await response.json();

  interface User {
    id: string;
    name: string;
    profile_image_url: string;
    protected: boolean;
    url: string;
    username: string;
    verified: boolean;
  }

  interface Tweet {
    id: string;
    text: string;
    author_id: string;
    attachments?: {
      media_keys: string[];
    };
    referenced_tweets?: {
      type: string;
      id: string;
    }[];
  }

  interface Media {
    media_key: string;
    type: string;
    url: string;
    width: number;
    height: number;
    duration_ms?: number;
    preview_image_url?: string;
    public_metrics?: Record<string, number>;
  }

  const getAuthorInfo = (author_id: string): User | undefined => {
    return tweets.includes.users.find((user: User) => user.id === author_id);
  };

  const getReferencedTweets = (mainTweet: Tweet) => {
    return (
      mainTweet?.referenced_tweets?.map((referencedTweet) => {
        const fullReferencedTweet = tweets.includes.tweets.find(
          (tweet: Tweet) => tweet.id === referencedTweet.id
        );

        return {
          type: referencedTweet.type,
          author: getAuthorInfo(fullReferencedTweet.author_id),
          ...fullReferencedTweet
        };
      }) || []
    );
  };

  return (
    tweets.data.reduce((allTweets: Tweet[], tweet: Tweet) => {
      const tweetWithAuthor = {
        ...tweet,
        media:
          tweet?.attachments?.media_keys.map((key: string) =>
            tweets.includes.media.find((media: Media) => media.media_key === key)
          ) || [],
        referenced_tweets: getReferencedTweets(tweet),
        author: getAuthorInfo(tweet.author_id)
      };

      return [tweetWithAuthor, ...allTweets];
    }, []) || [] // If the Twitter API key isn't set, don't break the build
  );
};
