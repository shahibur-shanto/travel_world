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
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.order.create({
        data,
    });
    return result;
});
const getAllOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, id } = data;
    if (role === 'admin') {
        const result = yield prisma.order.findMany({});
        return result;
    }
    else if (role === 'customer') {
        const result = yield prisma.order.findMany({
            where: {
                userId: id,
            },
        });
        return result;
    }
});
const getOrderById = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, role, userId } = data;
    console.log('OrderId: ', orderId);
    console.log('role: ', role);
    console.log('User ID', userId);
    const isExists = yield prisma.order.findFirst({
        where: {
            id: orderId,
        },
    });
    if (isExists) {
        if (role === 'admin') {
            const result = yield prisma.order.findUnique({
                where: {
                    id: orderId,
                },
            });
            return result;
        }
        else if (role === 'customer') {
            const result = yield prisma.order.findFirst({
                where: {
                    id: orderId,
                    userId: userId,
                },
            });
            if (result) {
                return result;
            }
            else {
                throw new ApiError_1.default(200, 'You are not Authorized');
            }
        }
    }
    else {
        throw new ApiError_1.default(200, 'Order does not exists');
    }
    return null;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    getOrderById,
};
