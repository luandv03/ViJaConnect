import { BaseService } from "./base.service";

export class DataService extends BaseService {
    constructor() {
        super();
    }

    async getData(endpoint, params = {}) {
        try {
            const response = await this.httpClientPublic.get(endpoint, { params });
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("DataService getData error:", error);
            throw error;
        }
    }

    async postData(endpoint, data = {}) {
        try {
            const response = await this.httpClientPublic.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error("DataService postData error:", error);
            throw error;
        }
    }

    async updateData(endpoint, data = {}) {
        try {
            const response = await this.httpClientPublic.put(endpoint, data);
            return response.data;
        } catch (error) {
            console.error("DataService updateData error:", error);
            throw error;
        }
    }

    async deleteData(endpoint) {
        try {
            const response = await this.httpClientPublic.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error("DataService deleteData error:", error);
            throw error;
        }
    }
}

export const dataService = new DataService();
