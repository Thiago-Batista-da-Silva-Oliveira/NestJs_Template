/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserRepository } from 'src/domain/User/application/repositories';
import { RegisterUserService } from 'src/domain/User/application/useCases/RegisterUser/RegisterUserService';
import { EnvService } from '../env/env.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private envService: EnvService,
    private userRepository: UserRepository,
    private registerUserService: RegisterUserService,
  ) {
    super({
      clientID: envService.get('GOOGLE_CLIENT_ID'),
      clientSecret: envService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: envService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails } = profile;

    const email = emails[0].value;
    const firstName = name.givenName;
    const lastName = name.familyName;

    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      const result = await this.registerUserService.execute({
        email,
        firstName,
        lastName,
        provider: 'GOOGLE',
        providerId: id,
      });

      if (result.isRight()) {
        user = result.value.user;
      } else {
        return done(result.value, undefined);
      }
    }

    const userProfile = {
      id: user.id.toString(),
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      provider: user.provider || 'GOOGLE',
    };

    return done(null, userProfile);
  }
}
