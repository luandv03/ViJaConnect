// src/routes/v1/auth/auth.route.js
import { Router } from "express";
import { AuthController } from "../../../controllers/auth/auth.controller.js";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/auth/login", authController.login); // Route for login
authRoutes.post("/auth/change-password", authController.changePassword); // Route for changing password
authRoutes.post("/assign-role", authController.assignRoleToUser); // Route for assign role
authRoutes.post("/remove-role", authController.removeRoleFromUser); // Route for remove role

export default authRoutes;
