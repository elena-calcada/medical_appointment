import { test, expect, describe } from 'vitest';
import { UserMemoryRepository } from '../../../../users/repositories/implementations/user.memory.repository';
import { PatientMemoryRepository } from '../../../repositories/implementations/patient.memory.repository';
import { CreatePatientRequest, CreatePatientUseCase } from '../create-patient.usecase';

describe('Create Patient Use Case', () => {
  test('Should be able to create a new patient', async () => {
    const userRepository = new UserMemoryRepository();
    const patientRepository = new PatientMemoryRepository();

    const createPatientUseCase = new CreatePatientUseCase(
      userRepository,
      patientRepository
    );

    const patientMock: CreatePatientRequest = {
      name: 'name_test',
      username: 'username_test',
      password: 'password_test',
      email: 'email@mail.com',
      document: '123456'
    }

    const patientCreated = await createPatientUseCase.execute(patientMock);

    expect(patientCreated).toHaveProperty('id');
    expect(patientCreated).toHaveProperty('userId');
  });

  test('Should not be able to create a new patient if username already exists', async () => {
    const userRepository = new UserMemoryRepository();
    const patientRepository = new PatientMemoryRepository();

    const createPatientUseCase = new CreatePatientUseCase(
      userRepository,
      patientRepository
    );

    const patientMock: CreatePatientRequest = {
      name: 'name_test',
      username: 'username_test',
      password: 'password_test',
      email: 'email@mail.com',
      document: '123456'
    }

    const patienTesttMock: CreatePatientRequest = {
      name: 'name',
      username: 'username_test',
      password: 'password',
      email: 'email-test@mail.com',
      document: '654321'
    }

    await createPatientUseCase.execute(patientMock);

    expect(async () => {
      await createPatientUseCase.execute(patienTesttMock);
    }).rejects.toThrow('Username already exists!');
  });

  test('Should not be able to create a new patient if e-mail already exists', async () => {
    const userRepository = new UserMemoryRepository();
    const patientRepository = new PatientMemoryRepository();

    const createPatientUseCase = new CreatePatientUseCase(
      userRepository,
      patientRepository
    );

    const patientMock: CreatePatientRequest = {
      name: 'name_test',
      username: 'username_test',
      password: 'password_test',
      email: 'email@mail.com',
      document: '123456'
    }

    const patienTesttMock: CreatePatientRequest = {
      name: 'name',
      username: 'username',
      password: 'password',
      email: 'email@mail.com',
      document: '654321'
    }

    await createPatientUseCase.execute(patientMock);

    expect(async () => {
      await createPatientUseCase.execute(patienTesttMock);
    }).rejects.toThrow('Em-mail/document already exists!');
  });

  test('Should not be able to create a new patient if document number already exists', async () => {
    const userRepository = new UserMemoryRepository();
    const patientRepository = new PatientMemoryRepository();

    const createPatientUseCase = new CreatePatientUseCase(
      userRepository,
      patientRepository
    );

    const patientMock: CreatePatientRequest = {
      name: 'name_test',
      username: 'username_test',
      password: 'password_test',
      email: 'email@mail.com',
      document: '123456'
    }

    const patienTesttMock: CreatePatientRequest = {
      name: 'name',
      username: 'username',
      password: 'password',
      email: 'email-test@mail.com',
      document: '123456'
    }

    await createPatientUseCase.execute(patientMock);

    expect(async () => {
      await createPatientUseCase.execute(patienTesttMock);
    }).rejects.toThrow('Em-mail/document already exists!');
  });
});