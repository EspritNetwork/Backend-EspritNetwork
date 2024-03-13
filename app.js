/*package express pour cree une application express nodejs */
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyperser = require("body-parser");
const config = require("./config/dbConnection.json");
const cors = require("cors"); // Import cors middleware


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



const testRouter = require("./routes/test");
const questionRouter = require("./routes/question");
const cvRouter = require("./routes/cv");
const offreRouter = require("./routes/offre");
const condidacyRouter = require("./routes/condidacy");
const userRouter = require("./routes/user");
const collectionRouter = require("./routes/collection");


// Configuration de la limite de taille maximale pour les données de requête
app.use(bodyperser.json({ limit: '10500mb' }));
app.use(bodyperser.urlencoded({ extended: true, limit: '10500mb' }));


app.use("/test", testRouter);
app.use("/question", questionRouter);
app.use("/cv", cvRouter);
app.use("/offre", offreRouter);
app.use("/condidacy", condidacyRouter);
app.use("/user", userRouter);
app.use("/collection", collectionRouter );




//server configuration
const server = http.createServer(app);
server.listen(3000, console.log("server listening on port 3000"));

module.exports = app;
