import { test, expect, describe, beforeAll } from 'vitest';
import { CreateDoctorRequest, CreateDoctorUseCase } from '../create-doctor.usecase';
import { UserMemoryRepository } from '../../../../users/repositories/implementations/user.memory.repository';
import { DoctorMemoryRepository } from '../../../repositories/implementations/doctor-memory.repository';
import { SpecialityMemoryRepository } from '../../../../speciality/repositories/implementations/speciality-memory.repository';
import { Speciality } from '../../../../speciality/entities/speciality.entity';
import { ISpecialityRepository } from '../../../../speciality/repositories/ispeciality.repository';

let specialityRepository: ISpecialityRepository;
let speciality: Speciality;

beforeAll(async () => {
  specialityRepository = new SpecialityMemoryRepository;

  speciality = Speciality.create({
    name: 'name_test',
    description: 'description_test'
  });

  await specialityRepository.save(speciality);
});

describe('Create Doctor Use Case', () => {
  test('Should be able to create a new Doctor', async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      name: 'name_test',
      username: 'username_test',
      password: 'password_test',
      email: 'email@mail.com.br',
      crm: '123456',
      specialityId: speciality.id,
    }

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );

    const doctorCreated = await createDoctorUseCase.execute(doctorMock);

    expect(doctorCreated).toHaveProperty('id');
    expect(doctorCreated).toHaveProperty('userId');
  });

  test('Should not be able to create a new Doctor with exists CRM', async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      name: 'name_test',
      username: 'username_test',
      password: 'password_test',
      email: 'email@mail.com.br',
      crm: '123456',
      specialityId: speciality.id,
    }

    const doctorMockDuplicated: CreateDoctorRequest = {
      name: 'name_duplicated',
      username: 'username_duplicated',
      password: 'password_duplicated',
      email: 'duplicated@mail.com.br',
      crm: '123456',
      specialityId: speciality.id,
    }

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );

    await createDoctorUseCase.execute(doctorMock);

    expect(async () => {
      await createDoctorUseCase.execute(doctorMockDuplicated);
    }).rejects.toThrow('CRM already exists!');

  });

  test('Should not be able to create a new doctor with an invalid crm number', async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      name: 'name_test',
      username: 'username_test',
      password: 'password_test',
      email: 'email@mail.com.br',
      crm: '12345',
      specialityId: speciality.id,
    }

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );

    expect(async () => {
      await createDoctorUseCase.execute(doctorMock);
    }).rejects.toThrow('Invalid CRM!');
  });
});