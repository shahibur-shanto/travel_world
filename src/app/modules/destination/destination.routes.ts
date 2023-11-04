import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
// import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import auth from '../../middlewares/auth';
import { DestinationController } from './destination.controller';
// import { DestinationValidation } from './destination.validations';

const router = express.Router();

router.post(
  '/destination/create-destination',
  DestinationController.insertIntoDB
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  // FileUploadHelper.upload.single('file'),
  // (req: Request) => {
  //   req.body = DestinationValidation.createDestination.parse(
  //     JSON.parse(req.body.data)
  //   );
  //   return DestinationController.insertIntoDB;
  // }
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
