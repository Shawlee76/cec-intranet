import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../assets/images/logo-light-nav.png";

const Header = ({ isSidebarVisible }) => {
  const { data: session, status } = useSession();

  useEffect(() => {

  }, []);

  const handleLogout = async () => {
    await signOut();
    const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_LOGOUT_URL}?id_token_hint=${session?.idToken}&post_logout_redirect_uri=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`;
    window.location.href = keycloakLogoutUrl;
  };

  return (
    <Navbar bg="white" variant="white" expand="lg">
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Navbar.Brand href="/">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </Navbar.Brand>

        {/* Titre affiché en permanence */}
        <div className="mx-auto">
          <h2 className="text-intranet m-0">CHARISMA.NET</h2>
        </div>

        {/* Menu : Affiché uniquement si le Sidebar est masqué */}
        {!isSidebarVisible && (
          <React.Fragment>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link href="/" passHref legacyBehavior>
                  <Nav.Link>Accueil</Nav.Link>
                </Link>
                {status === "authenticated" && (
                  <React.Fragment>
                    <Link href="/dashboard" passHref legacyBehavior>
                      <Nav.Link>Tableau de bord</Nav.Link>
                    </Link>
                    <Link href="/pointage" passHref legacyBehavior>
                      <Nav.Link>Pointage</Nav.Link>
                    </Link>
                  </React.Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </React.Fragment>
        )}

        {/* Bouton Connexion / Déconnexion */}
        <Nav className="ms-auto">
          {status === "loading" ? (
            <Button variant="intranet" disabled>
              Chargement...
            </Button>
          ) : status === "authenticated" ? (
            <Button variant="intranet" onClick={handleLogout}>
              Déconnexion
            </Button>
          ) : (
            <Button
              variant="intranet"
              onClick={() => signIn("keycloak", { callbackUrl: "/" })}
            >
              Connexion
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
