export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date | string
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  public getInstance(): User {
    const { email, id, _token, _tokenExpirationDate } = this;
    const newExpirationDate = new Date(_tokenExpirationDate.toString());

    return new User(id, email, _token, newExpirationDate);
  }
}
