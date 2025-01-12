import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "@/components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

// import '../styles/custom.scss';  // Importer les styles personnalisés{}
import "../assets/scss/theme.scss";

function ConvoilibApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768); // Sidebar visible si écran large
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Header isSidebarVisible={isSidebarVisible} />
        <div className="d-flex flex-grow-1">
          {isSidebarVisible && (
            <div className="sidebar-container">
              <Sidebar />
            </div>
          )}
          <div className="content-container flex-grow-1">
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </AuthWrapper>
    </SessionProvider>
  );
}

function AuthWrapper({ children }) {
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);

  // Utiliser useEffect pour attendre que le client monte
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Retourne null pendant le rendu côté serveur pour éviter les erreurs d'hydratation
    return null;
  }

  if (status === "loading") {
    // Optionnel : Afficher un écran de chargement pendant la récupération de la session
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default ConvoilibApp;
