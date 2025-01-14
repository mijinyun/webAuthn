import { WebAuthnClient } from '@edgedb/auth-core/webauthn';

export const webAuthnClient = new WebAuthnClient({
  signupOptionsUrl: 'http://localhost:5173/auth/webauthn/register/options',
  signupUrl: 'http://localhost:5173/auth/webauthn/register',
  signinOptionsUrl: 'http://localhost:5173/auth/webauthn/authenticate/options',
  signinUrl: 'http://localhost:5173/auth/webauthn/authenticate',
  verifyUrl: 'http://localhost:5173/auth/webauthn/verify'
});
