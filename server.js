const fs = require('fs');
const https = require('https');
const http = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'; // Vérifier si on est en mode développement
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3001;  // Utiliser la variable d'environnement PORT si elle est définie

app.prepare().then(() => {
  if (dev) {
    // En mode développement, utiliser HTTPS avec des certificats locaux
    const httpsOptions = {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    };

    https.createServer(httpsOptions, (req, res) => {
      handle(req, res);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log('> Ready on https://localhost:3001');
    });
  } else {
    // En production, utiliser HTTP (ou configurer HTTPS via un proxy NGINX par exemple)
    http.createServer((req, res) => {
      handle(req, res);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${process.env.NEXTAUTH_URL}`);
    });
  }
});
