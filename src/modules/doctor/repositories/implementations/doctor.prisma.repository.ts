import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../idoctor.repository";

export class DoctorPrismaRepository implements IDoctorRepository {
  async save(data: Doctor): Promise<Doctor> {
    const doctor = await prismaClient.doctor.create({
      data: {
        email: data.email,
        crm: data.crm,
        userId: data.userId,
        specialityId: data.specialityId
      }
    });

    return doctor;
  }
  async findByCRM(crm: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: {
        crm,
      }
    });

    return doctor;
  }
}