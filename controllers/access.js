import crypto from "crypto";
import User from "../Models/User.js"
import dotenv from "dotenv";

dotenv.config();
const { SECRET } = process.env;

export default async (req, res) => {

let { login, password } = req.body;
const sha256Hasher = crypto.createHmac("sha256", SECRET);
password = sha256Hasher.update(password).digest("hex");

  req.session.auth = false;

const user = await User.findOne({ email: login});

if (user) {

    if ( password === user.password && login === user.email) {
        req.session.auth = true;
      }
    if (req.session.auth) {
      res.redirect('/dashboard');
      return;
    }
    req.session.message = "Mot de passe incorect.";
    res.redirect("/login");
} else {
    req.session.message = "L'utilisateur n'existe pas.";
    //req.flash('error', "Email or password incorrect.");
}


}