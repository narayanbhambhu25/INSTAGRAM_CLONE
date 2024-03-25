const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

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

app.listen(PORT, () => {
  console.log("Running on", PORT);
});
