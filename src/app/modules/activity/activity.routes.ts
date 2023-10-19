import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ActivityController } from './activity.controller';

const router = express.Router();

router.post(
  '/activities/create-activity',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ActivityController.insertIntoDB
);
router.get('/activities', ActivityController.getAllActivity);
router.get('/activities/:id', ActivityController.getSingleActivity);
router.patch(
  '/activities/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ActivityController.updateActivity
);
router.delete(
  '/activities/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ActivityController.deleteActivity
);

export const CategoryRoutes = router;
