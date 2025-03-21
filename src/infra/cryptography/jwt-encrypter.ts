import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encrypter } from 'src/domain/User/application/providers/hashProvider/model/encrypter';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}
  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
