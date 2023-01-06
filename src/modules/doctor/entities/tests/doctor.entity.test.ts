import { test, expect, describe } from 'vitest';
import { Doctor } from '../doctor.entity';

describe('Doctor Entity', () => {
  test('Should be able to create a new doctor', () => {
    const doctor = Doctor.create({
      email: 'email@mail.com',
      crm: '123456',
      userId: 'user_id',
      specialityId: 'speciality_id',
    });

    expect(doctor).toBeInstanceOf(Doctor);
    expect(doctor).toHaveProperty('id');
  });

  test('Should not be able to create a new doctor without crm number', () => {
    expect(() => {
      Doctor.create({
        email: 'email@mail.com',
        crm: '',
        userId: 'user_id',
        specialityId: 'speciality_id',
      });
    }).toThrow('CRM is required!');
  });

  test('Should not be able to create a new doctor with an invalid crm number', () => {
    expect(() => {
      Doctor.create({
        email: 'email@mail.com',
        crm: '123',
        userId: 'user_id',
        specialityId: 'speciality_id',
      });
    }).toThrow('Invalid CRM!');
  });

  test('Should not be able to create a new doctor without e-mail', () => {
    expect(() => {
      Doctor.create({
        email: '',
        crm: '123456',
        userId: 'user_id',
        specialityId: 'speciality_id',
      });
    }).toThrow('E-mail is required!');
  });
});