import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "connect-flash";

import route from "./routes/routes.js";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "pug");
app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

mongoose
  .connect('mongodb://127.0.0.1:27017/students', {
    useNewUrlParser: true,
    useUnifiedTopology: true, // options qui évitent des warnings inutiles
  })
  .then(init);


async function init() {

  // Initialisation de l'app Express
  const app = express();

  // ==========
  // App middlewares
  // ==========
  
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      name: "simple",
      secret: "simple",
      resave: false,
      saveUninitialized: true,
    })
  );

//   app.use(flash());
//   app.use((req, res, next) => {
//     res.locals.flash_message = req.flash("error");
//     res.locals.messages = [];
//     next();
// });
  // ==========
  // App routers
  // ==========

  app.use("/", route);

  // ==========
  // App start
  // ==========

  app.listen(APP_PORT, () => {
    console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
  });
}