// src/routes/v1/auth/auth.route.js
import { Router } from "express";
import { AuthController } from "../../../controllers/auth/auth.controller.js";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login); // Route for login
authRoutes.post("/change-password", authController.changePassword); // Route for changing password

export default authRoutes;
