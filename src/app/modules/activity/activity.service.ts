import { Activity, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';

const prisma = new PrismaClient();

const insertIntoDB = async (data: Activity): Promise<Activity> => {
  const { destinationId } = data;
  const isExists = await prisma.destination.findUnique({
    where: {
      id: destinationId,
    },
  });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'destination not found');
  }
  const result = await prisma.activity.create({
    data,
  });
  return result;
};

const getAllActivity = async (): Promise<IGenericResponse<Activity[]>> => {
  const result = await prisma.activity.findMany();
  const total = await prisma.activity.count();
  return {
    meta: {
      total: total,
      page: 1,
      limit: 10,
    },

    data: result,
  };
};

const getSingleActivity = async (id: string): Promise<Activity | null> => {
  const result = await prisma.activity.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateActivity = async (
  id: string,
  payload: Partial<Activity>
): Promise<Activity> => {
  const result = await prisma.activity.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteActivity = async (id: string): Promise<Activity | null> => {
  const result = await prisma.activity.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ActivityService = {
  insertIntoDB,
  getAllActivity,
  getSingleActivity,
  updateActivity,
  deleteActivity,
};
