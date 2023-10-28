"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationValidation = void 0;
const zod_1 = require("zod");
const createDestination = zod_1.z.object({
    country: zod_1.z.string({
        required_error: 'Country is required',
    }),
    description: zod_1.z.string({
        required_error: 'Destination is required',
    }),
    location: zod_1.z.string({
        required_error: 'Location is required',
    }),
    category: zod_1.z.string({
        required_error: 'Location is required',
    }),
    transport: zod_1.z.string({
        required_error: 'Location is required',
    }),
    cost: zod_1.z.string({
        required_error: 'Cost is required',
    }),
});
exports.DestinationValidation = {
    createDestination,
};
