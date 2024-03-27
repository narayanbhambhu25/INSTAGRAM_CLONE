const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/keys");

mongoose.connect(MONGOURI);
mongoose.connection.on("connected", () => {
  console.log("conn to Mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("error to conn to Mongo", err);
});

require("./models/user");
require("./models/post");
mongoose.model("User");

app.use(express.json()); // kind of middleware to handle incoming req from frontend beefore reaching the actual route handler
app.use(require("./routes/auth")); // to register the route
app.use(require("./routes/post"));
app.use(require("./routes/user"));

if (process.env.NODE_ENV == "production") {
  // if our file is on production side
  app.use(express.static("client/build")); // first will serve build folder
  const path = require("path");
  app.get("*", (req, res) => {
    // if client make any request we will index.htm file i.e. present build folder
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Running on", PORT);
});
