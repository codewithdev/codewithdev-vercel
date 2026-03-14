import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';

// Use GITHUB_ID / GITHUB_SECRET from GitHub OAuth App (Settings → Developer settings → OAuth Apps)
const githubClientId = process.env.GITHUB_ID ?? process.env.OAUTH_CLIENT_KEY;
const githubClientSecret = process.env.GITHUB_SECRET ?? process.env.OAUTH_CLIENT_SECRET;

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GithubProvider({
      clientId: githubClientId as string,
      clientSecret: githubClientSecret as string,
      allowDangerousEmailAccountLinking: true
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: '2.0',
      authorization: {
        params: {
          scope: 'users.read tweet.read offline.access',
        },
      },
    }),
  ],
};

const nextAuthHandler = NextAuth(authOptions);

/**
 * Normalize req.query.nextauth so OAuth GET callbacks are handled.
 * Some runtimes (e.g. Vercel) can send nextauth as a string; NextAuth expects an array.
 * @see https://github.com/nextauthjs/next-auth/issues/6045
 */
export default async function handler(req: import('next').NextApiRequest, res: import('next').NextApiResponse) {
  const nextauth = req.query?.nextauth;
  if (req.method === 'GET' && nextauth !== undefined && !Array.isArray(nextauth)) {
    req.query = {
      ...req.query,
      nextauth: (typeof nextauth === 'string' ? nextauth.split('/').filter(Boolean) : [nextauth]) as string[]
    };
  }
  return nextAuthHandler(req, res);
}
