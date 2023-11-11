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
exports.DestinationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const destination_constants_1 = require("./destination.constants");
const destination_service_1 = require("./destination.service");
// const insertIntoDB = (data) => {
//   console.log(data);
// }
const insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const result = (yield destination_service_1.DestinationService.insertIntoDB(req.body));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Destination Created Successfully!!!!',
        data: result,
    });
    return result;
}));
const getAllDestination = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, destination_constants_1.DestinationFilterAbleFileds);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield destination_service_1.DestinationService.getAllDestination(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Destination Fetch Successfully',
        meta: result.meta,
        data: result.data,
    });
    return result;
}));
// const DestinationByCategoryId = catchAsync(async (req: Request, res: Response) => {
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   const result = await DestinationService.DestinationByCategoryId(
//     req.params.id,
//     options
//   );
//   sendResponse<Destination[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Destinations with associated category data fetched successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });
const getSingleDestination = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield destination_service_1.DestinationService.getSingleDestination(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Destination fetched successfully',
        data: result,
    });
}));
const updateDestination = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield destination_service_1.DestinationService.updateDestination(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Destination Update Successfully',
        data: result,
    });
    return result;
}));
const deleteDestination = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield destination_service_1.DestinationService.deleteDestination(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Destination Deleted Successfully',
        data: result,
    });
    return result;
}));
exports.DestinationController = {
    insertIntoDB,
    getAllDestination,
    // DestinationByCategoryId,
    getSingleDestination,
    updateDestination,
    deleteDestination,
};
