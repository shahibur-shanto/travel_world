"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activity_routes_1 = require("../modules/activity/activity.routes");
const auth_router_1 = require("../modules/auth/auth.router");
const booking_routes_1 = require("../modules/booking/booking.routes");
const destination_routes_1 = require("../modules/destination/destination.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/',
        route: activity_routes_1.CategoryRoutes,
    },
    {
        path: '/',
        route: destination_routes_1.BookRoutes,
    },
    {
        path: '/',
        route: auth_router_1.AuthRoutes,
    },
    {
        path: '/',
        route: booking_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
