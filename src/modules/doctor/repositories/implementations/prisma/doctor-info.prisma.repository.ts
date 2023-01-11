import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { DoctorInfo } from "../../../entities/doctor-info.entity";
import { DoctorInfoMapper } from "../../../mapper/doctor-info.mapper";
import { IDoctorInfoRepository } from "../../idoctor-info.repository";

export class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
  async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {
    const doctorInfo = await prismaClient.doctorInfo.upsert({
      where: {
        doctorId: data.doctorId
      },
      create: {
        id: data.id,
        startAt: data.startAt,
        endAt: data.endAt,
        duration: data.duration,
        price: data.price,
        doctorId: data.doctorId,
      },
      update: {
        startAt: data.startAt,
        endAt: data.endAt,
        duration: data.duration,
        price: data.price,
      }
    });

    return DoctorInfoMapper.prismaToEntityDoctorInfo(doctorInfo);
  }

}