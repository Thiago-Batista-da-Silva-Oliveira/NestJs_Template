import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../http/pipes/zod-validation-pipe';
import { SessionService } from 'src/domain/User/application/useCases/Session/SessionService';
import { JwtService } from '@nestjs/jwt';
import { IncorrectCredentialsError } from 'src/domain/User/application/useCases/errors';
import { Public } from 'src/infra/auth/public';

const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthBodySchema = z.infer<typeof authBodySchema>;

@Controller('/auth')
export class AuthController {
  constructor(
    private sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  @HttpCode(200)
  @Public()
  @UsePipes(new ZodValidationPipe(authBodySchema))
  async login(@Body() body: AuthBodySchema) {
    const { email, password } = body;

    const result = await this.sessionService.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case IncorrectCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { user } = result.value;

    const accessToken = await this.jwtService.signAsync({
      sub: user.id.toString(),
    });

    return {
      access_token: accessToken,
    };
  }
}
