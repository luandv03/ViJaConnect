import { User } from "../../models/user.model.js";

class TopicService {
  async createUser({ name, email, password, role }) {
    try {
      const newUser = new User({ name, email, password, role });
      return await newUser.save();
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async increaseUserPoints(user_id, points) {
    try {
      const user = await User.findById(user_id);
      if (!user) {
        throw new Error("User not found");
      }
      user.point = (user.point || 0) + points;
      const new_user = await user.save();
      return new_user.point;
    } catch (error) {
      throw new Error("Error increasing user points: " + error.message);
    }
  }
}

export const userService = new TopicService();
