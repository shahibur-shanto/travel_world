/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
// eslint-disable-next-line @typescript-eslint/no-var-requires


cloudinary.config({
  cloud_name: 'dmam6uulx',
  api_key: '348146485332311',
  api_secret: 'SDVeWiLR2isjvO9x_oVqmsnyu78',
});

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, './uploads/');
  },
  filename: function (req, file, callBack) {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: { buffer: any }) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'auto' }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(file.buffer);
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};
