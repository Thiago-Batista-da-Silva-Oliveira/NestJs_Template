import { makeUser } from '../../repositories/tests/factories/makeUser';
import { InMemoryHashProvider } from '../../repositories/tests/InMemoryHashProvider';
import { InMemoryUserRepository } from '../../repositories/tests/InMemoryUserRepository';
import { UserAlreadyExistsError } from '../errors';
import { RegisterUserService } from './RegisterUserService';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryHashRepository: InMemoryHashProvider;

let sut: RegisterUserService;

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryHashRepository = new InMemoryHashProvider();
    sut = new RegisterUserService(
      inMemoryUserRepository,
      inMemoryHashRepository,
    );
  });

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      email: 'joe@doe.com.br',
      firstName: 'Joe',
      lastName: 'Doe',
      password: '123456',
      provider: 'LOCAL',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      user: inMemoryUserRepository.items[0],
    });
  });

  it('should not be able to register a already register user', async () => {
    inMemoryUserRepository.items.push(makeUser({ email: 'Jhon@doe.com.br' }));
    const result = await sut.execute({
      email: 'Jhon@doe.com.br',
      firstName: 'Joe',
      lastName: 'Doe',
      password: '123456',
      provider: 'LOCAL',
    });

    expect(result.isLeft()).toBe(true);

    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
