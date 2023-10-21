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
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma = new client_1.PrismaClient();
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const result = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    //   console.log(result);
    if (!result) {
        throw new ApiError_1.default(404, 'User Does not Exists');
    }
    // console.log('given pass', password);
    // console.log('saved pass', result.password);
    const passMatch = yield bcryptjs_1.default.compare(password, result.password);
    // console.log(passMatch);
    if (!passMatch) {
        throw new ApiError_1.default(404, 'Password not matched');
    }
    const { role, id } = result;
    //   console.log(role, id);
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ role, id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    //   const refreshToken = jwtHelpers.createToken(
    //     { phoneNumber, role, id },
    //     config.jwt.refresh_secret as Secret,
    //     config.jwt.refresh_expires_in as string
    //   );
    return {
        result,
        accessToken,
        // refreshToken,
        // needPasswordChange,
    };
});
exports.AuthService = {
    loginUser,
};
