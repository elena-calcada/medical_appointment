import { User } from "../../entities/user.entity";
import { IUserRepository } from "../iuser.repository";


export class UserMemoryRepository implements IUserRepository {
  users: User[];

  private static instance: UserMemoryRepository;

  constructor() {
    this.users = [];
  }

  static getInstance() {
    if (!UserMemoryRepository.instance) {
      UserMemoryRepository.instance = new UserMemoryRepository();
    }

    return UserMemoryRepository.instance;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find(user => user.username === username);
    return user || null;
  }

  async save(data: User) {
    this.users.push(data);
    return data;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    return user || null;
  }
}