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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
// import { JwtPayload, Secret } from 'jsonwebtoken';
// import { jwtHelpers } from '../../../helpers/jwtHelpers';
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    const orderBooks = req.body;
    console.log(orderBooks.orderedBooks);
    if (!Array.isArray(orderBooks.orderedBooks)) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: 'Invalid orderBooks format. It should be an array of objects.',
        });
    }
    const orderData = {
        userId: decoded.id,
        orderBooks: orderBooks.orderedBooks.map((book) => ({
            bookId: book.bookId,
            quantity: book.quantity, // Replace with the correct property name from your request body
        })),
    };
    const result = yield order_service_1.OrderService.createOrder(orderData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Created Successfully',
        data: result,
    });
}));
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    const result = yield order_service_1.OrderService.getAllOrder(decoded);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Order Retreive',
        data: result,
    });
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    const data = {
        userId: decoded.id,
        orderId: req.params.orderId,
        role: decoded.role,
    };
    const result = yield order_service_1.OrderService.getOrderById(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Retreive Successfully',
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getAllOrder,
    getOrderById,
};
