import { Request, Response } from "express";
import { ISpecialityRepository } from "../../repositories/iusers.repository";
import { CreateSpecialityUseCase } from "./create-speciality.usecase";

export class CreateSpecialityController {
  constructor(
    private specialityRepository: ISpecialityRepository
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createSpecialityUseCase = new CreateSpecialityUseCase(
        this.specialityRepository
      );

      const result = await createSpecialityUseCase.execute({ name, description });

      return response.json(result);
    } catch (err: any) {
      return response.status(err.statusCode || 400).json({
        error: err.message
      });
    }
  }
}