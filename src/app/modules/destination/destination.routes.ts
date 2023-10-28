import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { DestinationController } from './destination.controller';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { DestinationValidation } from './destination.validations';

const router = express.Router();

router.post(
  '/destination/create-destination',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = DestinationValidation.createDestination.parse(JSON.parse(req.body.data))
    return DestinationController.insertIntoDB(req,res,next)
  }
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
