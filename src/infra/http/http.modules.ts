import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { RegisterUserController } from './controllers/register-user.controller';
import { RegisterUserService } from 'src/domain/User/application/useCases/RegisterUser/RegisterUserService';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [RegisterUserController],
  providers: [RegisterUserService],
})
export class HttpModule {}
