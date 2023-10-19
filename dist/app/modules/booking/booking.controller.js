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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    // const orderBooking = req.body;
    const userId = decoded.id;
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
    const result = yield booking_service_1.BookingService.createBooking(userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Created Successfully',
        data: result,
    });
}));
const getAllBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    const result = yield booking_service_1.BookingService.getAllBooking(decoded);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Order Retreive',
        data: result,
    });
}));
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
exports.BookingController = {
    createBooking,
    getAllBooking,
    // getBookingById,
};
