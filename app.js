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


// Connect to database
mongoose
  .connect(config.url)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


  
// Create an instance of the app
const app = express();


// Configuration de la limite de taille maximale pour les données de requête
app.use(bodyparser.json({ limit: '10500mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '10500mb' }));

// Enable CORS middleware
app.use(cors());
const testRouter = require("./routes/test");
const questionRouter = require("./routes/question");
const cvRouter = require("./routes/cv");
const offreRouter = require("./routes/offre");
const condidacyRouter = require("./routes/condidacy");
const affiliationRouter = require("./routes/affiliation");
const competenceRouter = require("./routes/competence");
const departementRouter = require("./routes/departement");
const uploadRouter = require('./routes/uploadRouter');
const userRouter = require("./routes/UserRoutes");
const domaineRouter = require("./routes/domaine");
const collectionRouter = require("./routes/collection");



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
app.use('/upload', uploadRouter);
app.use("/domaine", domaineRouter);
app.use("/collection", collectionRouter );



dotenv.config();
const PORT = process.env.PORT || 3000;

// Start the server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;