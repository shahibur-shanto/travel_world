"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const activity_controller_1 = require("./activity.controller");
const router = express_1.default.Router();
router.post('/activities/create-activity', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.ActivityController.insertIntoDB);
router.get('/activities', activity_controller_1.ActivityController.getAllActivity);
router.get('/activities/:id', activity_controller_1.ActivityController.getSingleActivity);
router.patch('/activities/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.ActivityController.updateActivity);
router.delete('/activities/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.ActivityController.deleteActivity);
exports.CategoryRoutes = router;
