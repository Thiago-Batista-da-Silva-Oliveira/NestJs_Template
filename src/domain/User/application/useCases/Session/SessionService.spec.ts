import { makeUser } from '../../repositories/tests/factories/makeUser';
import { InMemoryHashProvider } from '../../repositories/tests/InMemoryHashProvider';
import { InMemoryUserRepository } from '../../repositories/tests/InMemoryUserRepository';
import { IncorrectCredentialsError } from '../errors';
import { SessionService } from './SessionService';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryHashRepository: InMemoryHashProvider;

let sut: SessionService;

describe('Player session', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryHashRepository = new InMemoryHashProvider();
    sut = new SessionService(inMemoryUserRepository, inMemoryHashRepository);
  });

  it('should be able login', async () => {
    inMemoryUserRepository.items.push(makeUser({ email: 'Jhon@doe.com.br' }));

    const result = await sut.execute({
      email: 'Jhon@doe.com.br',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
  });

  it('should not be able to login with a wrong email', async () => {
    inMemoryUserRepository.items.push(makeUser({ email: 'Jhon@doe.com.br' }));
    const result = await sut.execute({
      email: 'Jhon2@doe.com.br',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);

    expect(result.value).toBeInstanceOf(IncorrectCredentialsError);
  });

  it('should not be able to login with a wrong password', async () => {
    inMemoryUserRepository.items.push(makeUser({ email: 'Jhon@doe.com.br' }));
    const result = await sut.execute({
      email: 'Jhon@doe.com.br',
      password: '1234567',
    });

    expect(result.isLeft()).toBe(true);

    expect(result.value).toBeInstanceOf(IncorrectCredentialsError);
  });
});
