/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/domain/User/application/repositories';
import { EnvService } from 'src/infra/env/env.service';

interface PassportUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  provider?: string;
}

declare global {
  namespace Express {
    interface User extends PassportUser {}
  }
}

@Injectable()
export class SocialAuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private envService: EnvService,
  ) {}

  async handleSocialLogin(req: Request, res: Response) {
    const user = req.user as PassportUser | undefined;

    if (!user) {
      return res.redirect(
        `${this.envService.get('FRONTEND_URL')}/login?error=Authentication failed`,
      );
    }

    try {
      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
      });

      const redirectUrl = this.envService.get('FRONTEND_URL');

      return res.redirect(`${redirectUrl}/auth/callback?token=${accessToken}`);
    } catch (error: any) {
      return res.redirect(
        `${this.envService.get('FRONTEND_URL')}/login?error=Authentication failed`,
      );
    }
  }
}
