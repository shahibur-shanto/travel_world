import { Booking, PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();
const createBooking = async (
  userId: string,
  data: Booking
): Promise<Booking> => {
  data.userId = userId;
  const result = await prisma.booking.create({ data });
  return result;
};

const getAllBooking = async (data: JwtPayload) => {
  const { role, id } = data;

  if (role === 'admin') {
    const result = await prisma.booking.findMany({});
    return result;
  } else if (role === 'customer') {
    const result = await prisma.booking.findMany({
      where: {
        userId: id,
      },
    });
    return result;
  }
};

// const getBookingById = async (data: IBooking): Promise<Booking | null> => {
//   const { userId } = data;

//   // console.log('OrderId: ', orderId);
//   // console.log('role: ', role);
//   // console.log('User ID', userId);

//   const isExists = await prisma.booking.findFirst({
//     where: {
//       id: orderId,
//     },
//   });

//   if (isExists) {
//     if (role === 'admin') {
//       const result = await prisma.booking.findUnique({
//         where: {
//           id: orderId,
//         },
//       });
//       return result;
//     } else if (role === 'customer') {
//       const result = await prisma.booking.findFirst({
//         where: {
//           id: orderId,
//           userId: userId,
//         },
//       });
//       if (result) {
//         return result;
//       } else {
//         throw new ApiError(200, 'You are not Authorized');
//       }
//     }
//   } else {
//     throw new ApiError(200, 'Order does not exists');
//   }
//   return null;
// };

export const BookingService = {
  createBooking,
  getAllBooking,
  // getBookingById,
};
