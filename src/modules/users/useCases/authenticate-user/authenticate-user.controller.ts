import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/ipassword.crypto";
import { IToken } from "../../../../infra/shared/token/itoken";
import { IUserRepository } from "../../repositories/iuser.repository";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";

export class AuthenticateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body;

      const authenticateUserUseCase = new AuthenticateUserUseCase(this.userRepository, this.passwordCrypto, this.token);

      const result = await authenticateUserUseCase.execute({ username, password });

      return response.json(result);
    } catch (err: any) {
      return response.status(err.statusCode).json({
        error: err.message
      });
    }
  }
}