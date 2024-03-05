const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const config = require("./config/dbConnection.json");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv");
const googleAuth = require("./routes/index");
const passport = require("passport");
const app = express();
//cors
app.use(cors());
//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
//dotenv
dotenv.config();
//morgan
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./auth/google-auth")(passport);

app.use("/", googleAuth);

app.use(express.static(path.join(__dirname, "public")));

// Connect to database
mongoose.connect(config.url)


// Create an instance of the app

// Enable CORS middleware
app.use(cors());
app.use(cookieParser());

const userRouter = require("./routes/UserRoutes");

app.use(bodyparser.json());
app.use("/user", userRouter);

// API
 app.use("/api/users", userRouter); // Choose one of these depending on your routing convention

// ERROR HANDLER
// app.use(NOTFOUND); // Define these middlewares or import them from other files
// app.use(errorHandler);
app.use(cors({ origin: "http://localhost:5173" }));
dotenv.config();
const PORT = process.env.PORT || 5000 ;

// Start the server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
