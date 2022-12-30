import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, username, password } = request.body;

      const createUserUseCase = new CreateUserUseCase();
      const result = await createUserUseCase.execute({ name, username, password });

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}