const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
module.exports = app;
// This is the main entry point for the Trello API server.
// It sets up an Express server that listens on port 3000 and responds with "Hello World!" when the root URL is accessed.
// The server can be started by running `node src/server.js` from the command line.
// The server is also exported as a module for testing purposes.
// The server uses Express version 4.18.2 as a dependency, which is specified
