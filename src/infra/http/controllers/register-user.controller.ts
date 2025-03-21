import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { Public } from 'src/infra/auth/public';
import { RegisterUserService } from 'src/domain/User/application/useCases/RegisterUser/RegisterUserService';
import { UserAlreadyExistsError } from 'src/domain/User/application/useCases/errors';

const createUserBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  provider: z.enum(['LOCAL', 'GOOGLE', 'FACEBOOK', 'INSTAGRAM']).optional(),
  providerId: z.string().optional(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller('/user')
@Public()
export class RegisterUserController {
  constructor(private registerUser: RegisterUserService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBodySchema) {
    const { firstName, email, password, lastName, provider, providerId } = body;

    const result = await this.registerUser.execute({
      firstName,
      email,
      password,
      lastName,
      provider,
      providerId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
