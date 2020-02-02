const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://detoner:detoner@cookbook-app-cluster-xsykg.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
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
