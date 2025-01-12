import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { Container, Row, Col, Button, } from "react-bootstrap";
import { fetchConvoyage } from "@/lib/sse-client";

const Pointage = () => {
  const [boites, setBoites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
      const eventSource = fetchConvoyage(
        (data) => {
          setBoites(data.boites || []);
          setLoading(false);
        },
        (error) => {
          console.error("Erreur SSE Pointage :", error);
          setLoading(false);
        },
        session?.accessToken
      );

      return () => {
        eventSource.close();
      };
  }, [status, session]);

  if (loading) {
    return <div>Chargement des boîtes...</div>;
  }

  const toggleBoite = async (e, boite) => {
    e.currentTarget.blur();

    const currentState = boite.saved;
    await fetch("/api/sse/toggle-boite", {
      method: "POST",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify({
        token: session.accessToken,
        idBoite : boite.number,
        idConvoi: boite.idConvoi,
        state: !currentState
      }),
    });    
  };

  return (
    <ProtectedRoute>
    <Container fluid className="flex-grow-1">
      <Row className="mb-4"><Col md={12} className="text-center"><h2>Pointage des boites</h2></Col></Row>
      <Row><Col md={{span:11, offset:1}} className="text-left"><h3>SANTCUAIRE</h3></Col></Row>
      
      <Row className="justify-content-between">
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZSANCT" && boite.css == "boite-0107") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
              {boite.code.substring(1)} 
              </Button>
            </Col>
          ))}
      </Row>

      <Row className="justify-content-between">
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZSANCT" && boite.css == "boite-0812") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>

      <Row className="justify-content-between">
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZSANCT" && boite.css == "boite-1317") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>

      <Row className="justify-content-between">
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZSANCT" && boite.css == "boite-1822") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>

      <Row className="justify-content-between">
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZSANCT" && boite.css == "boite-2327") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>

      <Row className="justify-content-between">
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZSANCT" && boite.css == "boite-autre") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>

      <Row><Col md={{span:11, offset:1}} className="text-left mt-5"><h3>GYMNASE</h3></Col></Row>
      <Row className="justify-content-between">
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZGYMN") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>

      <Row><Col md={{span:11, offset:1}} className="text-left mt-5"><h3>POLY 3</h3></Col></Row>
      <Row>
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZPOLY3") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>

      <Row><Col md={{span:11, offset:1}} className="text-left mt-5"><h3>CAFETERIA</h3></Col></Row>
      <Row>
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZCAFET") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>

      <Row><Col md={{span:11, offset:1}} className="text-left mt-5"><h3>SUPER EGLISE</h3></Col></Row>
      <Row className="justify-content-between">
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZSUPEG") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>
      
      <Row><Col md={{span:11, offset:1}} className="text-left mt-5"><h3>A2D & SHR</h3></Col></Row>
      <Row className="justify-content-between">
        {boites?.filter((boite) => boite.enabled && boite.zone == "ZA2DSHR") // Filtrer uniquement les boîtes activées
          .map((boite, index) => (
            <Col key={boite.number} className="d-flex justify-content-center mb-3" style={{ flex: "0 0 20%" }}>
              {/* Chaque boîte occupe 20% de la largeur */}
              <Button className="custom-button w-100" variant={`${boite.saved ? "success border-3" : "outline-" + boite.css + " border-3"} }`} onClick={(e) => toggleBoite(e, boite)}>
                {boite.code.substring(1)}
              </Button>
            </Col>
          ))}
      </Row>
    </Container>
    </ProtectedRoute>
  );
};

export default Pointage;
