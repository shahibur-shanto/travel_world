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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_constants_1 = require("./book.constants");
const prisma = new client_1.PrismaClient();
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBook = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    let { totalPage } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice } = filters, filterData = __rest(filters, ["search", "minPrice", "maxPrice"]);
    const andConditons = [];
    if (search) {
        andConditons.push({
            OR: book_constants_1.BookSearchAbleFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    if (minPrice !== undefined) {
        andConditons.push({
            price: {
                gte: parseFloat(minPrice),
            },
        });
    }
    if (maxPrice !== undefined) {
        andConditons.push({
            price: {
                lte: parseFloat(maxPrice),
            },
        });
    }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma.book.findMany({
        where: whereConditons,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : { publicationDate: 'asc' },
        skip,
        take: limit,
        include: {
            category: true,
        },
    });
    const total = yield prisma.book.count({
        where: whereConditons,
    });
    totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const bookByCategoryId = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    let { totalPage } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const total = yield prisma.book.count({
        where: {
            categoryId: {
                equals: id,
            },
        },
    });
    totalPage = Math.ceil(total / limit);
    const result = yield prisma.book.findMany({
        where: {
            categoryId: {
                equals: id,
            },
        },
        skip,
        take: limit,
    });
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookService = {
    insertIntoDB,
    getAllBook,
    bookByCategoryId,
    getSingleBook,
    updateBook,
    deleteBook,
};
