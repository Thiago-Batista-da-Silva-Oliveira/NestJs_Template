/* eslint-disable @typescript-eslint/require-await */

import { User } from 'src/domain/User/enterprise/entities/User';
import { UserRepository } from '../IUserRepository';

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async register(user: User): Promise<User> {
    this.items.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) || null;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.items.find((user) => user.id.toValue() === id);
  }
}
