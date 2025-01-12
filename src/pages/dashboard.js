
import ProtectedRoute from '../components/ProtectedRoute';
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import useBreakpoint from "@/services/use-breakpoint";
import { Container, Alert, Row, Col, Badge, Card, CardBody, CardText } from "react-bootstrap";
import { fetchConvoyage } from "@/lib/sse-client";

const Dashboard = () => {
  const [boites, setBoites] = useState([]);
  const [current, setCurrent] = useState({ enabled: false, saved: false, label: "N.A", code: "N.A", css: "N.A", zone: "N.A", number: 0, idConvoi: 0, });
  const [notification, setNotification] = useState("");
  const breakpoint = useBreakpoint();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false); // État pour l'animation
  const { data: session, status } = useSession();

  const showNotification = (message) => {
    setNotification(message);
    setFadeOut(false);

    // Cacher la notification après 3 secondes
    setTimeout(() => setFadeOut(true), 3000);
  };

  useEffect(() => {
    const eventSource = fetchConvoyage(
      (data) => {
        setBoites(data.boites || []);
        setLoading(false);

        // Mettez à jour `current` uniquement si la boîte a changé
        if (data.current.number !== current.number || (data.current.number === current.number && data.current.saved !== current.saved)) {
          setCurrent(data.current);
        }
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
  }, [session?.accessToken, current.number, current.saved]);

  // Affichez une notification lorsque `current` est mis à jour
  useEffect(() => {
    if (current.number !== 0) {
      const message = `L'utilisateur a ${current.saved ? "pointé" : "remis en circulation"} la ${current.label}.`;
      showNotification(message);
    }
  }, [current]); // Déclenche uniquement lorsque `current` change

  if (loading) {
    return <div>Chargement du dashboard...</div>;
  }

  const getBoxText = (label, code) => {
    if (breakpoint === "xs" || breakpoint === "sm") {
      return code;
    }
    return label;
  };

  return (
    <ProtectedRoute>
      <Container fluid className="flex-grow-1">
        {notification !== "" && (
          <Row className={`message-container  ${fadeOut ? "fade-out" : "fade-in"}`}>
            <Alert variant="info">
              <h3>{notification}</h3>
            </Alert>
          </Row>
        )}
        <Row>
          <Col md={{ span: 11, offset: 1 }} className="text-left">
            <h3>SANCTUAIRE</h3>
          </Col>
        </Row>
        <Row>
          {/*** BOITE 28 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={1}>
            <Card
              className={`border-3 reduced-card ${boites[28]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-autre"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={` ${boites[28]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-autre text-white"
                      }`}
                  >
                    {boites[28]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[28]?.code}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 1 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[1]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0107"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[1]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0107 text-white"
                      }`}
                  >
                    {boites[1]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[1]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** ESTRADE ***/}
          <Col xs={6} sm={4} md={3} lg={4} xl={6}>
            <Card className="border-3 reduced-card">
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge className="bg-light text-body">0</Badge>
                </h4>
                <CardText>ESTRADE</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 7 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[7]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0107"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[7]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0107 text-white"
                      }`}
                  >
                    {boites[7]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[7]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 30 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={1}>
            <Card
              className={`border-3 reduced-card ${boites[30]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-autre"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[30]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-autre text-white"
                      }`}
                  >
                    {boites[30]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[30]?.code}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* LIGNE 2*/}
        <Row className="justify-content-between">
          {/*** BOITE 29 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={1}>
            <Card
              className={`border-3 reduced-card ${boites[29]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-autre"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[29]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-autre text-white"
                      }`}
                  >
                    {boites[29]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[29]?.code}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 2 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[2]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0107"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[2]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0107 text-white"
                      }`}
                  >
                    {boites[2]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[2]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 3 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[3]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0107"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[3]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0107 text-white"
                      }`}
                  >
                    {boites[3]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[3]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 4 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[4]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0107"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[4]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0107 text-white"
                      }`}
                  >
                    {boites[4]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[4]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 5 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[5]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0107"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[5]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0107 text-white"
                      }`}
                  >
                    {boites[5]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[5]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 6 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[6]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0107"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[6]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0107 text-white"
                      }`}
                  >
                    {boites[6]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[6]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 31 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={1}>
            <Card
              className={`border-3 reduced-card ${boites[31]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-autre"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[31]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-autre text-white"
                      }`}
                  >
                    {boites[31]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[31]?.code}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* LIGNE 3 */}
        <Row>
          {/*** BOITE 8 ***/}
          <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
            <Card
              className={`border-3 reduced-card ${boites[8]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0812"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[8]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0812 text-white"
                      }`}
                  >
                    {boites[8]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[8]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 9 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[9]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0812"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[9]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0812 text-white"
                      }`}
                  >
                    {boites[9]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[9]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 10 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[10]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0812"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[10]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0812 text-white"
                      }`}
                  >
                    {boites[10]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[10]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 11 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[11]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0812"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[11]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0812 text-white"
                      }`}
                  >
                    {boites[11]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[11]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 12 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[12]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-0812"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[12]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-0812 text-white"
                      }`}
                  >
                    {boites[12]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[12]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* LIGNE 3 Bis */}
        <Row>
          {/*** BOITE 13 ***/}
          <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
            <Card
              className={`border-3 reduced-card ${boites[13]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1317"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[13]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1317 text-white"
                      }`}
                  >
                    {boites[13]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[13]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 14 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[14]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1317"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[14]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1317 text-white"
                      }`}
                  >
                    {boites[14]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[14]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 15 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[15]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1317"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[15]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1317 text-white"
                      }`}
                  >
                    {boites[15]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[15]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 16 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[16]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1317"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[16]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1317 text-white"
                      }`}
                  >
                    {boites[16]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[16]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 17 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[17]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1317"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[17]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1317 text-white"
                      }`}
                  >
                    {boites[17]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[17]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* LIGNE 4 */}
        <Row>
          {/*** BOITE 18 ***/}
          <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
            <Card
              className={`border-3 reduced-card ${boites[18]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1822"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[18]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1822 text-white"
                      }`}
                  >
                    {boites[18]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[18]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 19 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[19]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1822"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[19]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1822 text-white"
                      }`}
                  >
                    {boites[19]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[19]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 20 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[20]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1822"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[20]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1822 text-white"
                      }`}
                  >
                    {boites[20]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[20]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 21 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[21]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1822"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[21]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1822 text-white"
                      }`}
                  >
                    {boites[21]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[21]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 22 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[22]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-1822"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[22]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-1822 text-white"
                      }`}
                  >
                    {boites[22]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[22]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* LIGNE 4 Bis */}
        <Row>
          {/*** BOITE 23 ***/}
          <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
            <Card
              className={`border-3 reduced-card ${boites[23]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-2327"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[23]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-2327 text-white"
                      }`}
                  >
                    {boites[23]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[23]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 24 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[24]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-2327"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[24]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-2327 text-white"
                      }`}
                  >
                    {boites[24]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[24]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 25 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[25]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-2327"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[25]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-2327 text-white"
                      }`}
                  >
                    {boites[25]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[25]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 26 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[26]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-2327"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[26]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-2327 text-white"
                      }`}
                  >
                    {boites[26]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[26]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 27 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[27]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-2327"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[27]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-2327 text-white"
                      }`}
                  >
                    {boites[27]?.number}
                  </Badge>
                </h4>
                <CardText>{boites[27]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {/*** BOITE 32 ***/}
          <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
            <Card
              className={`border-3 reduced-card ${boites[32]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-autre"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[32]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-autre text-white"
                      }`}
                  >
                    {boites[32]?.number}
                  </Badge>
                  <small>&nbsp;Mezz.</small>
                </h4>
                <CardText>{boites[32]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 33 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[33]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-boite-autre"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[33]?.saved
                      ? "bg-light text-body"
                      : "bg-boite-autre text-white"
                      }`}
                  >
                    {boites[33]?.number}
                  </Badge>
                  <small>&nbsp;Nurs.</small>
                </h4>
                <CardText>{boites[33]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 34 (SI ACTIVEE) ***/}
          {boites[34]?.enabled && (
            <Col xs={6} sm={4} md={3} lg={2} xl={2}>
              <Card
                className={`border-3 reduced-card ${boites[34]?.saved
                  ? "text-white bg-success border-dark"
                  : "text-dark border-boite-autre"
                  }`}
              >
                <CardBody className="d-flex align-items-center justify-content-between">
                  <h4>
                    <Badge
                      className={`${boites[34]?.saved
                        ? "bg-light text-body"
                        : "bg-boite-autre text-white"
                        }`}
                    >
                      {boites[34]?.number}
                    </Badge>
                  </h4>
                  <CardText>{boites[34]?.label}</CardText>
                </CardBody>
              </Card>
            </Col>
          )}
          {/*** BOITE 35 (SI ACTIVEE) ***/}
          {boites[35]?.enabled && (
            <Col xs={6} sm={4} md={3} lg={2} xl={2}>
              <Card
                className={`border-3 reduced-card ${boites[35]?.saved
                  ? "text-white bg-success border-dark"
                  : "text-dark border-boite-autre"
                  }`}
              >
                <CardBody className="d-flex align-items-center justify-content-between">
                  <h4>
                    <Badge
                      className={`${boites[35]?.saved
                        ? "bg-light text-body"
                        : "bg-boite-autre text-white"
                        }`}
                    >
                      {boites[35]?.number}
                    </Badge>
                  </h4>
                  <CardText>{boites[35]?.label}</CardText>
                </CardBody>
              </Card>
            </Col>
          )}
          {/*** BOITE 36 (SI ACTIVEE) ***/}
          {boites[36]?.enabled && (
            <Col xs={6} sm={4} md={3} lg={2} xl={2}>
              <Card
                className={`border-3 reduced-card ${boites[36]?.saved
                  ? "text-white bg-success border-dark"
                  : "text-dark border-boite-autre"
                  }`}
              >
                <CardBody className="d-flex align-items-center justify-content-between">
                  <h4>
                    <Badge
                      className={`${boites[36]?.saved
                        ? "bg-light text-body"
                        : "bg-boite-autre text-white"
                        }`}
                    >
                      {boites[36]?.number}
                    </Badge>
                  </h4>
                  <CardText>{boites[36]?.label}</CardText>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
        {(boites[37]?.enabled || boites[38]?.enabled || boites[39]?.enabled || boites[40]?.enabled || boites[41]?.enabled) && (
          <Row>
            { /*** BOITE 37 ***/
              boites[37].enabled && (
                <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
                  <Card
                    className={`border-3 reduced-card ${boites[37]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[37]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[37]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[37]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 38 ***/
              boites[38].enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[38]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[38]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[38]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[38]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 39 ***/
              boites[39].enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[39]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[39]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[39]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[39]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 40 ***/
              boites[40].enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[40]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[40]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[40]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[40]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 41 ***/
              boites[41].enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[41]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[41]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[41]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[41]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
          </Row>
        )}
        {(boites[42]?.enabled || boites[43]?.enabled || boites[44]?.enabled || boites[45]?.enabled || boites[46]?.enabled) && (
          <Row>
            { /*** BOITE 42 ***/
              boites[42]?.enabled && (
                <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
                  <Card
                    className={`border-3 reduced-card ${boites[42]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[42]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[42]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[42]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 43 ***/
              boites[43]?.enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[43]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[43]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[43]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[43]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 44 ***/
              boites[44]?.enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[44]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[44]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[44]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[44]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 45 ***/
              boites[45]?.enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[45]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[45]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[45]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[45]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 46 ***/
              boites[46]?.enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[46]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[46]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[46]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[46]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
          </Row>
        )}
        {(boites[47]?.enabled || boites[48]?.enabled || boites[49]?.enabled) && (
          <Row>
            { /*** BOITE 47 ***/
              boites[47]?.enabled && (
                <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
                  <Card
                    className={`border-3 reduced-card ${boites[47]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[47]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[47]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[47]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 48 ***/
              boites[48]?.enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[48]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[48]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[48]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[48]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
            { /*** BOITE 49 ***/
              boites[49]?.enabled && (
                <Col xs={6} sm={4} md={3} lg={2} xl={2}>
                  <Card
                    className={`border-3 reduced-card ${boites[49]?.saved
                      ? "text-white bg-success border-dark"
                      : "text-dark border-boite-autre"
                      }`}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <h4>
                        <Badge
                          className={`${boites[49]?.saved
                            ? "bg-light text-body"
                            : "bg-boite-autre text-white"
                            }`}
                        >
                          {boites[49]?.number}
                        </Badge>
                      </h4>
                      <CardText>{boites[49]?.label}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )}
          </Row>
        )}
        <Row>
          <Col md={{ span: 11, offset: 1 }} className="text-left mt-3">
            <h3>SUPER EGLISE</h3>
          </Col>
        </Row>
        <Row>
          {/*** BOITE 50 ***/}
          <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
            <Card
              className={`border-3 reduced-card ${boites[50]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-info"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[50]?.saved ? "bg-light text-body" : "bg-info text-white"
                      }`}
                  >
                    {boites[50]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[50]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 51 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[51]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-info"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[51]?.saved ? "bg-light text-body" : "bg-info text-white"
                      }`}
                  >
                    {boites[51]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[51]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 52 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[52]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-info"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[52]?.saved ? "bg-light text-body" : "bg-info text-white"
                      }`}
                  >
                    {boites[52]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[52]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 53 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[53]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-warning"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[53]?.saved
                      ? "bg-light text-body"
                      : "bg-warning text-white"
                      }`}
                  >
                    {boites[53]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[53]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 54 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[54]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-success"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[54]?.saved
                      ? "bg-light text-body"
                      : "bg-success text-white"
                      }`}
                  >
                    {boites[54]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[54]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 55 ***/}
          <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
            <Card
              className={`border-3 reduced-card ${boites[55]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-danger"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[55]?.saved ? "bg-light text-body" : "bg-danger text-white"
                      }`}
                  >
                    {boites[55]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[55]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 56 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[56]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-danger"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[56]?.saved ? "bg-light text-body" : "bg-danger text-white"
                      }`}
                  >
                    {boites[56]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[56]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 57 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[57]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-danger"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[57]?.saved ? "bg-light text-body" : "bg-danger text-white"
                      }`}
                  >
                    {boites[57]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[57]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 11, offset: 1 }} className="text-left mt-3">
            <h3>A2D et SHR</h3>
          </Col>
        </Row>
        <Row>
          {/*** BOITE 58 ***/}
          <Col xs={6} sm={4} md={3} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
            <Card
              className={`border-3 reduced-card ${boites[58]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-secondary"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[58]?.saved
                      ? "bg-light text-body"
                      : "bg-secondary text-white"
                      }`}
                  >
                    {boites[58]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[58]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 59 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[59]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-secondary"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[59]?.saved
                      ? "bg-light text-body"
                      : "bg-secondary text-white"
                      }`}
                  >
                    {boites[59]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[59]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 60 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[60]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-dark"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[60]?.saved ? "bg-light text-body" : "bg-dark text-white"
                      }`}
                  >
                    {boites[60]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[60]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
          {/*** BOITE 61 ***/}
          <Col xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card
              className={`border-3 reduced-card ${boites[61]?.saved
                ? "text-white bg-success border-dark"
                : "text-dark border-dark"
                }`}
            >
              <CardBody className="d-flex align-items-center justify-content-between">
                <h4>
                  <Badge
                    className={`${boites[61]?.saved ? "bg-light text-body" : "bg-dark text-white"
                      }`}
                  >
                    {boites[61]?.number}
                  </Badge>
                  &nbsp;
                </h4>
                <CardText>{boites[61]?.label}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </ProtectedRoute>);
};

export default Dashboard;
