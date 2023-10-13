"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        token: data.token,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };
    res.status(data.statusCode || 200).json(responseData);
};
exports.default = sendResponse;
