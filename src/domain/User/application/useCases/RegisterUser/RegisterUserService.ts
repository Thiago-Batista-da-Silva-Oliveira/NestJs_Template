import { Either, left, right } from 'src/core/either';
import { HashProviderModel } from '../../providers/hashProvider/model/IHashProvider';
import { Injectable } from '@nestjs/common';
import { UserAlreadyExistsError } from '../errors';
import { User } from 'src/domain/User/enterprise/entities/User';
import { UserRepository } from '../../repositories';
import { IUserRegistrationDTO } from '../../dtos';

type IOutput = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;
@Injectable()
export class RegisterUserService {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProviderModel,
  ) {}
  async execute({
    email,
    firstName,
    password,
    lastName,
    provider,
    providerId,
  }: IUserRegistrationDTO): Promise<IOutput> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError(email));
    }

    let hashedPassword: string | undefined = undefined;

    if (password) {
      hashedPassword = await this.hashProvider.hash(password);
    }

    const user = User.create({
      email,
      firstName,
      password: hashedPassword,
      lastName,
      provider,
      providerId,
    });

    const createdUser = await this.userRepository.register(user);

    return right({ user: createdUser });
  }
}
