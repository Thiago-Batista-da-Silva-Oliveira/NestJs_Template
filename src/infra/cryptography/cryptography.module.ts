import { Module } from '@nestjs/common';
import { JwtEncrypter } from './jwt-encrypter';
import { HashProvider } from './bcrypt-hasher';
import { Encrypter } from 'src/domain/User/application/providers/hashProvider/model/encrypter';
import { HashProviderModel } from 'src/domain/User/application/providers/hashProvider/model/IHashProvider';

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashProviderModel,
      useClass: HashProvider,
    },
  ],
  exports: [Encrypter, HashProviderModel],
})
export class CryptographyModule {}
