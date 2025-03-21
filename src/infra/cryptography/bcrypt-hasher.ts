/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import bcrypt from 'bcryptjs';
import { HashProviderModel } from 'src/domain/User/application/providers/hashProvider/model/IHashProvider';

export class HashProvider implements HashProviderModel {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 8);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
