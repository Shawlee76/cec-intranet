import { toggleBoite } from "./sse-convoyage";

export default function handler(req, res) {
  if (req.method === "POST") {
    const boite = req.body;
    
    toggleBoite(boite);
    res.status(200).json({ message: "État réinitialisé avec succès" });
  } 
  if (req.method === "GET") {
    res.status(200).json({ message: "message toggle-boite envoyé" });
  }
  else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}