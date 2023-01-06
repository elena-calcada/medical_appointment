import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../ispeciality.repository";

export class SpecialityMemoryRepository implements ISpecialityRepository {
  specialities: Speciality[] = [];

  async save(data: Speciality): Promise<Speciality> {
    this.specialities.push(data);
    return data;
  }

  async findByName(name: string): Promise<Speciality | null> {
    const speciality = this.specialities.find(speciality => speciality.name === name);
    return speciality || null;
  }

  async findById(id: string): Promise<Speciality | null> {
    const speciality = this.specialities.find(speciality => speciality.id === id);
    return speciality || null;
  }

}