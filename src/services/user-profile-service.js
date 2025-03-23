import BaseService from "./base-service";

export default class UserProfileService extends BaseService {
  static endpoint = "/user-profiles";

  static async findAll(query = "") {
    if (query !== "") query = `?${query}`;

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

  static async create(
    name,
    document,
    phone,
    address,
    postalCode,
    description,
    skills = []
  ) {
    let data = {
      name,
      document,
      phone,
      address,
      postalCode,
      description,
      skills,
    };
    let response = await this.requestPost("", data, {
      "Content-Type": "application/json",
      ...this.getHeaders(),
    });
    return response;
  }

  static async update(
    id,
    name,
    document,
    phone,
    address,
    postalCode,
    description,
    skills = []
  ) {
    let data = {
      name,
      document,
      phone,
      address,
      postalCode,
      description,
      skills,
    };
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
