import { randomUUID } from "crypto";
import { CustomError } from "../../../error/custom.error";

export type DoctorProps = {
  email: string;
  crm: string;
  user_id: string;
  speciality_id: string;
}

export class Doctor {
  id: string;
  crm: string;
  email: string;
  user_id: string;
  speciality_id: string;

  private constructor(props: DoctorProps) {
    if (!props.crm) {
      throw new CustomError('CRM is required!');
    }

    if (props.crm.length !== 6) {
      throw new CustomError('Invalid CRM!');
    }

    if (!props.email) {
      throw new CustomError('E-mail is required!');
    }

    this.id = randomUUID();
    this.crm = props.crm;
    this.email = props.email;
    this.user_id = props.user_id;
    this.speciality_id = props.speciality_id;
  }

  static create(props: DoctorProps) {
    const doctor = new Doctor(props);
    return doctor;
  }
}