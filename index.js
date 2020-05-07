// Similar to import express from express
const express = require("express");

const server = express();

const PORT = 5000;

server.listen(PORT, () =>
  console.log(`\n *** API on http://localhost:${PORT} ***\n`)
);

// to run the server use: npm run server after you install nodemon
