import React from 'react';
import { Container } from 'react-bootstrap';
import { useSession, signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div>
      <h1>Login APP 1</h1>
      <button onClick={() => signIn('keycloak', { callbackUrl: '/profile' })}>
        Sign in with Keycloak
      </button>
    </div>
  );
}
