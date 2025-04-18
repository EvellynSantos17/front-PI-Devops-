import BaseService from "./base-service";

export default class ListingService extends BaseService {
  static endpoint = "/listings";

  static async findAll(query = {}) {
    query = this.parseDictToQuery(query);

    let response = await this.requestGet(query, {
      "Content-Type": "application/json",
    });
    return response;
  }

  static async findById(id) {
    let response = await this.requestGet(`/${id}`, {
      "Content-Type": "application/json",
    });
    return response;
  }

  static async create({ title, price, description, location, skills }) {
    let data = { title, price, description, location, skills };
    let response = await this.requestPost("", data, {
      "Content-Type": "application/json",
      ...this.getHeaders(),
    });
    return response;
  }

  static async update({id, title, price, description, location, skills }) {
    let data = { title, price, description, location, skills };
    console.log({rq:data})
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
