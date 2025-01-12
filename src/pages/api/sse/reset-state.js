import { resetState } from "./sse-convoyage";

export default function handler(req, res) {
  if (req.method === "POST") {
    resetState();
    res.status(200).json({ message: "État réinitialisé avec succès" });
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
