const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/my_database", {
  useNewUrlParser: true
});

const uri = process.env.MONGODB_URI;
mongoose.connect(uri || "mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

//Configuration
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const recipesRouter = require("./routes/recipes");
const backupsRouter = require("./routes/backups");

app.use("/recipes", recipesRouter);
app.use("/backups", backupsRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); //relative path
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//npm run server
