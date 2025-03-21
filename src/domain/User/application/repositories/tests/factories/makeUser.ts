import { UniqueEntityID } from 'src/core/entities/unique_entity_id';
import { User, UserProps } from 'src/domain/User/enterprise/entities/User';

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      firstName: 'Joe',
      lastName: 'Doe',
      provider: 'LOCAL',
      accessType: 'USER',
      status: 'ACTIVE',
      email: 'joe@doe.com',
      password: '123456',
      ...override,
    },
    id,
  );

  return user;
}
