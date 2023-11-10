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
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const destination_controller_1 = require("./destination.controller");
const router = express_1.default.Router();
// const multer = require('multer');
const multer_1 = __importDefault(require("multer"));
const ALLOWED_FORMAT = ['image/jpeg', 'image/png', 'image/jpg'];
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        if (ALLOWED_FORMAT.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Not supported file format!'), false);
        }
    },
});
const singleUpload = upload.single('file');
const singleUploadCtrl = (req, res, next) => {
    singleUpload(req, res, error => {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cloudinaryUpload = (file) => cloudinary.uploader.upload(file);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DatauriParser = require('datauri/parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const parser = new DatauriParser();
// dUri.format('.png', buffer);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataUri = (file) => parser.format(path.extname(file.originalname).toString(), file.buffer);
router.post('/destination/create-destination', singleUploadCtrl, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // DestinationController.insertIntoDB
    // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    // FileUploadHelper.upload.single('file'),
    // (req: Request) => {
    //   req.body = DestinationValidation.createDestination.parse(
    //     JSON.parse(req.body.data)
    //   );
    //   return DestinationController.insertIntoDB;
    // }
    try {
        if (!req.file) {
            throw new Error('Image is not presented!');
        }
        const file64 = dataUri(req.file);
        const uploadResult = yield cloudinaryUpload(file64.content);
        req.body.image = uploadResult.secure_url;
        return res.json({
            cloudinaryId: uploadResult.public_id,
            url: uploadResult.secure_url,
        });
        // const cImage = new CloudinaryImage({cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url});
        // await cImage.save();
        // return res.json(cImage);
    }
    catch (error) {
        return 'error occured';
    }
}));
router.get('/allDestination', destination_controller_1.DestinationController.getAllDestination);
// router.post('/destination/image-upload', singleUploadCtrl, async (req, res) => {
// });
router.get('/destinations/:id', destination_controller_1.DestinationController.getSingleDestination);
router.patch('/destinations/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), destination_controller_1.DestinationController.updateDestination);
router.delete('/destinations/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), destination_controller_1.DestinationController.deleteDestination);
// router.get('/books/:id/category', DestinationController.bookByCategoryId);
exports.BookRoutes = router;
