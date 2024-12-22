import { User } from "../../models/user.model.js";

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (password !== user.password) {
      throw new Error("Invalid credentials");
    }

    return user._id;
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
}

export const authService = new AuthService();
