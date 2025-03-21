import { UseCaseError } from 'src/core/errors/use-case-error';

export class UserDoesNotExistError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" does not exist.`);
  }
}
