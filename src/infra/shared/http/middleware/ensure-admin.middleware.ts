import { NextFunction, Request, Response } from "express";
import { UserPrismaRepository } from "../../../../modules/users/repositories/implementations/user.prisma.repository";

export const ensureAdmin = async (request: Request, response: Response, next: NextFunction) => {
  const userPrismaRepository = new UserPrismaRepository();
  const user = await userPrismaRepository.findById(request.userId);

  if (!user) {
    return response.status(400).json({ message: 'User does not exists!' });
  }

  if (!user.isAdmin) {
    return response.status(401).json({ message: 'User does not admin!' });
  }

  return next();
}