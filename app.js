const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const config = require("./config/dbConnection.json");
const cors = require("cors");
const dotenv = require("dotenv");
const googleAuth = require("./routes/index");
const passport = require("passport");
const session = require("express-session");
const multer = require("multer");
const fs = require("fs");
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
const uploadRouter = require("./routes/uploadRouter");
const userRouter = require("./routes/UserRoutes");
const domaineRouter = require("./routes/domaine");
const interviewRouter = require("./routes/interview");
const antiTricherie = require("./models/antiTricherie");

app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./auth/google-auth")(passport);

app.use("/", googleAuth);
/**upload  */
const upload = multer({ dest: "uploads/" }); // Dossier de destination pour enregistrer les fichiers

let videoCounter = 0; // Compteur pour numéroter les vidéos

app.post("/upload-video", upload.single("video"), async (req, res) => {
	try {
		// Chemin d'accès au dossier de destination
		const destinationFolder =
			"G:/Pidev-4Twin/Frontend-Test/Frontend-EspritNetwork/src/assets/video";

		// Vérifie si le dossier de destination existe, sinon le crée
		if (!fs.existsSync(destinationFolder)) {
			fs.mkdirSync(destinationFolder, { recursive: true });
		}

		// Déplace le fichier vidéo depuis le dossier temporaire vers le dossier de destination
		const oldPath = req.file.path;
		videoCounter = videoCounter + 1;
		const newPath = `${destinationFolder}/video${videoCounter}.webm`; // Renomme le fichier avec un nom unique
		fs.renameSync(oldPath, newPath);
		// try {
		// 	log;
		// 	await AntiTricherie.findOneAndUpdate(
		// 		{ idCandidat: req.body.idCandidat, idTest: req.body.idTest },
		// 		{ vedioNavigateur: newPath }
		// 	);
		// } catch (error) {
		// 	console.log("antichhh", error);
		// }
		console.log("Video saved successfully at:", newPath);
		res.send("Video uploaded and saved successfully");

		videoCounter++; // Incrémente le compteur pour la prochaine vidéo
	} catch (error) {
		console.error("Error saving video:", error);
		res.status(500).send("Internal Server Error");
	}
});

// API
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
app.use("/upload", uploadRouter);
app.use("/domaine", domaineRouter);
app.use("/interview", interviewRouter);

dotenv.config();
const PORT = process.env.PORT || 3000;

// Start the server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
