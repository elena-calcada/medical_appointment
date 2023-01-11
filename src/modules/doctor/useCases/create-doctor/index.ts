import { SpecialityPrismaRepository } from "../../../speciality/repositories/implementations/speciality.prisma";
import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implementations/prisma/doctor.prisma.repository";
import { CreateDoctorController } from "./create-doctor.controller";

const userPrismaRepository = new UserPrismaRepository();
const doctorPrismaRepository = new DoctorPrismaRepository();
const specialityPrismaRepository = new SpecialityPrismaRepository();

const createDoctorController = new CreateDoctorController(
  userPrismaRepository,
  doctorPrismaRepository,
  specialityPrismaRepository
);

export { createDoctorController };