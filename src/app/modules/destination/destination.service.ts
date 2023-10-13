/* eslint-disable @typescript-eslint/no-explicit-any */
import { Destination, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { destinationSearchAbleFields } from './destination.constants';
import { IDestinationFilterRequest } from './destination.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (data: Destination): Promise<Destination> => {
  const result = await prisma.destination.create({
    data,
    include: {
      activities: true,
      booking: true,
    },
  });
  return result;
};

const getAllDestination = async (
  filters: IDestinationFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Destination[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  let { totalPage } = paginationHelpers.calculatePagination(options);
  const { search, minPrice, maxPrice, ...filterData } = filters;

  const andConditons = [];

  if (search) {
    andConditons.push({
      OR: destinationSearchAbleFields.map(field => ({
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
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  if (minPrice !== undefined) {
    andConditons.push({
      cost: {
        gte: parseFloat(minPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditons.push({
      cost: {
        lte: parseFloat(maxPrice),
      },
    });
  }

  const whereConditons: Prisma.DestinationWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.destination.findMany({
    where: whereConditons,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { country: 'asc' },
    skip,
    take: limit,

    // include: {
    //   category: true,
    // },
  });
  const total = await prisma.destination.count({
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
};

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

const getSingleDestination = async (
  id: string
): Promise<Destination | null> => {
  const result = await prisma.destination.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDestination = async (
  id: string,
  payload: Partial<Destination>
): Promise<Destination> => {
  const result = await prisma.destination.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteDestination = async (id: string): Promise<Destination | null> => {
  const result = await prisma.destination.delete({
    where: {
      id,
    },
  });
  return result;
};

export const DestinationService = {
  insertIntoDB,
  getAllDestination,
  // bookByCategoryId,
  getSingleDestination,
  updateDestination,
  deleteDestination,
};
