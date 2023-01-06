import { randomUUID } from "crypto";
import { ParameterRequiredError } from "../../../error/parameter-required.error";
import { PasswordBcrypt } from "../../../infra/shared/crypto/password.bcrypt";

type IUser = {
  name: string,
  username: string,
  password: string,
}

export class User {
  id: string;
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;

  private constructor(props: IUser) {
    if (!props.username || !props.password) {
      throw new ParameterRequiredError('Username/password is required!', 422);
    }

    this.id = randomUUID();
    this.name = props.name;
    this.username = props.username;
    this.password = props.password;
    this.isAdmin = false;
    this.createdAt = new Date();
  }

  static async create(props: IUser) {
    if (!props.password) {
      throw new ParameterRequiredError('Username/password is required!', 422);
    }

    const bcrypt = new PasswordBcrypt();
    const passwordHashed = await bcrypt.passwordHash(props.password);

    const user = new User({
      ...props,
      password: passwordHashed
    });
    return user;
  }
}