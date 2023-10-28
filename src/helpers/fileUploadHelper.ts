/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import * as fs from 'fs';
import { ICloudinaryResponse, IUploadFile } from '../interfaces/file';

cloudinary.config({
  cloud_name: 'dmam6uulx',
  api_key: '348146485332311',
  api_secret: 'SDVeWiLR2isjvO9x_oVqmsnyu78',
});

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, 'uploads/');
  },
  filename: function (req, file, callBack) {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file:IUploadFile):Promise<ICloudinaryResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error:Error, result:ICloudinaryResponse) => {
        fs.unlinkSync(file.path)
        if (error) {
          reject(error);
        }
        else {
          resolve(result);
        }
      }
      
    );
  })
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};
