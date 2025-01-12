import { ConvoyageService } from "../datas/convoyage-service";

let clients = [];
let convoyage = { label: "Pas de convoi en cours", id: 0 };
let boxes = Array(100).fill({
  enabled: false,
  saved: false,
  label: "N.A",
  code: "N.A",
  css: "N.A",
  zone: "N.A",
  number: 0,
  idConvoi: 0,
});
let initialized = false;
let changedBox = { enabled: false, saved: false, label: "N.A", code: "N.A", css: "N.A", zone: "N.A", number: 0, idConvoi: 0,};

export default async function handler(req, res) {
  const token = req.query.token;

  if (!token) {
    res.status(401).json({ message: "Token manquant" });
    return;
  }

  if (req.method === "GET") {
    // Configurer les en-têtes pour SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type"
    );

    const clientId = Date.now();
    clients.push({ id: clientId, res });

    console.log(`Client connecté 2 : ${clientId}`);

    if (!initialized && token !== "undefined") {
      const apiConvoyage = await ConvoyageService.getLatestConvoyage(token);

      if (apiConvoyage["hydra:member"].length !== 0) {
        let item = apiConvoyage["hydra:member"][0];
        convoyage = {
          label: item.label,
          startDate: item.startDate,
          endDate: item.endDate,
          opened: item.opened,
        };

        if (item?.conveyings) {
          const updatedBoites = item.conveyings.map((element) => ({
            saved: element.recorded,
            enabled: element.enabled,
            label: element.box.label,
            code: element.box.code,
            css: element.box.cssClass,
            zone: element.box.zone.code,
            number: element.box.number,
            idConvoi: element.id,
          }));

          updatedBoites?.forEach((element) => {
            boxes[element.number] = element;
          });
          console.log("Récupération des boites depuis API OK.");

        }
        initialized = true; // Marquer les boîtes comme initialisées
      }
    }

    clients.forEach((client) =>
      client.res.write(`data: ${JSON.stringify({ convoyage: convoyage, boites: boxes, current: changedBox })}\n\n`)
    );
    res.status(200).json({ message: "Mise à jour du convoyage en cours diffusée" });

    req.on("close", () => {
      console.log(`Client déconnecté : ${clientId}`);
      clients = clients.filter((client) => client.id !== clientId);
    });
  }
  else if (req.method === "POST") {
    res.status(405).json({ message: "Méthode POST non autorisée" });
  }
  else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

export function resetState() {
  convoyage = { label: "Pas de convoi en cours", id: 0 };
  initialized = false;
  boxes = Array(100).fill({ enabled: false, saved: false, label: "N.A", code: "N.A", css: "N.A", zone: "N.A", number: 0, idConvoi: 0, });
  console.log("État réinitialisé.");
}

export async function toggleBoite(boite) {
  if (boite.idBoite >= 0 && boite.idBoite < boxes.length) {
    let response = await ConvoyageService.toggleBoite(boite.token, boite.idConvoi, boite.state);
    
    const updatedBoites = [...boxes]; 
    updatedBoites[boite.idBoite].saved = boite.state;
    boxes = updatedBoites;
    changedBox = boxes[boite.idBoite];

    console.log(`Mise à jour boite n° ${boite.idBoite} réussie `);
  } else {
    console.log(`Id boite ${boite.idBoite} invalide`);
  }
}


