import { login as apiLogin, LoginParams } from "@ministor/api";
import { action, makeObservable, observable, runInAction } from "mobx";

const TOKEN_STORAGE_KEY = "ministorAdminToken";

type UserInfo = {
  email: string;
};

export class UserStore {
  @observable
  token = localStorage.getItem(TOKEN_STORAGE_KEY);

  @observable
  user: UserInfo | null = null;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  async login(params: LoginParams) {
    const user = await apiLogin(params);

    localStorage.setItem(TOKEN_STORAGE_KEY, user.token);

    runInAction(() => {
      this.token = user.token;
      this.user = {
        email: user.email,
      };
    });
  }

  logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.token = null;
    this.user = null;
  }
}
