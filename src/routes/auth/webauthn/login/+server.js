// import { json } from '@sveltejs/kit';
// import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server';

// export async function POST({ request }) {
//   const { email } = await request.json();

//   if (!email) {
//     return json({ error: 'Email is required' }, { status: 400 });
//   }

//   // 사용자 검색
//   const user = users.get(email);
//   if (!user) {
//     return json({ error: 'User not found' }, { status: 404 });
//   }

//   // WebAuthn 인증 옵션 생성
//   const options = generateAuthenticationOptions({
//     rpID: 'localhost',
//     allowCredentials: user.credentials.map(cred => ({
//       id: cred.credentialID,
//       type: 'public-key',
//     })),
//     userVerification: 'preferred',
//   });

//   // 사용자별 챌린지를 저장하여 나중에 검증
//   user.challenge = options.challenge;

//   return json(options);
// }

// export async function PUT({ request }) {
//   const body = await request.json();

//   const { email, credential } = body;
//   if (!email || !credential) {
//     return json({ error: 'Email and credential response are required' }, { status: 400 });
//   }

//   // 사용자 검색
//   const user = users.get(email);
//   if (!user) {
//     return json({ error: 'User not found' }, { status: 404 });
//   }

//   try {
//     // 인증 응답 검증
//     const verification = verifyAuthenticationResponse({
//       response: credential,
//       expectedChallenge: user.challenge,
//       expectedOrigin: 'http://localhost:5173',
//       expectedRPID: 'localhost',
//     });

//     if (verification.verified) {
//       // 성공적으로 인증된 경우
//       return json({ success: true });
//     } else {
//       return json({ success: false, error: 'Verification failed' });
//     }
//   } catch (error) {
//     return json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// 3탄
import { json } from '@sveltejs/kit';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { edgedb } from '$lib/edgedb';
import e from '$lib/edgeql';

export async function POST({ request }) {
  const { email } = await request.json();

  if (!email) {
    return json({ error: 'Email is required' }, { status: 400 });
  }

  const user = await e.select(e.User, (u) => ({
    filter: e.op(u.email, '=', email),
    credentials: {
      id: true,
      credentialID: true,
    },
  })).run(edgedb);

  if (!user) {
    return json({ error: 'User not found' }, { status: 404 });
  }

  const options = generateAuthenticationOptions({
    rpID: 'localhost',
    allowCredentials: user.credentials.map((cred) => ({
      id: Buffer.from(cred.credentialID, 'base64'),
      type: 'public-key',
    })),
  });

  // 챌린지 저장
  await e.update(e.User, (u) => ({
    filter: e.op(u.id, '=', user.id),
    set: { challenge: options.challenge },
  })).run(edgedb);

  return json(options);
}
