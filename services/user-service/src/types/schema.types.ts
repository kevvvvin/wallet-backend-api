import { Types, Document } from 'mongoose';
import { StatusEnum, RoleEnum, KycUserStatusEnum } from '../enums';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  status: StatusEnum;
  kycStatus: KycUserStatusEnum;
  roles: IRole[];
  isEmailVerified: boolean;
  emailVerificationToken: string | undefined;
  emailVerificationExpiration: Date | undefined;
  checkPassword(candidatePassword: string): Promise<boolean>;
}

export interface IRole extends Document {
  _id: Types.ObjectId;
  name: RoleEnum;
  description: string;
}

export interface ITokenBlacklist extends Document {
  _id: Types.ObjectId;
  token: string;
  expiresAt: Date;
}
