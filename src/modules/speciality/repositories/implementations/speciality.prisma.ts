import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../iusers.repository";

export class SpecialityPrismaRepository implements ISpecialityRepository {
  async findByName(name: string): Promise<Speciality | undefined> {
    const speciality = await prismaClient.speciality.findUnique({
      where: {
        name
      }
    });
    return speciality || undefined;
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

}