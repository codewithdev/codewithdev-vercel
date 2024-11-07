import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'edge'
};

export default async function handler(req: NextRequest) {
  try {
    const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
      method: 'GET',
      headers: {
        Authorization: `Token ${process.env.REVUE_API_KEY}`
      }
    });

    const data = await result.json();

    if (!result.ok) {
      throw new Error('Error retrieving subscribers');
    }

    return new Response(JSON.stringify({ count: data.length }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error retrieving subscribers';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }
}
