import { type NextRequest } from 'next/server';

interface Repository {
  fork: boolean;
  stargazers_count: number;
}

interface User {
  followers: number;
}

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  const userResponse = await fetch('https://api.github.com/users/codewithdev');
  const userReposResponse = await fetch(
    'https://api.github.com/users/codewithdev/repos?per_page=100'
  );

  const user = await userResponse.json() as User;
  const repositories = await userReposResponse.json() as Repository[];

  const mine = repositories.filter((repo: Repository) => !repo.fork);
  const stars = mine.reduce((accumulator: number, repository: Repository) => {
    return accumulator + repository.stargazers_count;
  }, 0);

  return new Response(
    JSON.stringify({
      followers: user.followers,
      stars
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
      }
    }
  );
}
