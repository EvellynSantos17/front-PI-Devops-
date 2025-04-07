import BaseService from "./base-service";

export default class EvalutionService extends BaseService {
  static endpoint = "/evaluations";


  static async create({comment,stars,contractedListingId}) {
    let data = { comment,stars,contractedListingId };
    let response = await this.requestPost("",data, {
      "Content-Type": "application/json",
      ...this.getHeaders(),
    });
    return response;
  }
}
