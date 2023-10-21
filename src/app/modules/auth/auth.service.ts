import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILogedInUser, ILoginUserResponse } from './auth.interface';

const prisma = new PrismaClient();

const loginUser = async (
  payload: ILogedInUser
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;

  const result = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  //   console.log(result);
  if (!result) {
    throw new ApiError(404, 'User Does not Exists');
  }
  // console.log('given pass', password);
  // console.log('saved pass', result.password);
  const passMatch = await bcrypt.compare(password, result.password);
  // console.log(passMatch);
  if (!passMatch) {
    throw new ApiError(404, 'Password not matched');
  }

  const { role, id } = result;
  //   console.log(role, id);
  const accessToken = jwtHelpers.createToken(
    { role, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //   const refreshToken = jwtHelpers.createToken(
  //     { phoneNumber, role, id },
  //     config.jwt.refresh_secret as Secret,
  //     config.jwt.refresh_expires_in as string
  //   );

  return {
    result,

    accessToken,
    // refreshToken,
    // needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
