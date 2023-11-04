export type IDestinationFilterRequest = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  category?: string;
  transport?: string;
};

export type Destination = {
  id: string;
  country: string;
  description: string;
  location: string;
  category: string;
  transport: string;
  cost: string;
  image: Buffer;
};
