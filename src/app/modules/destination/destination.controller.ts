import { Destination } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { DestinationFilterAbleFileds } from './destination.constants';
import { DestinationService } from './destination.service';

// const insertIntoDB = (data) => {
//   console.log(data);
// }

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = (await DestinationService.insertIntoDB(
    req.body
  )) as Destination;

  sendResponse<Destination>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Destination Created Successfully!!!!',
    data: result,
  });
  return result;
});

const getAllDestination = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, DestinationFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await DestinationService.getAllDestination(filters, options);

  sendResponse<Destination[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Destination Fetch Successfully',
    meta: result.meta,
    data: result.data,
  });
  return result;
});

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

const getSingleDestination = catchAsync(async (req: Request, res: Response) => {
  const result = await DestinationService.getSingleDestination(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Destination fetched successfully',
    data: result,
  });
});

const updateDestination = catchAsync(async (req: Request, res: Response) => {
  const result = await DestinationService.updateDestination(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Destination Update Successfully',
    data: result,
  });
  return result;
});

const deleteDestination = catchAsync(async (req: Request, res: Response) => {
  const result = await DestinationService.deleteDestination(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Destination Deleted Successfully',
    data: result,
  });
  return result;
});

export const DestinationController = {
  insertIntoDB,
  getAllDestination,
  // DestinationByCategoryId,
  getSingleDestination,
  updateDestination,
  deleteDestination,
};
