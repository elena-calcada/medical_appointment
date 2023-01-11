import { Request, Response } from "express";
import { ISpecialityRepository } from "../../../speciality/repositories/ispeciality.repository";
import { IUserRepository } from "../../../users/repositories/iuser.repository";
import { IDoctorRepository } from "../../repositories/idoctor.repository";
import { CreateDoctorUseCase } from "./create-doctor.usecase";

export class CreateDoctorController {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    const createDoctorUseCase = new CreateDoctorUseCase(
      this.userRepository,
      this.doctorRepository,
      this.specialityRepository
    );

    const doctorCreated = await createDoctorUseCase.execute(body);

    return response.json(doctorCreated);
  }
}