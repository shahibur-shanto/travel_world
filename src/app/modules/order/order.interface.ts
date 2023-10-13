export type IOrder = {
  userId: string;
  orderBooks: {
    bookId: string;
    quantity: number;
  }[];

  // role: string;
};

export type IOrderById = {
  orderId: string;
  role: string;
  userId: string;
};
