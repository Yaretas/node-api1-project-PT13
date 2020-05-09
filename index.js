// Similar to import express from express
const express = require("express");
const shortid = require("shortid"); // library that will generate id's

const server = express();

//middleware - is a way to extend  or extra funtionality to express
server.use(express.json()); //<<<<< it is important

let users = [];

server.get("/", (req, res) => {
  res.json({ message: "API Running!" });
});

// ------  POST	/api/users	Creates a user using the information sent inside the request body. ----

server.post("/api/users", (req, res) => {
  //axios.post(/api/users, data) <--- The data shows up as the req.body on the server
  const userData = req.body;
  const { name, bio } = req.params;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    res.status(201).json(users);
  }
});

// --- GET	/api/users	Returns an array users.

server.get("/api/users", (req, res) => {
  res.status(201).json(users);
});
// --- GET	/api/users/:id	Returns the user object with the specified id.

server.get("/api/users/:id", (req, res) => {});
// --- DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const found = users.find((user) => user.id === id);

  if (found) {
    users = users.pop((user) => user.id === id);
    res
      .status(200)
      .json({ message: "The user with the specified ID no longer not exist." });
  } else if (!found) {
    users = users.filter((user) => user.id !== id);
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }
});
// --- PATCH	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user

// ====================================================================
// to run the server use: npm run server after you install nodemon
const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n *** API on http://localhost:${PORT} ***\n`)
);
