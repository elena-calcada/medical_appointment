import { z } from "zod";
import { Request, Response } from "express";
import { ISpecialityRepository } from "../../../speciality/repositories/ispeciality.repository";
import { IUserRepository } from "../../../users/repositories/iuser.repository";
import { IDoctorRepository } from "../../repositories/idoctor.repository";
import { CreateDoctorUseCase } from "./create-doctor.usecase";
import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { ValidationSchemaError } from "../../../../error/validation-schema.error";

export class CreateDoctorController {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    const doctorSchema = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
      crm: z.string().length(6, {
        message: 'CRM must contain 6 characters'
      }),
      specialityId: z.string().uuid({
        message: 'You need to insert a valid speciality ID'
      })
    });

    try {
      validatorSchema(doctorSchema, body);

      const createDoctorUseCase = new CreateDoctorUseCase(
        this.userRepository,
        this.doctorRepository,
        this.specialityRepository
      );

      const doctorCreated = await createDoctorUseCase.execute(body);

      return response.json(doctorCreated);

    } catch (err: any) {
      if (err instanceof ValidationSchemaError) {
        return response.status(err.statusCode).json(err.errors);
      }
      return response.status(err.statusCode).json(err.message);
    }
  }
}