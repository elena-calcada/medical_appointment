import { test, expect, describe } from 'vitest';
import { randomUUID } from "crypto";
import { DoctorInfo } from '../doctor-info.entity';
import dayjs from 'dayjs';

describe('Doctor Info Entity', () => {
  test('Should be able to create a new doctor info', () => {
    const doctorInfo = DoctorInfo.create({
      startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
      endAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
      price: 150,
      duration: 5,
      doctorId: randomUUID()
    });

    expect(doctorInfo).toHaveProperty('id');
  });

  test('Should not be able to create a doctor info without docrtorId', () => {
    expect(() => {
      DoctorInfo.create({
        startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
        endAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
        price: 150,
        duration: 5,
        doctorId: ''
      });
    }).toThrow('Doctor does not exists!');

  });

  test('Should not be able to create a doctor info if endAt is before startAt', () => {
    expect(() => {
      DoctorInfo.create({
        startAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
        endAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
        price: 150,
        duration: 5,
        doctorId: 'doctor_id'
      });
    }).toThrow('End time cannot be earlier than start time');
  });

  test('Should not be able to create a doctor info if endAt is inavlid', () => {
    expect(() => {
      DoctorInfo.create({
        startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
        endAt: '99:99',
        price: 150,
        duration: 5,
        doctorId: 'doctor_id'
      });
    }).toThrow('Invalid end time!');
  });
  test('Should not be able to create a doctor info if startAt is inavlid', () => {
    expect(() => {
      DoctorInfo.create({
        startAt: '99:99',
        endAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
        price: 150,
        duration: 5,
        doctorId: 'doctor_id'
      });
    }).toThrow('Invalid start time!');
  });
});