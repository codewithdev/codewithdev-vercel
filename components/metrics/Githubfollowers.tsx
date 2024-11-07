import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { GitHubFollowers } from 'lib/types';
import MetricCard from 'components/metrics/Card';

export default function GitHubCardf() {
  const { data } = useSWR<GitHubFollowers>('/api/github', fetcher);

  const followers = Number(data?.followers);
  const link = 'https://github.com/codewithdev?tab=followers';

  return (
    <MetricCard
      header="GitHub Followers"
      link={link}
      metric={followers}
      isCurrency={false}
    />
  );
}
