import BaseService from "./base-service";

export default class UserService extends BaseService {
  static endpoint = "/users";

  static async findAll(query = {}) {
    query = this.parseDictToQuery(query);

    let response = await this.requestGet(query, {
      ...this.getHeaders(),
    });
    return response;
  }

  static async findById(id) {
    let response = await this.requestGet(`/${id}`, {
      ...this.getHeaders(),
    });
    return response;
  }

  static async create(email, password) {
    let data = { email, password };
    let response = await this.requestPost("", data, {
      "Content-Type": "application/json",
      ...this.getHeaders(),
    });
    return response;
  }

  static async update(id, email, password) {
    let data = { email, password };
    let response = await this.requestPut(`/${id}`, data, {
      "Content-Type": "application/json",
      ...this.getHeaders(),
    });
    return response;
  }

  static async delete(id) {
    let response = await this.requestDelete(`/${id}`, {
      ...this.getHeaders(),
    });
    return response;
  }
}
