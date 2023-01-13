import { randomUUID } from "crypto";
import { ParameterRequiredError } from "../../../error/parameter-required.error";
import { CustomError } from "../../../error/custom.error";

export type PatientProps = {
  email: string;
  document: string;
  userId: string;
}

export class Patient {
  id: string;
  email: string;
  document: string;
  userId: string;

  private constructor(props: PatientProps) {
    if (!props.email) {
      throw new ParameterRequiredError('E-mail is required', 422);
    }

    if (!props.document) {
      throw new ParameterRequiredError('Document is required', 422);
    }

    if (props.document.length <= 5) {
      throw new CustomError('Invalid document', 400);
    }

    this.id = randomUUID();
    this.email = props.email;
    this.document = props.document;
    this.userId = props.userId;
  }

  static create(props: PatientProps) {
    const patient = new Patient(props);
    return patient;
  }
}