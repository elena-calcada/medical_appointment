import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../ispeciality.repository";

export class SpecialityPrismaRepository implements ISpecialityRepository {
  async findByName(name: string): Promise<Speciality | null> {
    const speciality = await prismaClient.speciality.findUnique({
      where: {
        name
      }
    });
    return speciality;
  }
  async save(data: Speciality): Promise<Speciality> {
    const speciality = await prismaClient.speciality.create({
      data: {
        name: data.name,
        description: data.description,
      }
    });
    return speciality;
  }

  async findById(id: string): Promise<Speciality | null> {
    const speciality = await prismaClient.speciality.findUnique({
      where: {
        id
      }
    });

    return speciality;
  }

}