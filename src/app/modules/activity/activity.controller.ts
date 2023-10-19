import { Activity } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ActivityService } from './activity.service';

const insertIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<Activity> => {
    const result = await ActivityService.insertIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category Created Successfully',
      data: result,
    });
    return result;
  }
);

const getAllActivity = catchAsync(async (req: Request, res: Response) => {
  const result = await ActivityService.getAllActivity();
  sendResponse<Activity[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Category fetch Successfully',
    meta: result.meta,
    data: result.data,
  });
  return result;
});

const getSingleActivity = catchAsync(async (req: Request, res: Response) => {
  const result = await ActivityService.getSingleActivity(req.params.id);
  sendResponse<Activity>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Category Fetch Successfully',
    data: result,
  });
});

const updateActivity = catchAsync(async (req: Request, res: Response) => {
  const result = await ActivityService.updateActivity(req.params.id, req.body);
  sendResponse<Activity>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated Successfully',
    data: result,
  });
  return result;
});

const deleteActivity = catchAsync(async (req: Request, res: Response) => {
  const result = await ActivityService.deleteActivity(req.params.id);
  sendResponse<Activity>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Deleted Successfully',
    data: result,
  });
  return result;
});

export const ActivityController = {
  insertIntoDB,
  getAllActivity,
  getSingleActivity,
  updateActivity,
  deleteActivity,
};
