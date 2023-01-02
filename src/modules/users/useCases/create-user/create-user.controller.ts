import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/ipassword.crypto";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../repositories/iuser.repository";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    logger.info('Usuário sendo criado...');
    try {
      const { name, username, password } = request.body;

      const createUserUseCase = new CreateUserUseCase(
        this.userRepository,
        this.passwordCrypto
      );
      const result = await createUserUseCase.execute({ name, username, password });

      return response.json(result);
    } catch (err: any) {
      logger.error(err.stack);
      return response.status(err.statusCode).json({
        error: err.message
      });
    }
  }
}