import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async(req:Request,res:Response)=>{
    const result = await AuthService.loginUser(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User Logedin Successfully",
        token:result?.accessToken,
        // data:result
    })
})

export const AuthController = {
    loginUser
}