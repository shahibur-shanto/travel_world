import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.router';
import { BookRoutes } from '../modules/destination/destination.routes';
import { CategoryRoutes } from '../modules/activity/activity.routes';
import { OrderRoutes } from '../modules/booking/booking.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/',
    route: UserRoutes,
  },

  {
    path: '/',
    route: CategoryRoutes,
  },
  {
    path: '/',
    route: BookRoutes,
  },
  {
    path: '/',
    route: AuthRoutes,
  },
  {
    path: '/',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
