import { userService } from "../../services/users/user.service.js";

export class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password, role } = req.body;

            const newUser = await userService.saveUser({ name, email, password, role });
            return res.json({
                status: 201,
                message: "User created successfully.",
                data: newUser
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to create user.",
                error: error.message
            });
        }
    }
}
