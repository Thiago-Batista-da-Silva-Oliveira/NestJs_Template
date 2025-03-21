import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique_entity_id';

export interface UserProps {
  email: string;
  password?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  accessType?: 'USER' | 'ADMIN';
  createdAt?: Date;
  updatedAt?: Date;
  firstName?: string;
  lastName?: string;
  provider?: 'LOCAL' | 'GOOGLE' | 'FACEBOOK' | 'INSTAGRAM';
  providerId?: string;
  refreshToken?: string;
}

export class User extends Entity<UserProps> {
  get firstName() {
    return this.props.firstName;
  }
  get lastName() {
    return this.props.lastName;
  }
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get status() {
    return this.props.status;
  }

  get accessType() {
    return this.props.accessType;
  }

  get provider() {
    return this.props.provider;
  }

  get providerId() {
    return this.props.providerId;
  }

  get refreshToken() {
    return this.props.refreshToken;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    if (!props.accessType) {
      props.accessType = 'USER';
    }

    if (!props.status) {
      props.status = 'ACTIVE';
    }

    if (!props.createdAt) {
      props.createdAt = new Date();
    }

    if (!props.updatedAt) {
      props.updatedAt = new Date();
    }

    if (!props.provider) {
      props.provider = 'LOCAL';
    }
    const user = new User(props, id);

    return user;
  }
}
