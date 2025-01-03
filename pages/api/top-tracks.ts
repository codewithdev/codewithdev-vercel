import { type NextRequest } from 'next/server';
import { getTopTracks } from 'lib/spotify';

export const config = {
  runtime: 'experimental-edge'
};

interface Artist {
  name: string;
}

interface Track {
  artists: Artist[];
  external_urls: {
    spotify: string;
  };
  name: string;
}

export default async function handler(req: NextRequest) {
  const response = await getTopTracks();
  const { items } = await response.json();
  const tracks = items.slice(0, 10).map((track: Track) => ({
    artist: track.artists.map((artist: Artist) => artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name
  }));

  return new Response(JSON.stringify({ tracks, items }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200'
    }
  });
}
