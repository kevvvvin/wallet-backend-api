import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';
import { RegisterRequestBody, LoginRequestBody, AuthResponseBody } from '../types/auth.types';

const register = async (data: RegisterRequestBody): Promise<AuthResponseBody> => {
  const { email, password, firstName, lastName } = data;

  const user = new User({ email, password, firstName, lastName });
  await user.save();

  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: '1d',
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
};

const login = async (data: LoginRequestBody): Promise<AuthResponseBody> => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await user.checkPassword(password);
  if (!isMatch) throw new Error('Invalid email or password');

  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: '1d',
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
};

export const AuthService = {
  register,
  login,
};
