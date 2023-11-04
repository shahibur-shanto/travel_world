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
exports.DestinationService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
// import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const destination_constants_1 = require("./destination.constants");
const prisma = new client_1.PrismaClient();
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.destination.create({
        data,
        include: {
            activities: true,
            booking: true,
        },
    });
    return result;
});
const getAllDestination = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    let { totalPage } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice } = filters, filterData = __rest(filters, ["search", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: destination_constants_1.destinationSearchAbleFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push(...Object.keys(filterData).map(key => ({
            [key]: {
                equals: filterData[key],
            },
        })));
    }
    if (minPrice !== undefined) {
        andConditions.push({
            cost: {
                gte: parseFloat(minPrice).toString(),
            },
        });
    }
    if (maxPrice !== undefined) {
        andConditions.push({
            cost: {
                lte: parseFloat(maxPrice).toString(),
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.destination.findMany({
        where: whereConditions,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : { country: 'asc' },
        skip,
        take: limit,
    });
    const total = yield prisma.destination.count({
        where: whereConditions,
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
// const bookByCategoryId = async (
//   id: string,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<Destination[]>> => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   let { totalPage } = paginationHelpers.calculatePagination(options);
//   const total = await prisma.destination.count({
//     where: {
//       categoryId: {
//         equals: id,
//       },
//     },
//   });
//   totalPage = Math.ceil(total / limit);
//   const result = await prisma.destination.findMany({
//     where: {
//       categoryId: {
//         equals: id,
//       },
//     },
//     skip,
//     take: limit,
//   });
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//       totalPage,
//     },
//     data: result,
//   };
// };
const getSingleDestination = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.destination.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateDestination = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.destination.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteDestination = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.destination.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.DestinationService = {
    insertIntoDB,
    getAllDestination,
    // bookByCategoryId,
    getSingleDestination,
    updateDestination,
    deleteDestination,
};
