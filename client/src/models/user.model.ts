export class UserModel {
  constructor(
    protected _name: string,
    protected _email: string,
    protected _password: string,
  ) {
    this._name = _name;
    this._email = _email;
    this._password = _password;
  };

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }


}
