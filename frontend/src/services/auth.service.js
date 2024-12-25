import axios from "axios";
import { BaseService } from "./base.service";

class AuthService extends BaseService {
    async signin({ email, password }) {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/auth/login",
                {
                    email: email,
                    password: password,
                }
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }
}

export const authService = new AuthService();
