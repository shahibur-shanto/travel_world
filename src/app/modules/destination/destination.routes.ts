import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { DestinationController } from './destination.controller';

const router = express.Router();

router.post(
  '/destination/create-destination',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DestinationController.insertIntoDB
);
router.get('/destinations', DestinationController.getAllDestination);
router.get('/destinations/:id', DestinationController.getSingleDestination);
router.patch(
  '/destinations/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DestinationController.updateDestination
);
router.delete(
  '/destinations/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DestinationController.deleteDestination
);
// router.get('/books/:id/category', DestinationController.bookByCategoryId);

export const BookRoutes = router;
