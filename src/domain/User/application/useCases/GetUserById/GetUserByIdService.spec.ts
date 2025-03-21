import { makeUser } from '../../repositories/tests/factories/makeUser';
import { InMemoryUserRepository } from '../../repositories/tests/InMemoryUserRepository';
import { UserDoesNotExistError } from '../errors';
import { GetUserByIdService } from './GetUserByIdService';

let inMemoryUserRepository: InMemoryUserRepository;

let sut: GetUserByIdService;

describe('Get User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserByIdService(inMemoryUserRepository);
  });

  it('should be able to get a user', async () => {
    const user = makeUser({ email: 'Jhon@doe.com.br' });
    inMemoryUserRepository.items.push(user);

    const result = await sut.execute({ id: user.id.toValue() });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      user: inMemoryUserRepository.items[0],
    });
  });

  it('should not be able to get a user with a invalid id', async () => {
    const result = await sut.execute({
      id: 'invalid-id',
    });

    expect(result.isLeft()).toBe(true);

    expect(result.value).toBeInstanceOf(UserDoesNotExistError);
  });
});
