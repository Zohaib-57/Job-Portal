import express from "express";
import {
	register,
    updateProfile,
	Login,
    Logout,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(Login);
router.route("/profile/update").post(isAuthenticated, updateProfile);
router.route("/logout").get(Logout)

export default router;
