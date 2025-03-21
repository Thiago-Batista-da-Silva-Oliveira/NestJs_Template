/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { User as PrismaUser, Prisma } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique_entity_id';
import { User } from 'src/domain/User/enterprise/entities/User';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        firstName: raw.firstName || undefined,
        lastName: raw.lastName || undefined,
        provider: raw.provider,
        providerId: raw.providerId || undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        refreshToken: raw.refreshToken || undefined,
        email: raw.email,
        password: raw.password || undefined,
        accessType: raw.accessType,
        status: raw.status,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(player: User): Prisma.UserUncheckedCreateInput {
    return {
      id: player.id.toString(),
      firstName: player.firstName,
      email: player.email,
      password: player.password,
      accessType: player.accessType || 'USER',
      status: player.status || 'ACTIVE',
      refreshToken: player.refreshToken,
      lastName: player.lastName,
      provider: player.provider,
      providerId: player.providerId,
      createdAt: player.createdAt,
      updatedAt: new Date(),
    };
  }
}
