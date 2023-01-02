import { CustomError } from "../../../../error/custom.error";
import { ParameterRequiredError } from "../../../../error/parameter-required.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/ipassword.crypto";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/iuser.repository";

type UserRequest = {
  name: string,
  username: string,
  password: string,
}

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async execute(data: UserRequest) {

    if (!data.username || !data.password) {
      throw new ParameterRequiredError('Username/password is required!', 422);
    }

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError('Username already exists!', 400, 'USER_EXISTS_ERROR');
    }

    const user = User.create(data);

    const passwordHashed = await this.passwordCrypto.passwordHash(data.password);

    user.password = passwordHashed;

    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}