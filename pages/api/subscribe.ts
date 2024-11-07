import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(
      JSON.stringify({
        error: 'Email is required'
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  try {
    const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.REVUE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await result.json();

    if (!result.ok) {
      return new Response(
        JSON.stringify({
          error: data.error?.email?.[0] || 'Error subscribing to newsletter'
        }),
        {
          status: 500,
          headers: {
            'content-type': 'application/json'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: null,
        message: 'Successfully subscribed to newsletter!'
      }),
      {
        status: 201,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: 'Error subscribing to newsletter'
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }
}
