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
exports.ActivityService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { destinationId } = data;
    const isExists = yield prisma.destination.findUnique({
        where: {
            id: destinationId,
        },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'destination not found');
    }
    const result = yield prisma.activity.create({
        data,
    });
    return result;
});
const getAllActivity = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.activity.findMany();
    const total = yield prisma.activity.count();
    return {
        meta: {
            total: total,
            page: 1,
            limit: 10,
        },
        data: result,
    };
});
const getSingleActivity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.activity.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateActivity = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.activity.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteActivity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.activity.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ActivityService = {
    insertIntoDB,
    getAllActivity,
    getSingleActivity,
    updateActivity,
    deleteActivity,
};
