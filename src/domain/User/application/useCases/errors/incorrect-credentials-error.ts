import { UseCaseError } from 'src/core/errors/use-case-error';

export class IncorrectCredentialsError extends Error implements UseCaseError {
  constructor() {
    super(`Incorrect credentials.`);
  }
}
