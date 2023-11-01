"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadHelper = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
cloudinary_1.v2.config({
    cloud_name: 'dmam6uulx',
    api_key: '348146485332311',
    api_secret: 'SDVeWiLR2isjvO9x_oVqmsnyu78',
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './uploads/');
    },
    filename: function (req, file, callBack) {
        callBack(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const uploadToCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        })
            .end(file.buffer);
    });
});
exports.FileUploadHelper = {
    uploadToCloudinary,
    upload,
};
