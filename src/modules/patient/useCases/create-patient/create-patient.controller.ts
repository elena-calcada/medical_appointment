import { z } from "zod";
import { Request, Response } from "express";
import { IUserRepository } from "../../../users/repositories/iuser.repository";
import { IPatientRpository } from "../../repositories/ipatient.repository";
import { CreatePatientUseCase } from "./create-patient.usecase";
import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { ValidationSchemaError } from "../../../../error/validation-schema.error";

export class CreatePatientController {
  constructor(
    private userRepository: IUserRepository,
    private patientRepository: IPatientRpository
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    const patientSchema = z.object({
      name: z.string(),
      username: z.string(),
      password: z.string(),
      email: z.string().email(),
      document: z.string().min(5, {
        message: 'Invalid document'
      })
    });

    try {
      validatorSchema(patientSchema, body);

      const createPatientUseCase = new CreatePatientUseCase(
        this.userRepository,
        this.patientRepository
      );

      const patient = await createPatientUseCase.execute(body);

      return response.json(patient);
    } catch (err: any) {
      if (err instanceof ValidationSchemaError) {
        return response.status(err.statusCode).json(err.errors);
      }
      return response.status(err.statusCode).json(err.message);
    }
  }
}