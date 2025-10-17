const http = require("http");
const express = require("express");

const app = express();

app.use((req, res) => {
  //   res.send("Welcome to the express")
  res.end("Welcome to the express");
});

app.listen(3012, "127.0.0.1", () => {
  console.log("server listening on port 3012");
});
