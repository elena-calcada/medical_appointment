import { Request, Response } from "express";
import { logger } from "../../utils/logger";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    logger.info('Usuário sendo criado...');
    try {
      const { name, username, password } = request.body;

      const createUserUseCase = new CreateUserUseCase();
      const result = await createUserUseCase.execute({ name, username, password });

      return response.json(result);
    } catch (err: any) {
      logger.error(err.stack);
      return response.status(err.statusCode).json(err.message);
    }
  }
}