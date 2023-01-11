import { doctorInfoRouter } from "../../../../../routes/doctor-info.routes";
import { DoctorInfo } from "../../../entities/doctor-info.entity";
import { IDoctorInfoRepository } from "../../idoctor-info.repository";

export class DoctorInfoMemoryRepository implements IDoctorInfoRepository {
  infos: DoctorInfo[] = [];

  async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {
    const index = this.infos.findIndex(info => info.doctorId === data.doctorId);

    if (index >= 0) {
      const info = this.infos[index];
      this.infos[index] = {
        ...info,
        startAt: data.startAt,
        endAt: data.endAt,
        duration: data.duration,
        price: data.price
      }
      data = this.infos[index];
    } else {
      this.infos.push(data);
    }
    return data;
  }
}