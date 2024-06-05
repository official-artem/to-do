import { UserModel } from '@/models/user.model';

export class UserApi extends UserModel{
  private URI = process.env.NEXT_PUBLIC_SERVER_URI + '/';

  constructor(
    protected _name: string,
    protected _email: string,
    protected _password: string
  ) {
    super(_name, _email, _password);
    localStorage.setItem('userName', _name);
  }

  async registration() {
    try {
      await fetch(this.URI + 'registration', {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: this._name,
          email: this._email,
          password: this._password
        }),
      });
    } catch (err: any) {
      throw new Error(err)
    }
  };

  async login() {
    await fetch(this.URI + 'login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: this._email,
        password: this._password
      }),
    });
  } catch(err: any) {
    throw new Error(err);
  }

  deleteUser() {
    fetch(this.URI + 'registration', {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        "Content-Type": 'application/json'
      }
    });
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }


};