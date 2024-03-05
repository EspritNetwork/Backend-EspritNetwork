const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyperser = require("body-parser");
const config = require("./config/dbConnection.json");
const cors = require("cors"); // Import cors middleware
const dotenv = require("dotenv");

//connect to bd
mongoose
	.connect(config.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

//create an instance of the app
var app = express();

// for enabling cors middelware
app.use(cors());
app.use(bodyperser.json());
const testRouter = require("./routes/test");
const questionRouter = require("./routes/question");
const cvRouter = require("./routes/cv");
const offreRouter = require("./routes/offre");
const condidacyRouter = require("./routes/condidacy");
const affiliationRouter = require("./routes/affiliation");
const competenceRouter = require("./routes/competence");
const domaineRouter = require("./routes/domaine");
const departementRouter = require("./routes/departement");
const userRouter = require("./routes/UserRoutes");

app.use("/api/users", userRouter);

app.use("/test", testRouter);
app.use("/question", questionRouter);
app.use("/cv", cvRouter);
app.use("/offre", offreRouter);
app.use("/condidacy", condidacyRouter);
app.use("/affiliation", affiliationRouter);
app.use("/competence", competenceRouter);
app.use("/domaine", domaineRouter);
app.use("/departement", departementRouter);

dotenv.config();

//server configuration
const server = http.createServer(app);
server.listen(3000, console.log("server listening on port 3000"));

module.exports = app;
