import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-user-repository';
import { UserRepository } from 'src/domain/User/application/repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
