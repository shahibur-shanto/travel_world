export type IBooking = {
  userId?: string;
  destinationId: string;
  checkIn: string;
  checkOut: string;
  numberOfAdults: number;
  numberOfChildren: number;
  totalPrice?: number;
  status: string;
};

export type IBookingById = {
  orderId: string;
  role: string;
  userId: string;
};
