export interface IUserRegistrationDTO {
  email: string;
  password?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  accessType?: 'USER' | 'ADMIN';
  createdAt?: Date;
  updatedAt?: Date;
  firstName?: string;
  lastName?: string;
  provider?: 'LOCAL' | 'GOOGLE' | 'FACEBOOK' | 'INSTAGRAM';
  providerId?: string;
  refreshToken?: string;
}
