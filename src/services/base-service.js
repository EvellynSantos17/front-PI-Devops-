export default class BaseService {
  static API_URL = "/api";

  static getToken() {
    return localStorage.getItem("token");
  }

  static setToken(token) {
    localStorage.setItem("token", token);
  }

  static getHeaders() {
    return { Authorization: this.getToken() };
  }

  static getServiceUrl() {
    return `${this.API_URL}${this.endpoint}`;
  }

  static parseDictToQuery(dict) {
    if (Object.keys(dict).length === 0) return "";
    let query = "?";
    for (let key in dict) {
      query += `${key}=${dict[key]}&`;
    }
    query = query.slice(0, -1);
    return query;
  }

  static async requestGet(endpoint, headers = {}) {
    let response = await fetch(`${this.getServiceUrl()}${endpoint}`, {
      headers,
    });
    return response;
  }

  static async requestPost(endpoint, data, headers = {}) {
    let response = await fetch(`${this.getServiceUrl()}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    });
    return response;
  }

  static async requestPut(endpoint, data, headers = {}) {
    let response = await fetch(`${this.getServiceUrl()}${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers,
    });
    return response;
  }

  static async requestDelete(endpoint, headers = {}) {
    let response = await fetch(`${this.getServiceUrl()}${endpoint}`, {
      method: "DELETE",
      headers,
    });
    return response;
  }
}
