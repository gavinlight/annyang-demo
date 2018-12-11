const express = require('express');
const server = express();

const path = require('path');
const PORT = 3000;

server.use(express.static('app'));

server.listen(PORT, function () {
  console.log('Listening on port', PORT);
});
