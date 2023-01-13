import { test, expect, describe } from 'vitest';
import { Patient } from '../patient.entity';

describe('Patient Entity', () => {
  test('Should be able to create a new patient', () => {
    const patient = Patient.create({
      email: 'patient@mail.com',
      document: '123456',
      userId: 'user_id'
    });

    expect(patient).toHaveProperty('id');
    expect(patient).toBeInstanceOf(Patient);
  });

  test('Should not be able to create a new patient without email', () => {
    expect(() => {
      Patient.create({
        email: '',
        document: '123456',
        userId: 'user_id'
      });
    }).toThrow('E-mail is required');
  });

  test('Should not be able to create a new patient without document number', () => {
    expect(() => {
      Patient.create({
        email: 'patient@mail.com',
        document: '',
        userId: 'user_id'
      });
    }).toThrow('Document is required');
  });

  test('Should not be able to create a new patient with invalid document number', () => {
    expect(() => {
      Patient.create({
        email: 'patient@mail.com',
        document: '123',
        userId: 'user_id'
      });
    }).toThrow('Invalid document');
  });
});