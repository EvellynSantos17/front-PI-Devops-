import BaseService from "./base-service";

export default class AuthService extends BaseService {
    static endpoint = "/auth";

    static async login(email, password) {
        let response = await this.requestGet(
            "/login",
            {"Authorization": `Basic ${btoa(`${email}:${password}`)}`}
        );
        return response
    }

    static async register(email, password) {
        let response = await this.requestPost(
            "/register",
            { email:email, password:password },
            {"Content-Type": "application/json"}
        );
        return response
    }
}
