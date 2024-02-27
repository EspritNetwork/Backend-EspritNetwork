const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const config = require("./config/dbConnection.json");
const cors = require("cors");
const dotenv = require("dotenv");

// Connect to database
mongoose
  .connect(config.url)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Create an instance of the app
const app = express();

// Enable CORS middleware
app.use(cors());
app.use(bodyparser.json());
const testRouter = require("./routes/test");
const questionRouter = require("./routes/question");
const cvRouter = require("./routes/cv");
const offreRouter = require("./routes/offre");
const condidacyRouter = require("./routes/condidacy");
const affiliationRouter = require("./routes/affiliation");
const competenceRouter = require("./routes/competence");
const departementRouter = require("./routes/departement");

const userRouter = require("./routes/UserRoutes");

// API
app.use("/api/users", userRouter);

app.use("/test", testRouter);
app.use("/question", questionRouter);
app.use("/cv", cvRouter);
app.use("/offre", offreRouter);
app.use("/condidacy", condidacyRouter);
app.use("/affiliation", affiliationRouter);
app.use("/competence", competenceRouter);
app.use("/departement", departementRouter);

dotenv.config();
const PORT = process.env.PORT || 3000;

// Start the server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;