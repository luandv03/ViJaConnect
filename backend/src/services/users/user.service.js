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
}

export const userService = new TopicService();
