import { User } from '../../enterprise/entities/User';

export abstract class UserRepository {
  abstract register(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | undefined>;
}
