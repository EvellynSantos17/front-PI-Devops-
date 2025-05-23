export default class BaseService {
  static API_URL = "/api";

  static getToken() {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error(error)
    }
  }

  static setToken(token) {
    localStorage.setItem("token", token);
  }

  static getTokenInfo() {
    const token = this.getToken();
    if (!token) return null;
    // const payload = token.split(".")[1];
    // const data = JSON.parse(atob(payload));
    // return data;
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
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
      credentials: 'omit',
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
