"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
// import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
const auth_1 = __importDefault(require("../../middlewares/auth"));
const destination_controller_1 = require("./destination.controller");
// import { DestinationValidation } from './destination.validations';
const router = express_1.default.Router();
router.post('/destination/create-destination', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
// FileUploadHelper.upload.single('file'),
// (req: Request, res: Response, next: NextFunction) => {
//   req.body = DestinationValidation.createDestination.parse(
//     JSON.parse(req.body.data)
//   );
//   return
destination_controller_1.DestinationController.insertIntoDB);
router.get('/destinations', destination_controller_1.DestinationController.getAllDestination);
router.get('/destinations/:id', destination_controller_1.DestinationController.getSingleDestination);
router.patch('/destinations/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), destination_controller_1.DestinationController.updateDestination);
router.delete('/destinations/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), destination_controller_1.DestinationController.deleteDestination);
// router.get('/books/:id/category', DestinationController.bookByCategoryId);
exports.BookRoutes = router;
