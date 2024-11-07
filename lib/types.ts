import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export type Post = {
  _id: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  readingTime: string;
  tweets: any[];
};
type AlbumArt = {
  src: string; 
  alt?: string; 
};

export type Snippet = {
  title: string;
  slug: string;
  logo: {
    asset: {
      _ref: string;
    };
  };
  description: string;
  content: MDXRemoteSerializeResult;
};

export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Subscribers = {
  count: number;
};

export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
  albumArt: SanityImageObject;
};

export type TopTracks = {
  songUrl: string;
  title: string;
  albumArt: AlbumArt;
};

export type Track = {
  title: string;
  artist: string;
  songUrl: string;
};

export type GitHub = {
  stars: number;
};
export type GitHubFollowers = {
  followers: number;
};


