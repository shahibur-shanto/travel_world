/* eslint-disable no-undef */
import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
// import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import catchAsync from '../../../shared/catchAsync';
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
router.get('/allDestination', DestinationController.getAllDestination);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('multer');

const ALLOWED_FORMAT = ['image/jpeg', 'image/png', 'image/jpg'];

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  // eslint-disable-next-line no-unused-vars
  fileFilter: function (req:Request, file:Express.Multer.File, cb: (arg0: Error | null, arg1: boolean) => void) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Not supported file format!'), false);
    }
  },
});

const singleUpload = upload.single('file');

const singleUploadCtrl = (req:Request, res:Response, next:NextFunction) => {
  singleUpload(req, res, (error: unknown) => {
    if (error) {
      return res.send({ message: 'Image Upload Fail' });
    }

    next();
  });
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = (file:File) => cloudinary.uploader.upload(file);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DatauriParser = require('datauri/parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const parser = new DatauriParser();

// dUri.format('.png', buffer);
const dataUri = (file:Express.Multer.File) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

router.post(
  '/destination/image-upload',
  singleUploadCtrl,
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log('hi');
    try {
      if (!req.file) {
        throw new Error('Image is not presented!');
      }
      const file64 = dataUri(req.file);

      const uploadResult = await cloudinaryUpload(file64.content);
      const parsedData = JSON.parse(req.body.data);
      parsedData.image = uploadResult.secure_url;
      req.body = parsedData;
      // req.body = DestinationValidation.createDestination.parse(parsedData);
      // console.log(req.body);
      // req.body = DestinationValidation.createDestination.parse(
      //   JSON.parse(req.body.data)
      // );
      return DestinationController.insertIntoDB(req, res, next);

      // return res.json({
      //   cloudinaryId: uploadResult.public_id,
      //   url: uploadResult.secure_url,
      // });

      // const cImage = new CloudinaryImage({cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url});
      // await cImage.save();
      // return res.json(cImage);
    } catch (error) {
      return 'error occured';
    }
  })
);

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
