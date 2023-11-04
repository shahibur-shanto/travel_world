/* eslint-disable @typescript-eslint/no-explicit-any */
import { Destination, Prisma, PrismaClient } from '@prisma/client';
// import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
// import { IUploadFile } from '../../../interfaces/file';
import { Request } from 'express';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { destinationSearchAbleFields } from './destination.constants';
import { IDestinationFilterRequest } from './destination.interface';

const prisma = new PrismaClient();

type CustomRequest = {
  body: {
    country: string;
    description: string;
    location: string;
    image: string; // Make sure this matches the type of your image data
    category: string;
    transport: string;
    cost: number; // Assuming cost is a number
  };
} & Request;

const insertIntoDB = async (req: CustomRequest): Promise<Destination> => {
  const imageData = Buffer.from(req.body.image, 'base64');

  const result = await prisma.destination.create({
    data: {
      country: req.body.country,
      description: req.body.description,
      location: req.body.location,
      image: imageData,
      category: req.body.category,
      transport: req.body.transport,
      cost: req.body.cost,
    },
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

  const andConditions: Prisma.DestinationWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: destinationSearchAbleFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push(
      ...Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      }))
    );
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

  const whereConditions: Prisma.DestinationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.destination.findMany({
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { country: 'asc' },
    skip,
    take: limit,
  });

  const total = await prisma.destination.count({
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
