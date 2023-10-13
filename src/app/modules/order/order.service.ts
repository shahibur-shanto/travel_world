import { Order, PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IOrder, IOrderById } from './order.interface';

const prisma = new PrismaClient();
const createOrder = async (data: IOrder): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

const getAllOrder = async (data: JwtPayload) => {
  const { role, id } = data;

  if (role === 'admin') {
    const result = await prisma.order.findMany({});
    return result;
  } else if (role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: id,
      },
    });
    return result;
  }
};

const getOrderById = async (data: IOrderById): Promise<Order | null> => {
  const { orderId, role, userId } = data;

  console.log('OrderId: ', orderId);
  console.log('role: ', role);
  console.log('User ID', userId);

  const isExists = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
  });

  if (isExists) {
    if (role === 'admin') {
      const result = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });
      return result;
    } else if (role === 'customer') {
      const result = await prisma.order.findFirst({
        where: {
          id: orderId,
          userId: userId,
        },
      });
      if (result) {
        return result;
      } else {
        throw new ApiError(200, 'You are not Authorized');
      }
    }
  } else {
    throw new ApiError(200, 'Order does not exists');
  }
  return null;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getOrderById,
};
