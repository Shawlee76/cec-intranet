import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Table,
  Badge,
  Button,
  CardTitle,
} from "react-bootstrap";
import { useSession, signIn } from "next-auth/react";
import moment from "moment";
import prog31 from "../app/images/logo_31jours.png";
import yourLogo from "../app/images/your-logo.png";
import Image from "next/image";

const Home = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("authentifié");
      setLoading(false);
    }
  }, []);

  if (session && loading) {
    return <p>Chargement des applications</p>;
  }

  return (
    <Container fluid className="flex-grow-1">
      {!session ? (
        <div className="bg-light p-2 rounded-lg">
          <h1>CHARISMA.NET</h1>
          <h4>
            Bienvenu(e) sur le portail Intranet de Charisma Eglise Chrétienne
          </h4>
          <Row className="mt-3">
            <Col md={4}>
              <p>Merci de vous connectez pour accéder à vos applications</p>
            </Col>
            <Col md={4}>
              <button
                className="btn btn-outline-primary"
                onClick={() => signIn("keycloak", { callbackUrl: "/" })}
              >
                Se connecter avec Keycloak
              </button>
            </Col>
          </Row>
        </div>
      ) : (
        <React.Fragment>
          <Row className="mt-3">
            <Col xs={4} sm={2} md={2}>
              <Card className="text-center border-intranet ">
                <CardBody className="p-1">
                  <Image
                    alt="Prog 31 APP"
                    src={prog31}
                    sizes="30vw"
                    style={{
                      width: "50%",
                      height: "auto",
                    }}
                  />
                </CardBody>
                <CardFooter className="text-muted">
                  <h5>
                    <a
                      href="https://app.dev.prog31jours.jw-solutions.fr/"
                      target="_blank"
                    >
                      Prog31 App
                    </a>
                  </h5>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={4} sm={2} md={2}>
              <Card className="text-center border-intranet">
                <CardBody>
                  <Image
                    alt="Convoilibe"
                    src={yourLogo}
                    sizes="30vw"
                    style={{
                      width: "50%",
                      height: "auto",
                    }}
                  />
                </CardBody>
                <CardFooter className="text-muted">
                  <h5>
                    <a
                      href="https://app-dev-convoilibe.jw-solutions.fr/"
                      target="_blank"
                    >
                      Convoilibe
                    </a>
                  </h5>
                </CardFooter>
              </Card>
            </Col>
            <Col md={3}>
              <div className="card text-center">
                <div className="card-header">Featured</div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
                <div className="card-footer text-muted">2 days ago</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="card text-center">
                <div className="card-header">Featured</div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
                <div className="card-footer text-muted">2 days ago</div>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={2}>
              <div className="media mb-4">
                <Image
                  alt=""
                  src={prog31}
                  sizes="100vw"
                  style={{
                    width: "auto",
                    height: "100px",
                  }}
                />
                <div className="media-body">
                  <h5 className="mt-0 font-16">Media heading</h5>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <div className="media mb-4">
                <Image
                  alt=""
                  src={yourLogo}
                  sizes="100vw"
                  style={{
                    width: "auto",
                    height: "100px",
                  }}
                />
                <div className="media-body">
                  <h5 className="mt-0 font-16">Media heading</h5>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <div className="media mb-4 text-center">
                <Image
                  alt=""
                  src={yourLogo}
                  sizes="100vw"
                  style={{
                    width: "auto",
                    height: "100px",
                  }}
                  className="rounded avatar-md border-intranet"
                />
                <div className="media-body pt-2">
                  <h5 className="mt-0 font-16">Media heading</h5>
                </div>
              </div>
            </Col>



          </Row>
          <Row>
            <Col md={12}>
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
              </ul>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Home;
