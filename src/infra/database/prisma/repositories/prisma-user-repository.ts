/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { User } from 'src/domain/User/enterprise/entities/User';
import { UserRepository } from 'src/domain/User/application/repositories';

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const player = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!player) {
      return null;
    }

    return PrismaUserMapper.toDomain(player);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return undefined;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async register(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    const prismaUser = await this.prisma.user.create({
      data,
    });

    return PrismaUserMapper.toDomain(prismaUser);
  }
}
