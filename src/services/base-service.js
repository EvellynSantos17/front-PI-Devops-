export default class BaseService {
  static API_URL = "http://localhost:8080";

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
