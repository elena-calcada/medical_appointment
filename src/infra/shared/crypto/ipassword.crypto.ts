export interface IPasswordCrypto {
  passwordHash(password: string): Promise<string>;
}