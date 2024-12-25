import { User } from "../../models/user.model.js";
import { Role } from "../../models/role.model.js";

class AuthService {
    async login(email, password) {
        const user = await User.findOne({ email }).populate("role_id");
        if (!user) {
            throw new Error("User not found");
        }

        if (password !== user.password) {
            throw new Error("Invalid credentials");
        }

        return user;
    }

    async changePassword(user_id, old_password, new_password) {
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error("User not found");
        }

        if (old_password !== user.password) {
            throw new Error("Old password is incorrect");
        }

        user.password = new_password; // Store the new password directly
        await user.save();
    }

    async assignRole(userId, roleName) {
        const role = await Role.findOne({ name: roleName });
        if (!role) {
            throw new Error("Role not found");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        user.role_id = role._id;
        await user.save();
        return user;
    }

    async removeRole(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        user.role_id = null; // Xóa quyền bằng cách đặt role_id thành null
        await user.save();
        return user;
    }
}

export const authService = new AuthService();
