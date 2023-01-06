import { CustomError } from "../../../../error/custom.error";
import { ISpecialityRepository } from "../../../speciality/repositories/ispeciality.repository";
import { User } from "../../../users/entities/user.entity"
import { IUserRepository } from "../../../users/repositories/iuser.repository";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../../repositories/idoctor.repository";

export type CreateDoctorRequest = {
  name: string,
  username: string,
  password: string,
  email: string,
  crm: string,
  specialityId: string,
}

export class CreateDoctorUseCase {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
  ) {}

  async execute(data: CreateDoctorRequest) {
    const user = await User.create({
      name: data.name,
      username: data.username,
      password: data.password,
    });

    const speciality = await this.specialityRepository.findById(data.specialityId);

    if (!speciality) {
      throw new CustomError('Speciality does not exists!', 400);
    }

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError('Username already exists!', 400, 'USER_EXISTS_ERROR');
    }

    const userCreated = await this.userRepository.save(user);

    const doctor = Doctor.create({
      crm: data.crm,
      email: data.email,
      specialityId: data.specialityId,
      userId: userCreated.id,
    });

    const crmExists = await this.doctorRepository.findByCRM(data.crm);

    if (crmExists) {
      throw new CustomError('CRM already exists!', 400);
    }

    const doctorCreated = await this.doctorRepository.save(doctor);

    return doctorCreated;
  }
}