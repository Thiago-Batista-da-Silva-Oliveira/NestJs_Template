import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Public } from '../../auth/public';
import { SocialAuthService } from 'src/domain/User/application/useCases/SocialAuth/SocialAuthService';

@Controller('social_auth')
export class SocialAuthController {
  constructor(private socialAuthService: SocialAuthService) {}

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // This route initiates Google OAuth, handled by the GoogleStrategy
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.socialAuthService.handleSocialLogin(req, res);
  }
}
