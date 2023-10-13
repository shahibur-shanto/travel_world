import { PrismaClient } from '@prisma/client';
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

  if (result.password !== password) {
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
