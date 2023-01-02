import { randomUUID } from "crypto";

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
    this.id = randomUUID();
    this.name = props.name;
    this.username = props.username;
    this.password = props.password;
    this.isAdmin = false;
    this.createdAt = new Date();
  }

  static create(props: IUser) {
    const user = new User(props);
    return user;
  }
}