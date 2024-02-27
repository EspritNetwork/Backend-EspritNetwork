const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dbConnection.json");
const cors = require("cors");

// Connect to the database
mongoose
  .connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

console.log("Connecting to MongoDB:", config.url);

// Create an instance of the app
const app = express();

// Enable CORS middleware
app.use(cors());

const testRouter = require("./routes/test");
const questionRouter = require("./routes/question");
const cvRouter = require("./routes/cv");
const offreRouter = require("./routes/offre");
const condidacyRouter = require("./routes/condidacy");
const userRouter = require("./routes/user");
const affiliationRouter = require("./routes/affiliation");
const competenceRouter = require("./routes/competence");
const departementRouter = require("./routes/departement");


app.use(bodyParser.json());

app.use("/test", testRouter);
app.use("/question", questionRouter);
app.use("/cv", cvRouter);
app.use("/offre", offreRouter);
app.use("/condidacy", condidacyRouter);
app.use("/user", userRouter);
app.use("/affiliation", affiliationRouter);
app.use("/competence", competenceRouter);
app.use("/departement", departementRouter);

// Server configuration
const server = http.createServer(app);
const port = 3000;
server.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
