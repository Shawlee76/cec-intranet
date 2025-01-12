import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer class="footer bg-white text-intranet mt-auto py-3">
      <Container>
        <p>
          &copy; {new Date().getFullYear()} NOUVELLES TECHNOLOGIES Tous droits
          réservés.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
