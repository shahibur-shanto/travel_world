/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder, IOrderById } from './order.interface';
import { OrderService } from './order.service';
// import { JwtPayload, Secret } from 'jsonwebtoken';
// import { jwtHelpers } from '../../../helpers/jwtHelpers';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(
    token as string,
    config.jwt.secret as Secret
  ) as JwtPayload;

  const orderBooks = req.body;

  console.log(orderBooks.orderedBooks);
  if (!Array.isArray(orderBooks.orderedBooks)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Invalid orderBooks format. It should be an array of objects.',
    });
  }

  const orderData: IOrder = {
    userId: decoded.id,
    orderBooks: orderBooks.orderedBooks.map((book: any) => ({
      bookId: book.bookId, // Replace with the correct property name from your request body
      quantity: book.quantity, // Replace with the correct property name from your request body
    })),
  };

  const result = await OrderService.createOrder(orderData);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(
    token as string,
    config.jwt.secret as Secret
  ) as JwtPayload;

  const result = await OrderService.getAllOrder(decoded);
  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Order Retreive',
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(
    token as string,
    config.jwt.secret as Secret
  ) as JwtPayload;
  const data: IOrderById = {
    userId: decoded.id,
    orderId: req.params.orderId,
    role: decoded.role,
  };

  const result = await OrderService.getOrderById(data);
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Retreive Successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getOrderById,
};
