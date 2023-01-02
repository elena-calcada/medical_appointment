import { prismaClient } from "../../../../infra/databases/prisma.config";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../iuser.repository";

export class UserPrismaRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        username,
      }
    });
    return user || undefined;
  }
  async save(data: User): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
      }
    });
    return user;
  }

}