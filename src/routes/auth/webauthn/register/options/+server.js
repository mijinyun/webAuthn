import { json } from '@sveltejs/kit';
import { client } from '$lib/index.js';
import { EDGEDB_AUTH_BASE_URL } from '$env/static/private';

export const GET = async ({ request }) => {
  console.log('1 시작')
  const email = new URL(request.url).searchParams.get('email');
  
  if (!email) {
    return new Response('Invalid request. Email is required.', { status: 400 });
  }

  let user = await client.query('SELECT User { email } FILTER .email = <str>$email', { email });

  if (user.length != 0) {
    console.log('user exists');
    return new Response('User already exists.', { status: 400 });
  }

  
  user = await client.query('INSERT User { email := <str>$email }', { email });

  const registerUrl = new URL('webauthn/register/options', EDGEDB_AUTH_BASE_URL);
  registerUrl.searchParams.set('email', email);

  const response = await fetch(registerUrl.href);

  if (!response.ok) {
    const text = await response.text();
    console.log('Error from auth server: ', text);
    return new Response(`Error from auth server: ${text}`, { status: 400 });
  }

  const data = await response.json();

  return json(data);
}
