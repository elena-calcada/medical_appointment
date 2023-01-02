import { hash } from 'bcryptjs';
import { IPasswordCrypto } from "./ipassword.crypto";

export class PasswordBcrypt implements IPasswordCrypto {
  passwordHash(password: string): Promise<string> {
    return hash(password, 10);
  }

}