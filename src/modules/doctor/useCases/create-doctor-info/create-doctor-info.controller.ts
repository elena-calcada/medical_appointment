import { Request, Response } from "express";
import { IDoctorInfoRepository } from "../../repositories/idoctor-info.repository";
import { IDoctorRepository } from "../../repositories/idoctor.repository";
import { CreateDoctorInfoUseCase } from "./create-doctor-info.usecase";

export class CreateDoctorInfoController {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorInfoRepository: IDoctorInfoRepository
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { body, userId } = request;

    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      this.doctorRepository,
      this.doctorInfoRepository
    );

    const doctorInfoCreated = await createDoctorInfoUseCase.execute(
      body,
      userId
    );

    return response.json(doctorInfoCreated);
  }
}