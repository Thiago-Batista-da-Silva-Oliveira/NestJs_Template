import { UserRepository } from '../../repositories';
import { HashProviderModel } from '../../providers/hashProvider/model/IHashProvider';
import { Injectable } from '@nestjs/common';
import { IncorrectCredentialsError } from '../errors';
import { Either, left, right } from 'src/core/either';
import { User } from 'src/domain/User/enterprise/entities/User';

interface IRequest {
  email: string;
  password: string;
}

type IOutput = Either<
  IncorrectCredentialsError,
  {
    user: Omit<User, 'password'>;
  }
>;
@Injectable()
export class SessionService {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProviderModel,
  ) {}
  async execute({ email, password }: IRequest): Promise<IOutput> {
    const playerAlreadyExists = await this.userRepository.findByEmail(email);

    if (!playerAlreadyExists) {
      return left(new IncorrectCredentialsError());
    }

    if (playerAlreadyExists.provider === 'LOCAL') {
      if (!playerAlreadyExists.password) {
        return left(new IncorrectCredentialsError());
      }
      const comparePassword = await this.hashProvider.compare(
        password,
        playerAlreadyExists.password,
      );

      if (!comparePassword) {
        return left(new IncorrectCredentialsError());
      }
    }

    const { password: _, ...playerWithoutPassword } = playerAlreadyExists;

    return right({ user: playerWithoutPassword as Omit<User, 'password'> });
  }
}
