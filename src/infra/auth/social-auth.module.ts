import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { EnvModuele } from '../env/env.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { EnvService } from '../env/env.service';
import { SocialAuthController } from '../http/controllers/social-auth.controller';
import { GoogleStrategy } from './google-auth-strategy';
import { SocialAuthService } from 'src/domain/User/application/useCases/SocialAuth/SocialAuthService';
import { RegisterUserService } from 'src/domain/User/application/useCases/RegisterUser/RegisterUserService';

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    EnvModuele,
    CryptographyModule,
    JwtModule.registerAsync({
      imports: [EnvModuele],
      inject: [EnvService],
      useFactory(envService: EnvService) {
        const privateKey = envService.get('JWT_PRIVATE_KEY');
        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: '15m',
          },
        };
      },
    }),
  ],
  controllers: [SocialAuthController],
  providers: [GoogleStrategy, SocialAuthService, RegisterUserService],
})
export class SocialAuthModule {}
