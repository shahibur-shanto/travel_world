"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/booking/create-booking', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), booking_controller_1.BookingController.createBooking);
router.get('/booking', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), booking_controller_1.BookingController.getAllBooking);
// router.get(
//   '/booking/:bookingId',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.CUSTOMER
//   ),
//   BookingController.getBookingById
// );
exports.OrderRoutes = router;
