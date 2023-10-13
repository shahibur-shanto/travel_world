import { User } from "@prisma/client";

export type ILogedInUser = {
  email: string;
  password: string;
  // role: string;
};

export type ILoginUserResponse = {
  result: User;
  accessToken: string;
  refreshToken?: string;
  needPasswordChange?: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
