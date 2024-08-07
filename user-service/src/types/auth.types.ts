import { Types } from 'mongoose';

export interface RegisterRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AuthResponseBody {
  token: string;
  user: {
    id: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
  };
}
