import { CustomError } from "../../../../error/custom.error";
import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../../repositories/ispeciality.repository";

type SpecialityRequest = {
  name: string;
  description: string;
}

export class CreateSpecialityUseCase {
  constructor(
    private specialityRepository: ISpecialityRepository
  ) {}

  async execute(data: SpecialityRequest) {
    const speciality = Speciality.create(data);

    const specialityExists = await this.specialityRepository.findByName(data.name);

    if (specialityExists) {
      throw new CustomError("Speciality already exists!");
    }

    const specialityCreated = await this.specialityRepository.save(speciality);

    return specialityCreated;
  }
}