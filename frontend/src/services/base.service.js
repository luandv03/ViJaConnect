import axios from "axios";
import { BASE_URL_API } from "../configs/server.config";

const http = axios.create({
    baseURL: BASE_URL_API,
});

http.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return error.response;
    }
);

export class BaseService {
    httpClientPublic;

    constructor() {
        this.httpClientPublic = http;
    }
}
