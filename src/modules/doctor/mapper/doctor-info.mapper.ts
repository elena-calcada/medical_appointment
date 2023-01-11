import { DoctorInfo } from "../entities/doctor-info.entity";
import { DoctorInfo as DoctorInfoPrisma } from "@prisma/client";

export class DoctorInfoMapper {
  static prismaToEntityDoctorInfo = (data: DoctorInfoPrisma): DoctorInfo => {
    return {
      ...data,
      price: Number(data.price)
    }
  }
}