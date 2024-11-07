import useSWR from 'swr';
import fetcher from 'lib/fetcher';
import type { Track as TrackType } from 'lib/types';
import Track from 'components/Track';

type TopTracks = {
  tracks: TrackType[];
};

export default function Tracks() {
  const { data } = useSWR<TopTracks>('/api/top-tracks', fetcher);

  if (!data) {
    return null;
  }

  return (
    <>
      {data.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </>
  );
}
