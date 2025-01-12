import { ConvoyageService } from "../datas/convoyage-service";

let clients = [];
let convoyages = [];
let intialized = false;

export default async function handler(req, res) {
  const token = req.query.token;

  if (!token) {
    res.status(401).json({ message: "Token manquant" });
    return;
  }

  try {
    if (req.method === "GET") {
      // Configurer les en-têtes pour SSE
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("Access-Control-Allow-Origin", "*"); // Autorise toutes les origines
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Content-Type"
      );

      // Ajouter le client à la liste
      const clientId = Date.now();
      clients.push({ id: clientId, res });

      console.log(`Client connecté : ${clientId}`);

      if (!intialized) {
        await ConvoyageService.getList(token)
          .then((results) => {
            convoyages = results["hydra:member"] || [];
            console.log("Récupération des convoyages depuis API OK", convoyages);
            intialized = true;
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des convois", error);
          })
          .finally(() => {
            console.log("Fin récupération convoyages");
          });

      }
      // Envoyer les convoyages lors de la connexion
      clients.forEach((client) =>
        client.res.write(`data: ${JSON.stringify({ convoyages })}\n\n`)
      );
      res.status(200).json({ message: "Mise à jour des convoyages diffusée" });

      // Gérer la déconnexion du client
      req.on("close", () => {
        console.log(`Client déconnecté : ${clientId}`);
        clients = clients.filter((client) => client.id !== clientId);
      });
    } else {
      res.status(405).json({ message: "Méthode non autorisée" });
    }
  } catch (error) {
    console.error("Erreur côté serveur SSE :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
}
