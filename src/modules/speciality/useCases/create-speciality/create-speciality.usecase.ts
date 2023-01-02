import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../../repositories/iusers.repository";

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

    const specialityCreated = await this.specialityRepository.save(speciality);

    return specialityCreated;
  }
}