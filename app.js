/*package express pour cree une application express nodejs */
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyperser = require("body-parser");

const config = require("./config/dbConnection.json");
var app = express();
//connect to bd
mongoose
	.connect(config.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyperser.json());

//middleware

//server configuration
const server = http.createServer(app);

server.listen(3000, console.log("server listening on port 3000"));

module.exports = app;
