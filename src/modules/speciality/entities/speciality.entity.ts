import { randomUUID } from "crypto";
import { ParameterRequiredError } from "../../../error/parameter-required.error";

type ISpeciality = {
  name: string;
  description: string;
}

export class Speciality {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor({ name, description }: ISpeciality) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
  }

  static create(props: ISpeciality) {
    if (!props.name) {
      throw new ParameterRequiredError("Name is required!", 422);
    }

    const speciality = new Speciality(props);
    return speciality;
  }
}