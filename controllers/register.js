import crypto from "crypto";
import dotenv from "dotenv";
import User from "../Models/User.js"

dotenv.config();
const { SECRET } = process.env;

export default (req, res) => {
  let { firstName, lastName, email, password, password_confirm } = req.body;
  let formSucces = true;
  let error = "";

  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    req.session.message =  "Invalid email format"; 
    formSucces = false;
  }
  if (password !== password_confirm) {
    req.session.message = "Les mots de passe sont différent.";
    formSucces = false;
  }
  else {
    const sha256Hasher = crypto.createHmac("sha256", SECRET);
    password = sha256Hasher.update(password).digest("hex");
  }

  if(formSucces){

    const newUser = new User({ firstName, lastName, email, password });
    newUser.save((err) => {
        if (err) {
          req.session.message = "Un utilisateur existe déjà avec cette adresse mail."
          console.log('err:', err)
          res.redirect("/");
        }
        else {
          req.session.message = "L'utilisateur à bien été enregistré."
          res.redirect("/login");
        }
    });
  }
  else res.redirect("/");
};
