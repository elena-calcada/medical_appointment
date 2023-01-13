import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Patient } from "../../entities/patient.entity";
import { IPatientRpository } from "../ipatient.repository";

export class PatientPrismaRepository implements IPatientRpository {
  async save(data: Patient): Promise<Patient> {
    const patient = await prismaClient.patient.create({
      data: {
        email: data.email,
        document: data.document,
        userId: data.userId
      }
    });

    return patient;
  }

  async findByEmailOrDocument(email: string, document: string): Promise<Patient | null> {
    const patient = await prismaClient.patient.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email
            }
          },
          {
            document: {
              equals: document
            }
          }
        ]
      }
    });

    return patient;
  }

}