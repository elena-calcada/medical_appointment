export interface IPasswordCrypto {
  passwordHash(password: string): Promise<string>;
  compare(password: string, passwordHash: string): Promise<boolean>;
}