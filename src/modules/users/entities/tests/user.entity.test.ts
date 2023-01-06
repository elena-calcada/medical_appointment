import { test, expect, describe } from 'vitest';
import { User } from '../user.entity';

describe('User Entity', () => {
  test('Should be able to create a new user', async () => {
    const user = await User.create({
      name: 'name_test',
      username: 'username_test',
      password: 'password_test'
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id');
    expect(user.password).not.equal('password_test');
  });

  test('Should not be able to create a new user without username', async () => {
    expect(async () => {
      await User.create({
        name: 'name_test',
        username: '',
        password: 'password_test'
      });
    }).rejects.toThrow('Username/password is required!');
  });

  test('Should not be able to create a new user without password', async () => {
    expect(async () => {
      await User.create({
        name: 'name_test',
        username: 'username_test',
        password: ''
      });
    }).rejects.toThrow('Username/password is required!');
  });
});