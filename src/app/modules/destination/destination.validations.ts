import { z } from 'zod';

const createDestination = z.object({
  country: z.string({
    required_error: 'Country is required',
  }),

  description: z.string({
    required_error: 'Destination is required',
  }),

  location: z.string({
    required_error: 'Location is required',
  }),
  category: z.string({
    required_error: 'Location is required',
  }),
  transport: z.string({
    required_error: 'Location is required',
  }),
  cost: z.string({
    required_error: 'Cost is required',
  }),
});

export const DestinationValidation = {
  createDestination,
};
