import { test, expect, describe } from 'vitest';
import dayjs from 'dayjs';
import { randomUUID } from "crypto";
import { CreateDoctorInfoUseCase, DoctorInfoRequest } from '../create-doctor-info.usecase';
import { DoctorMemoryRepository } from '../../../repositories/implementations/in-memory/doctor-memory.repository';
import { DoctorInfoMemoryRepository } from '../../../repositories/implementations/in-memory/doctor-info.memory.repository';
/* import { Doctor } from '../../../entities/doctor.entity'; */

describe('Create Doctor Info', () => {
  test('Should not be able to create a doctor info if doctor does not exists', () => {
    const doctorRepository = new DoctorMemoryRepository()
    const doctorInfoRepository = new DoctorInfoMemoryRepository()
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const doctorInfoMock: DoctorInfoRequest = {
      startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
      endAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
      price: 150,
      duration: 30
    }

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfoMock, 'INVALID_USER_ID');
    }).rejects.toThrow('Doctor does not exists!');
  });

  test('Should be able to create a new doctor info', async () => {
    const doctorRepository = new DoctorMemoryRepository()
    const doctorInfoRepository = new DoctorInfoMemoryRepository()
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = randomUUID();

    await doctorRepository.save({
      id: randomUUID(),
      crm: '123456',
      email: 'doctor@mail.com',
      specialityId: randomUUID(),
      userId
    });

    const doctorInfoMock: DoctorInfoRequest = {
      endAt: '18:00',
      startAt: '10:00',
      price: 150,
      duration: 8
    }

    const doctorInfoCreated = await createDoctorInfoUseCase.execute(doctorInfoMock, userId);

    expect(doctorInfoCreated).toHaveProperty('id');
  });

  test('Should be able to update a exist doctor info', async () => {
    const doctorRepository = new DoctorMemoryRepository()
    const doctorInfoRepository = new DoctorInfoMemoryRepository()
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = randomUUID();

    await doctorRepository.save({
      id: randomUUID(),
      crm: '123456',
      email: 'doctor@mail.com',
      specialityId: randomUUID(),
      userId
    });

    const doctorInfoMock: DoctorInfoRequest = {
      endAt: '18:00',
      startAt: '10:00',
      price: 150,
      duration: 8
    }

    const doctorInfoCreated = await createDoctorInfoUseCase.execute(doctorInfoMock, userId);
    const doctorInfoUpdated = await createDoctorInfoUseCase.execute(doctorInfoMock, userId);

    expect(doctorInfoCreated).toHaveProperty('id');
    expect(doctorInfoCreated.id).toEqual(doctorInfoUpdated.id);
  });
});