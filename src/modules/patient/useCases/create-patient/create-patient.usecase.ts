import { CustomError } from "../../../../error/custom.error";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/iuser.repository"
import { Patient } from "../../entities/patient.entity";
import { IPatientRpository } from "../../repositories/ipatient.repository"

export type CreatePatientRequest = {
  name: string,
  username: string,
  password: string,
  email: string,
  document: string
}

export class CreatePatientUseCase {
  constructor(
    private userRepository: IUserRepository,
    private patientRepository: IPatientRpository
  ) {}

  async execute(data: CreatePatientRequest) {
    const userExist = await this.userRepository.findByUsername(data.username);
    if (userExist) {
      throw new CustomError('Username already exists!', 400, 'USER_EXISTS_ERROR');
    }

    const patientExist = await this.patientRepository.findByEmailOrDocument(data.email, data.document);
    if (patientExist) {
      throw new CustomError('Em-mail/document already exists!', 400);
    }

    const user = await User.create({
      name: data.name,
      username: data.username,
      password: data.password,
    });

    const userCreated = await this.userRepository.save(user);

    const patient = Patient.create({
      document: data.document,
      email: data.email,
      userId: userCreated.id
    });

    const patientCreated = await this.patientRepository.save(patient);

    return patientCreated;
  }
}