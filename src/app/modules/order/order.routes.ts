import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.post(
  '/orders/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);
router.get(
  '/orders',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  OrderController.getAllOrder
);
router.get(
  '/orders/:orderId',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  OrderController.getOrderById
);

export const OrderRoutes = router;
