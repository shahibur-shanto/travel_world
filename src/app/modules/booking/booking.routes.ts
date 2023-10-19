import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/booking/create-booking',
  auth(ENUM_USER_ROLE.CUSTOMER),
  BookingController.createBooking
);
router.get(
  '/booking',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  BookingController.getAllBooking
);
// router.get(
//   '/booking/:bookingId',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.CUSTOMER
//   ),
//   BookingController.getBookingById
// );

export const OrderRoutes = router;
