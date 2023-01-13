import { Patient } from "../../entities/patient.entity";
import { IPatientRpository } from "../ipatient.repository";

export class PatientMemoryRepository implements IPatientRpository {
  patients: Patient[] = [];

  async save(data: Patient): Promise<Patient> {
    this.patients.push(data);
    return data;
  }

  async findByEmailOrDocument(email: string, document: string): Promise<Patient | null> {
    const patient = this.patients.find(patient => (patient.email === email || patient.document === document));

    return patient || null;
  }
}