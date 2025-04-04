import { BaseService } from "./base.service";

class AuthService extends BaseService {
    async signin({ email, password }) {
        try {
            const res = await this.httpClientPublic.post("/auth/login", {
                email: email,
                password: password,
            });

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async saveLocation({ text }) {
        try {
            const res = await this.httpClientPublic.post("/location/save", {
                text: text,
            });

            return res.data;
        } catch (error) {
            return error;
        }
    }
}

export const authService = new AuthService();
