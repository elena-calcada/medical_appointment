import { Patient } from "../entities/patient.entity";

export interface IPatientRpository {
  save(data: Patient): Promise<Patient>;
  findByEmailOrDocument(email: string, document: string): Promise<Patient | null>;
}