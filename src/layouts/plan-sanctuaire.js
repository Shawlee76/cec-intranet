"use client"; // Ajoutez cette ligne pour indiquer que ce composant doit être rendu côté client
import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from "react-bootstrap";


const PlanSanctuaire = () => {
  const [greenBox, setGreenBox] = useState(Array(34).fill(false)); // Crée un tableau d'état pour 34 blocs

  const handleClick = (index) => {
    const newBoxes = [...greenBox];
    newBoxes[index] = !newBoxes[index];
    setGreenBox(newBoxes);
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={{ span: 2, offset: 1 }}>
          <Card
            className={`border-3 ${
              greenBox[1]
                ? "text-white bg-success border-dark"
                : "text-dark border-danger"
            }`}
            onClick={() => handleClick(1)}
          >
            <CardHeader>
                <h4><Badge className={`${greenBox[1] ? "bg-light text-body" : "bg-danger text-white"}`}>1</Badge></h4>
            </CardHeader>
            <CardBody>
              <blockquote className="card-blockquote mb-0">
                <CardText>ASSISTANT & JOCELYNE.</CardText>
              </blockquote>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div
            id="block-28-29"
            className={`flex flex-col w-64 h-16 border-4 border-black rounded-md items-center justify-center text-lg font-bold ${
              greenBox[28] ? "bg-green-500" : ""
            }`}
            onClick={() => handleClick(28)} // Appelle la fonction avec l'index du bloc
          >
            <div className="w-64 h-24 border-2 border-black text-center">
              28
            </div>
            <div className="w-64 h-24 border-2 border-black text-center">
              29
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div
              id="block-1"
              className={`w-64 h-16 border-4 border-black rounded-md flex items-center justify-center text-lg font-bold ${
                greenBox[1] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(1)}
            >
              1
            </div>
            <div
              id="block-estrade"
              className={`col-span-3 w-full h-16 border-4 border-black rounded-md flex items-center justify-center text-lg font-bold ${
                greenBox[2] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(2)}
            >
              Estrade
            </div>
            <div
              id="block-7"
              className={`w-64 h-16 border-4 border-black rounded-md flex items-center justify-center text-lg font-bold ${
                greenBox[7] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(7)}
            >
              7
            </div>
            <div
              id="block-2"
              className={`w-64 h-16 border-4 border-black rounded-md flex items-center justify-center text-lg font-bold ${
                greenBox[2] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(2)}
            >
              2
            </div>
            <div
              id="block-3"
              className={`w-64 h-16 border-4 border-black rounded-md flex items-center justify-center text-lg font-bold ${
                greenBox[3] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(3)}
            >
              3
            </div>
            <div
              id="block-4"
              className={`w-64 h-16 border-4 border-black rounded-md flex items-center justify-center text-lg font-bold ${
                greenBox[4] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(4)}
            >
              4
            </div>
            <div
              id="block-5"
              className={`w-64 h-16 border-4 border-black rounded-md flex items-center justify-center text-lg font-bold ${
                greenBox[5] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(5)}
            >
              5
            </div>
            <div
              id="block-6"
              className={`w-64 h-16 border-4 border-black rounded-md flex items-center justify-center text-lg font-bold ${
                greenBox[6] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(6)}
            >
              6
            </div>
            <div
              id="block-08-13"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[8] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(8)}
            >
              <div className="border-2 border-black">08</div>
              <hr className="w-100" />
              <div className="border-2 border-black">13</div>
            </div>
            <div
              id="block-09-14"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[9] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(9)}
            >
              <div className="border-2 border-black">09</div>
              <hr className="w-100" />
              <div className="border-2 border-black">14</div>
            </div>
            <div
              id="block-10-15"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[10] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(10)}
            >
              <div className="border-2 border-black">10</div>
              <hr className="w-100" />
              <div className="border-2 border-black">15</div>
            </div>
            <div
              id="block-11-16"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[11] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(11)}
            >
              <div className="border-2 border-black">11</div>
              <hr className="w-100" />
              <div className="border-2 border-black">16</div>
            </div>
            <div
              id="block-12-17"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[12] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(12)}
            >
              <div className="border-2 border-black">12</div>
              <hr className="w-100" />
              <div className="border-2 border-black">17</div>
            </div>
            <div
              id="block-18-23"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[18] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(18)}
            >
              <div className="border-2 border-black">18</div>
              <hr className="w-100" />
              <div className="border-2 border-black">23</div>
            </div>
            <div
              id="block-19-24"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[19] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(19)}
            >
              <div className="border-2 border-black">19</div>
              <hr className="w-100" />
              <div className="border-2 border-black">24</div>
            </div>
            <div
              id="block-20-25"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[20] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(20)}
            >
              <div className="border-2 border-black">20</div>
              <hr className="w-100" />
              <div className="border-2 border-black">25</div>
            </div>
            <div
              id="block-21-26"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[21] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(21)}
            >
              <div className="border-2 border-black">21</div>
              <hr className="w-100" />
              <div className="border-2 border-black">26</div>
            </div>
            <div
              id="block-22-27"
              className={`w-64 h-16 border-4 border-black rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                greenBox[22] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(22)}
            >
              <div className="border-2 border-black">22</div>
              <hr className="w-100" />
              <div className="border-2 border-black">27</div>
            </div>
          </div>

          <div
            id="block-30-31"
            className={`flex flex-col w-64 h-16 border-4 border-black rounded-md items-center justify-center text-lg font-bold ${
              greenBox[30] ? "bg-green-500" : ""
            }`}
            onClick={() => handleClick(30)}
          >
            <div className="w-64 h-24 border-2 border-black text-center">
              30
            </div>
            <div className="w-64 h-24 border-2 border-black text-center">
              31
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div
            id="block-32"
            className={`flex flex-col w-64 h-16 border-4 border-black rounded-md items-center justify-center text-lg font-bold ${
              greenBox[32] ? "bg-green-500" : ""
            }`}
            onClick={() => handleClick(32)}
          >
            <div className="w-64 h-24 border-2 border-black text-center">
              32
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div
              id="block-24"
              className={`w-64 h-16 border-4 border-black rounded-md flex items-center justify-center text-lg font-bold ${
                greenBox[24] ? "bg-green-500" : ""
              }`}
              onClick={() => handleClick(24)}
            >
              24
            </div>
          </div>

          <div
            id="block-33"
            className={`flex flex-col w-64 h-16 border-4 border-black rounded-md items-center justify-center text-lg font-bold ${
              greenBox[33] ? "bg-green-500" : ""
            }`}
            onClick={() => handleClick(33)}
          >
            <div className="w-64 h-24 border-2 border-black text-center">
              33
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlanSanctuaire;
