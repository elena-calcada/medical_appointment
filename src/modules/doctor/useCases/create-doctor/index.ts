import { SpecialityPrismaRepository } from "../../../speciality/repositories/implementations/speciality.prisma";
import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implementations/doctor.prisma.repository";
import { CreateDoctorcontroller } from "./create-doctor.controller";

const userPrismaRepository = new UserPrismaRepository();
const doctorPrismaRepository = new DoctorPrismaRepository();
const specialityPrismaRepository = new SpecialityPrismaRepository();

const createDoctorController = new CreateDoctorcontroller(
  userPrismaRepository,
  doctorPrismaRepository,
  specialityPrismaRepository
);

export { createDoctorController };