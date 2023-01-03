
import { hash, compare } from 'bcryptjs';
import { IPasswordCrypto } from "./ipassword.crypto";

export class PasswordBcrypt implements IPasswordCrypto {
  async passwordHash(password: string): Promise<string> {
    return hash(password, 10);
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }
}