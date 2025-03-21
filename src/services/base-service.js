export default class BaseService {
    static API_URL = "http://localhost:8080";

    static getServiceUrl() {
        return `${this.API_URL}${this.endpoint}`
    }

    static async requestGet(endpoint, headers = {}) {
        let response = await fetch(`${this.getServiceUrl()}${endpoint}`,{ headers })
        return response
    }

    static async requestPost(endpoint, data, headers = {}) {
        let response = await fetch(`${this.getServiceUrl()}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers
        })
        return response
    }
}