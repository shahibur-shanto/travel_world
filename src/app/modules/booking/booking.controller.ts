/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(
    token as string,
    config.jwt.secret as Secret
  ) as JwtPayload;

  // const orderBooking = req.body;
  const userId: string = decoded.id;
  // const bookingData: IBooking = {
  //   userId: decoded.id,
  //   destinationId: req.body.destinationId,
  //   checkIn: req.body.checkIn,
  //   checkOut: req.body.checkOut,
  //   numberOfAdults: req.body.numberOfAdults,
  //   numberOfChildren: req.body.numberOfChildren,
  //   totalPrice: req.body.totalPage,
  //   status: req.body.status,
  // };

  const result = await BookingService.createBooking(userId, req.body);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(
    token as string,
    config.jwt.secret as Secret
  ) as JwtPayload;

  const result = await BookingService.getAllBooking(decoded);
  sendResponse<Booking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Order Retreive',
    data: result,
  });
});

// const getBookingById = catchAsync(async (req: Request, res: Response) => {
//   const token = req.headers.authorization;
//   const decoded = jwt.verify(
//     token as string,
//     config.jwt.secret as Secret
//   ) as JwtPayload;
//   const data: IBookingById = {
//     userId: decoded.id,
//     orderId: req.params.orderId,
//     role: decoded.role,
//   };

//   const result = await BookingService.getBookingById(data);
//   sendResponse<Booking>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order Retreive Successfully',
//     data: result,
//   });
// });

export const BookingController = {
  createBooking,
  getAllBooking,
  // getBookingById,
};
