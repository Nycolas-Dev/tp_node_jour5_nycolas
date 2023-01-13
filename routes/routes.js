import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
import RegisterController from "../controllers/register.js";
import LoginController from "../controllers/login.js";
import DashboardController from "../controllers/dashboard.js";
import AccessController from "../controllers/access.js";

import authMiddleware from "../middleware/auth.js";
import logMiddleware from "../middleware/log.js";

router.get("/", HomeController);
router.post("/register", RegisterController);
router.post("/login/access", AccessController);
router.get("/login", logMiddleware, LoginController);
router.get("/dashboard", authMiddleware, DashboardController);

router.get('/logout', (req, res) => {
    req.session.auth = false;
    req.session.message = "";
    res.redirect('/');
});

export default router;
