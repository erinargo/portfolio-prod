const express = require('express');
const http = require('http');

const bodyparser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);

const PORT = process.env.port || 80;

app.use(bodyparser.json()); // Use middleware to interpret JSON
app.use(express.static(__dirname + '/front-end/build')); // Express will only read from front-end/build

app.get('*', (req, res) => { // App will accept all paths (ie /login /register /whatever) and run the following code
    // Result sends SPA file because of front-end routing
    res.sendFile(path.join(__dirname + '/front-end/build/index.html')); // Path middleware to make life easier
});

server.listen(PORT, () => console.log('Listening on: ' + PORT));