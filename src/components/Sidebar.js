import React from "react";
import { Nav } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  FaHome,
  FaFileAlt,
  FaInfoCircle,
  FaUser,
  FaLaptop,
  FaRegEdit,
} from "react-icons/fa"; // Importer des icônes spécifiques

const Sidebar = () => {
  const { data: session, status } = useSession();

  return (
    <React.Fragment>
      <div className="sidebar-sticky">
      <Nav
        defaultActiveKey="/"
        className="flex-column bg-white p-0 h-100 border-top"
      >
        <Nav.Item>
          <Link href="/" passHref legacyBehavior>
            <Nav.Link>
              <FaHome className="me-2" /> {/* Icône pour Home */}
              Accueil
            </Nav.Link>
          </Link>
        </Nav.Item>
        {status === "authenticated" && (
          <React.Fragment>
            <Nav.Item>
              <Link href="/dashboard" passHref legacyBehavior>
                <Nav.Link>
                  <FaLaptop className="me-2" />
                  Tableau de bord
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/pointage" passHref legacyBehavior>
                <Nav.Link>
                  <FaRegEdit className="me-2" />
                  Pointage
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/page1" passHref legacyBehavior>
                <Nav.Link>
                  <FaFileAlt className="me-2" /> {/* Icône pour Page 1 */}
                  Page 1
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/page2" passHref legacyBehavior>
                <Nav.Link>
                  <FaInfoCircle className="me-2" /> {/* Icône pour Page 2 */}
                  Page 2
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/profile" passHref legacyBehavior>
                <Nav.Link>
                  <FaUser className="me-2" />
                  Profile
                </Nav.Link>
              </Link>
            </Nav.Item>
          </React.Fragment>
        )}
      </Nav>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
