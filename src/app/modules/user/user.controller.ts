import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.insertIntoDB(req.body);
 

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();

  // const dataWithoutPassword = result.data.map((user: User | null) => {
  // const { password, ...userWithoutPassword } = user;
  // return userWithoutPassword;
  // });

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Fetch Successfully',
    meta: result.meta,
    data: result.data as User[],
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user fetch successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user update successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted Successfully',
    data: result,
  });
});

const userProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(
    token as string,
    config.jwt.secret as Secret
  ) as JwtPayload;

  const id = decoded.id;
  const result = await UserService.userProfile(id);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Retreive Successfully',
    data: result,
  });
});

export const UserController = {
  insertIntoDB,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  userProfile,
};
