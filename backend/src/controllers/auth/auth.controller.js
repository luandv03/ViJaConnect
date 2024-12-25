// src/controllers/auth/auth.controller.js
import { authService } from "../../services/auth/auth.service.js";

export class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            return res.json({
                status: 200,
                message: "Login successful",
                data: { user },
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
            await authService.changePassword(
                user_id,
                old_password,
                new_password
            );
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

    async assignRoleToUser(req, res) {
        try {
            const { userId, roleName } = req.body;

            // Check role admin
            if (req.user.role !== "admin") {
                return res.status(403).json({
                    status: 403,
                    message: "Access denied. Admin role is required.",
                });
            }

            const updatedUser = await authService.assignRole(userId, roleName);
            return res.json({
                status: 200,
                message: "Role assigned successfully.",
                data: updatedUser,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to assign role.",
                error: error.message,
            });
        }
    }

    async removeRoleFromUser(req, res) {
        try {
            const { userId } = req.body;

            // Check role admin
            if (req.user.role !== "admin") {
                return res.status(403).json({
                    status: 403,
                    message: "Access denied. Admin role is required.",
                });
            }

            const updatedUser = await authService.removeRole(userId);
            return res.json({
                status: 200,
                message: "Role removed successfully.",
                data: updatedUser,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to remove role.",
                error: error.message,
            });
        }
    }
}
