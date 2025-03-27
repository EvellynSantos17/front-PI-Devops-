export class UserProfileResponse {
  constructor(
    public id: number,
    public name: string,
    public document: string,
    public phone: string,
    public address: string,
    public description: string,
    public skills: string[],
    public title: string
  ) {}
}
