"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const destination_controller_1 = require("./destination.controller");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const destination_validations_1 = require("./destination.validations");
const router = express_1.default.Router();
router.post('/destination/create-destination', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
fileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = destination_validations_1.DestinationValidation.createDestination.parse(JSON.parse(req.body.data));
    return destination_controller_1.DestinationController.insertIntoDB(req, res, next);
});
router.get('/destinations', destination_controller_1.DestinationController.getAllDestination);
router.get('/destinations/:id', destination_controller_1.DestinationController.getSingleDestination);
router.patch('/destinations/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), destination_controller_1.DestinationController.updateDestination);
router.delete('/destinations/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), destination_controller_1.DestinationController.deleteDestination);
// router.get('/books/:id/category', DestinationController.bookByCategoryId);
exports.BookRoutes = router;
