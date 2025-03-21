import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { User } from 'src/domain/User/enterprise/entities/User';
import { UserDoesNotExistError } from '../errors';
import { UserRepository } from '../../repositories';

interface IRequest {
  id: string;
}

type IOutput = Either<
  UserDoesNotExistError,
  {
    user: User;
  }
>;
@Injectable()
export class GetUserByIdService {
  constructor(private userRepository: UserRepository) {}
  async execute({ id }: IRequest): Promise<IOutput> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new UserDoesNotExistError(id));
    }

    return right({ user });
  }
}
