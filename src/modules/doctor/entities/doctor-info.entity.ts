import { randomUUID } from "crypto";
import { CustomError } from "../../../error/custom.error";
import { compareEndTimeIsAfter, validateTime } from "../../../utils/date";

export type DoctorInfoProps = {
  startAt: string;
  endAt: string;
  duration: number;
  price: number;
  doctorId: string;
}

export class DoctorInfo {
  id: string;
  startAt: string;
  endAt: string;
  duration: number;
  price: number;
  doctorId: string;

  private constructor(props: DoctorInfoProps) {
    if (!props.doctorId) {
      throw new CustomError('Doctor does not exists!');
    }

    if (props.duration <= 0) {
      throw new CustomError('Invalid Duration');
    }

    if (!validateTime(props.startAt)) {
      throw new CustomError('Invalid start time!');
    }

    if (!validateTime(props.endAt)) {
      throw new CustomError('Invalid end time!');
    }

    if (!compareEndTimeIsAfter(props.startAt, props.endAt)) {
      throw new CustomError('End time cannot be earlier than start time');
    }

    this.id = randomUUID();
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.duration = props.duration;
    this.price = props.price;
    this.doctorId = props.doctorId;
  }

  static create(props: DoctorInfoProps) {
    const doctorInfo = new DoctorInfo(props);
    return doctorInfo;
  }
}