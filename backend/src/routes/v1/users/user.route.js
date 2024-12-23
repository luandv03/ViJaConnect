import { Router } from "express";
import { UserController } from "../../../controllers/users/user.controller.js";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/user/create", userController.createUser);
userRoutes.post("/user/increase-points", userController.increaseUserPoints);
userRoutes.put("/user/admin/update", userController.updateUserByAdmin);

export default userRoutes;
