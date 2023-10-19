"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBooking = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    data.userId = userId;
    const result = yield prisma.booking.create({ data });
    return result;
});
const getAllBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, id } = data;
    if (role === 'admin') {
        const result = yield prisma.booking.findMany({});
        return result;
    }
    else if (role === 'customer') {
        const result = yield prisma.booking.findMany({
            where: {
                userId: id,
            },
        });
        return result;
    }
});
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
exports.BookingService = {
    createBooking,
    getAllBooking,
    // getBookingById,
};
