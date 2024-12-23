import { userService } from "../../services/users/user.service.js";

export class UserController {
  async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const newUser = await userService.saveUser({
        name,
        email,
        password,
        role,
      });
      return res.json({
        status: 201,
        message: "User created successfully.",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Failed to create user.",
        error: error.message,
      });
    }
  }

  async increaseUserPoints(req, res) {
    try {
      const { user_id, points } = req.body;
      const updatedUser = await userService.increaseUserPoints(user_id, points);
      return res.json({
        status: 200,
        message: "User points increased successfully",
        new_user_point: updatedUser,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to increase user points",
        error: error.message,
      });
    }
  }
}
