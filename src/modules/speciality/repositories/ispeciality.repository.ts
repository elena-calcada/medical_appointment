import { Speciality } from "../entities/speciality.entity";

export interface ISpecialityRepository {
  findByName(name: string): Promise<Speciality | null>;
  save(data: Speciality): Promise<Speciality>;
}