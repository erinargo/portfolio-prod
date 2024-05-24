const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');

const bodyparser = require('body-parser');
const path = require('path');


const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const app = express();
const httpServer = http.createServer(app);
const httpsServer = http.createServer(credentials, app);

const HTTP_PORT = process.env.port || 80;
const HTTPS_PORT = process.env.port || 443;

app.use(bodyparser.json()); // Use middleware to interpret JSON
app.use(express.static(__dirname + '/front-end/build')); // Express will only read from front-end/build

app.get('*', (req, res) => { // App will accept all paths (ie /login /register /whatever) and run the following code
    // Result sends SPA file because of front-end routing
    res.sendFile(path.join(__dirname + '/front-end/build/index.html')); // Path middleware to make life easier
});

httpServer.listen(HTTP_PORT, () => console.log('Listening on: ' + HTTP_PORT));
httpsServer.listen(HTTPS_PORT, () => console.log('Listening on: ' + HTTPS_PORT));