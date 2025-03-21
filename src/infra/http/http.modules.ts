import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { RegisterUserController } from './controllers/register-user.controller';
import { RegisterUserService } from 'src/domain/User/application/useCases/RegisterUser/RegisterUserService';
import { SessionService } from 'src/domain/User/application/useCases/Session/SessionService';
import { GetUserByIdService } from 'src/domain/User/application/useCases/GetUserById/GetUserByIdService';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [RegisterUserController, AuthController],
  providers: [RegisterUserService, SessionService, GetUserByIdService],
})
export class HttpModule {}
