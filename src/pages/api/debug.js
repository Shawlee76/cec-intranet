export default function handler(req, res) {
    console.log("Cookies reçus par le serveur :", req.cookies);
    res.status(200).json({ cookies: req.cookies });
  }
  