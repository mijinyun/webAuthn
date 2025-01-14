// @ts-nocheck
import { generatePKCE } from '$lib/auth/pkce.js';
import { json } from '@sveltejs/kit';
import { EDGEDB_AUTH_BASE_URL } from '$env/static/private';
// import { client } from '$lib/index.js';
// import e from '../../../../../dbschema/edgeql-js';

export async function POST({ request }) {
  console.log('4 시작')
  const { challenge, verifier } = generatePKCE()
  const { email, provider, credentials, verify_url, user_handle } = await request.json();
  if (!email || !provider || !credentials || !verify_url || !user_handle) {
    return new Response('Invalid request body.', { status: 400 });
  }

  const registerUrl = new URL('webauthn/register', EDGEDB_AUTH_BASE_URL);

  const response = await fetch(registerUrl.href, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, provider, credentials, verify_url, user_handle, challenge })
  });

  if (!response.ok) {
    const text = await response.text();
    return new Response(`Error from auth server: ${text}`, { status: 400 });
  }

  const data = await response.json();

  const tokenUrl = new URL("token", EDGEDB_AUTH_BASE_URL);
  tokenUrl.searchParams.set("code", data.code);
  tokenUrl.searchParams.set("verifier", verifier);
  const tokenResponse = await fetch(tokenUrl.href, {
    method: "get",
  });

  if(!tokenResponse.ok) {
    return new Response('Failed to get token', { status: 400 });
  }

  // try {
    // await client.query(
    //   `UPDATE User
    //     FILTER .email = <str>$email
    //     SET {
    //       challenge := <str>$challenge
    //     }`,
    //   {email, challenge}
    // );

    // await client.query(
    //   `INSERT Credential {
    //     counter := <int64>1,
    //     createdAt := datetime_current(),
    //     publicKey := <bytes>$publicKey,
    //     user := (SELECT User FILTER .email = <str>$email)
    //   }`,
    //   {
    //     publickKey: publicKeyBuffer,
    //     email
    //   } 
    // );
  // } catch (error) {
  //   console.error('Failed to generate WebAuthn options:', error);
  //   return json({ error: 'Failed to generate WebAuthn options' }, { status: 500 });
  // }

  return json(data);
}
