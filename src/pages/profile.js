import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
        <React.Fragment>
            <div>You need to login to access this page of APP 1</div>
            <Link href="/signin">Sign in</Link>
        </React.Fragment>
    );
  }

  const handleLogout = async () => {
    await signOut(); // { callbackUrl: '/' }

    // URL de déconnexion Keycloak avec id_token_hint
    const keycloakLogoutUrl = `https://accounts.tbd.info-charisma.com/auth/realms/charisma-realm-tbd/protocol/openid-connect/logout?id_token_hint=${session.idToken}&post_logout_redirect_uri=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`;
      
    // Rediriger directement via window.location pour éviter les problèmes liés à fetch
    window.location.href = keycloakLogoutUrl;
  };

  const { realmAccess, resourceAccess } = session;
  console.log(session);

  return (
    <Container className="mt-4">
      <Row>
        <Col lg="12">
      <h1><strong>User Profile on APP 1</strong></h1>
      <ul>
        <li>{process.env.NEXT_PUBLIC_NEXTAUTH_URL}</li>
        <li><strong>Email:</strong> {session.user.email}</li>
        <li><strong>Full Name:</strong> {session.user.name}</li>
        <li><strong>Access Token:</strong> {session.accessToken}</li>
        <li><strong>Roles (Realm Access):</strong></li>
        <ul>
          {realmAccess.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
        <li><strong>Roles (Resource Access):</strong></li>
        <ul>
          {Object.keys(resourceAccess).map((resource, index) => (
            <li key={index}>
              <strong>{resource}:</strong>
              <ul>
                {resourceAccess[resource].roles.map((role, idx) => (
                  <li key={idx}>{role}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </ul>
      <Button variant='danger' onClick={handleLogout}>Logout</Button><br/>
      <Button variant='primary' href="https://localhost:3001/profile">Go to APP 2 profile</Button><br />
      <Button variant="success" href="https://localhost:3002/home">Go to APP 3 profile</Button><br />
      <button className="btn btn-primary">Bouton personnalisé</button>
      </Col>
    </Row>
    </Container>
  );
}
