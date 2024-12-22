// src/controllers/auth/auth.controller.js
import { authService } from "../../services/auth/auth.service.js";

export class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user_id = await authService.login(email, password);
      return res.json({
        status: 200,
        message: "Login successful",
        data: { user_id },
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: "Login failed",
        error: error.message,
      });
    }
  }

  async changePassword(req, res) {
    try {
      const { user_id, old_password, new_password } = req.body;
      await authService.changePassword(user_id, old_password, new_password);
      return res.json({
        status: 200,
        message: "Password changed successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to change password",
        error: error.message,
      });
    }
  }
}
