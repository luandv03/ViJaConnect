import { Router } from "express";
import { UserController } from "../../../controllers/users/user.controller.js";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/contacts/:userId", userController.getUserContacts);

export default userRoutes;
